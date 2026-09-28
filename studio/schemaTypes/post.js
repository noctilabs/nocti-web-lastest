import {defineField, defineType} from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Blog post',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'localeString', validation: (rule) => rule.required()}),
    defineField({
      name: 'slug',
      type: 'slug',
      description: 'URL: noctilabs.io/blog/<slug>',
      options: {source: 'title.en'},
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'publishedAt', title: 'Published on', type: 'date', validation: (rule) => rule.required()}),
    defineField({
      name: 'listed',
      title: 'Show on /blog',
      type: 'boolean',
      description: 'When off, the post is still published at its URL but left out of the blog list.',
      initialValue: true,
    }),
    defineField({name: 'category', type: 'localeString', validation: (rule) => rule.required()}),
    defineField({
      name: 'excerpt',
      type: 'localeText',
      description: 'Shown on the blog list when this is the latest post, and used as the meta description.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'readingTime',
      title: 'Reading time (minutes)',
      type: 'number',
      description: 'Leave empty to calculate it from the English body.',
    }),
    defineField({name: 'body', type: 'localeBody', validation: (rule) => rule.required()}),
  ],
  orderings: [{title: 'Newest first', name: 'publishedAtDesc', by: [{field: 'publishedAt', direction: 'desc'}]}],
  preview: {
    select: {title: 'title.en', subtitle: 'publishedAt'},
  },
})
