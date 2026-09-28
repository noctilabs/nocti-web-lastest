// Builds the static site into dist/: copies the hand-written files as-is and
// generates /blog and /blog/<slug> from the posts published in Sanity.
import {readFile, writeFile, mkdir, cp, readdir, rm} from 'node:fs/promises'
import {toHTML, escapeHTML} from '@portabletext/to-html'
import {projectId, dataset} from '../studio/env.js'

const root = new URL('../', import.meta.url)
const dist = new URL('dist/', root)

const query = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  title, "slug": slug.current, publishedAt, listed, category, excerpt, readingTime, body
}`

async function fetchPosts() {
  const url = `https://${projectId}.api.sanity.io/v2025-02-19/data/query/${dataset}` +
    `?perspective=published&query=${encodeURIComponent(query)}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Sanity query failed: ${res.status} ${await res.text()}`)
  return (await res.json()).result
}

// Repo files that are not part of the served site.
const notServed = new Set(['dist', 'node_modules', 'scripts', 'studio', 'templates',
  'package.json', 'package-lock.json', 'vercel.json', 'README.md'])

const components = {
  block: {
    blockquote: ({children}) => `<p class="pull">${children}</p>`,
  },
}

const renderBody = (blocks) => toHTML(blocks, {components})

function readingTime(post) {
  if (post.readingTime) return post.readingTime
  const text = post.body.en
    .flatMap((block) => block.children || [])
    .map((child) => child.text || '')
    .join(' ')
  return Math.max(1, Math.ceil(text.split(/\s+/).filter(Boolean).length / 220))
}

const formatDate = (date) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC',
  })

const readLabel = {en: (n) => `${n} min read`, es: (n) => `${n} min de lectura`}

// Inlined into a <script>, so keep "</script>" out of the payload.
const esScript = (entries) => JSON.stringify(entries, null, 2).replace(/</g, '\u003c')

function fill(template, vars) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    if (!(key in vars)) throw new Error(`Missing template value: ${key}`)
    return vars[key]
  })
}

function renderPost(template, post) {
  const minutes = readingTime(post)
  const es = {}
  if (post.category.es) es['post-category'] = escapeHTML(post.category.es)
  if (post.title.es) es['post-title'] = escapeHTML(post.title.es)
  es['post-read'] = readLabel.es(minutes)
  if (post.body.es?.length) es['post-body'] = renderBody(post.body.es)

  return fill(template, {
    title: escapeHTML(post.title.en),
    description: escapeHTML(post.excerpt.en),
    category: escapeHTML(post.category.en),
    date: formatDate(post.publishedAt),
    read: readLabel.en(minutes),
    body: renderBody(post.body.en),
    es: esScript(es),
  })
}

function renderBlog(template, posts) {
  const es = {}
  const i18n = (key, en, esValue) => {
    if (esValue) es[key] = escapeHTML(esValue)
    return `data-i18n="${key}">${escapeHTML(en)}`
  }

  const [latest, ...rest] = posts
  const featured = latest ? `    <a href="/blog/${latest.slug}" class="featured-card" style="display:block;">
      <span class="eyebrow" ${i18n('post-0-cat', latest.category.en, latest.category.es)}</span>
      <h2 ${i18n('post-0-title', latest.title.en, latest.title.es)}</h2>
      <p ${i18n('post-0-excerpt', latest.excerpt.en, latest.excerpt.es)}</p>
      <div class="post-meta"><span>${formatDate(latest.publishedAt)}</span><span>·</span><span ${i18n('post-0-read', readLabel.en(readingTime(latest)), readLabel.es(readingTime(latest)))}</span></div>
    </a>` : ''

  const rows = rest.map((post, index) => {
    const i = index + 1
    const minutes = readingTime(post)
    return `    <a href="/blog/${post.slug}" class="post-row">
      <span class="eyebrow" ${i18n(`post-${i}-cat`, post.category.en, post.category.es)}</span>
      <h3 ${i18n(`post-${i}-title`, post.title.en, post.title.es)}</h3>
      <span class="post-meta-col"><span class="post-date">${formatDate(post.publishedAt)}</span><span class="post-read" ${i18n(`post-${i}-read`, readLabel.en(minutes), readLabel.es(minutes))}</span></span>
    </a>`
  })

  return fill(template, {featured, posts: rows.join('\n'), es: esScript(es)})
}

const posts = await fetchPosts()
const [blogTemplate, postTemplate] = await Promise.all([
  readFile(new URL('templates/blog.html', root), 'utf8'),
  readFile(new URL('templates/post.html', root), 'utf8'),
])

await rm(dist, {recursive: true, force: true})
await mkdir(new URL('blog/', dist), {recursive: true})

const staticFiles = (await readdir(root)).filter((name) => !name.startsWith('.') && !notServed.has(name))
await Promise.all(staticFiles.map((name) => cp(new URL(name, root), new URL(name, dist), {recursive: true})))

await writeFile(new URL('blog.html', dist), renderBlog(blogTemplate, posts.filter((post) => post.listed !== false)))
await Promise.all(posts.map((post) =>
  writeFile(new URL(`blog/${post.slug}.html`, dist), renderPost(postTemplate, post)),
))

console.log(`Built ${staticFiles.length} static files and ${posts.length} blog posts into dist/`)
