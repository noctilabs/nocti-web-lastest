/* Shared mega-menu nav bar component. Loaded by every page via a synchronous
   <script src="/nav.js"></script> placed exactly where the nav should render —
   this file writes the nav markup at that point, then wires up its behavior.
   Single source of truth: edit here, not per page. */

window.NOCTI_NAV_ES = {
  "nav-platform": "Plataforma",
  "nav-usecases": "Casos de Uso",
  "nav-company": "Empresa",
  "nav-blog": "Blog",
  "mega-overview-title": "Overview",
  "mega-overview-desc": "Un sistema que convierte cómo funciona tu operación en agentes de IA que la ejecutan. En vivo, sobre tu stack existente.",
  "mega-audit-title": "Auditoría",
  "mega-audit-desc": "Un agente que entrevista a toda tu empresa y mapea cómo funciona el trabajo en la realidad: las excepciones, las reglas que nadie escribió.",
  "mega-deploy-title": "Despliegue",
  "mega-deploy-desc": "Agentes de IA desplegados en tus flujos de trabajo reales, sobre los sistemas que ya usás.",
  "mega-control-title": "Control",
  "mega-control-desc": "Un panel sobre cada agente. Qué ahorra, qué está haciendo, y dónde necesita tu decisión.",
  "mega-about-title": "Sobre Nosotros",
  "mega-about-desc": "Cómo pensamos el problema, nuestro trasfondo, y por qué operamos en vez de consultar.",
  "mega-blog-title": "Blog",
  "mega-blog-desc": "Sobre qué escribimos al llevar IA a producción.",
  "mega-team-title": "Equipo",
  "mega-team-desc": "Agentes de IA desplegados en tus flujos de trabajo reales, por fases, sobre los sistemas que ya usás.",
  "book-a-call": "Agendar Una Llamada →"
};

(function(){
  document.write(
    '<div class="nav-outer">' +
      '<div class="nav" id="mega-nav">' +
        '<div class="nav-row">' +
          '<a href="/" class="nav-brand">NoctiLabs</a>' +
          '<div class="nav-links">' +
            '<a href="/platform" id="platform-link" data-i18n="nav-platform">Platform</a>' +
            '<a href="/use-cases" data-i18n="nav-usecases">Use Cases</a>' +
            '<a href="/company" id="company-link" data-i18n="nav-company">Company</a>' +
            '<a href="/blog" data-i18n="nav-blog">Blog</a>' +
          '</div>' +
          '<button class="nav-toggle" id="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="nav-mobile-menu">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line class="nav-toggle-line nav-toggle-line-top" x1="4" y1="7" x2="20" y2="7"/><line class="nav-toggle-line nav-toggle-line-middle" x1="4" y1="12" x2="20" y2="12"/><line class="nav-toggle-line nav-toggle-line-bottom" x1="4" y1="17" x2="20" y2="17"/></svg>' +
          '</button>' +
        '</div>' +
        '<div class="mega-panel" id="platform-mega">' +
          '<div class="mega-divider"></div>' +
          '<div class="mega-inner">' +
            '<div class="mega-eyebrow" data-i18n="nav-platform">Platform</div>' +
            '<div class="mega-grid">' +
              '<a class="mega-block" href="/platform#overview">' +
                '<h4 data-i18n="mega-overview-title">Overview</h4>' +
                '<p data-i18n="mega-overview-desc">One system that turns how your operation runs into AI agents that run it. Live, on your existing stack.</p>' +
              '</a>' +
              '<a class="mega-block" href="/platform#audit">' +
                '<h4 data-i18n="mega-audit-title">Audit</h4>' +
                '<p data-i18n="mega-audit-desc">An agent that interviews your whole company and maps how the work actually runs: the exceptions, the rules nobody wrote down.</p>' +
              '</a>' +
              '<a class="mega-block" href="/platform#deploy">' +
                '<h4 data-i18n="mega-deploy-title">Deploy</h4>' +
                '<p data-i18n="mega-deploy-desc">AI agents shipped into your real workflows, on the systems you already use.</p>' +
              '</a>' +
              '<a class="mega-block" href="/platform#control">' +
                '<h4 data-i18n="mega-control-title">Control</h4>' +
                '<p data-i18n="mega-control-desc">One panel over every agent. What it saves, what it\'s doing, and where it needs your call.</p>' +
              '</a>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="mega-panel" id="company-mega">' +
          '<div class="mega-divider"></div>' +
          '<div class="mega-inner">' +
            '<div class="mega-eyebrow" data-i18n="nav-company">Company</div>' +
            '<div class="mega-grid">' +
              '<a class="mega-block" href="/company#about">' +
                '<h4 data-i18n="mega-about-title">About Us</h4>' +
                '<p data-i18n="mega-about-desc">How we think about the problem, our background, and why we operate instead of consult.</p>' +
              '</a>' +
              '<a class="mega-block" href="/blog">' +
                '<h4 data-i18n="mega-blog-title">Blog</h4>' +
                '<p data-i18n="mega-blog-desc">What we\'re writing about getting AI into production.</p>' +
              '</a>' +
              '<a class="mega-block" href="/company#team">' +
                '<h4 data-i18n="mega-team-title">Team</h4>' +
                '<p data-i18n="mega-team-desc">AI agents shipped into your real workflows, in phases, on the systems you already use.</p>' +
              '</a>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<nav class="nav-mobile-menu" id="nav-mobile-menu">' +
      '<a href="/platform" data-i18n="nav-platform">Platform</a>' +
      '<a href="/use-cases" data-i18n="nav-usecases">Use Cases</a>' +
      '<a href="/company" data-i18n="nav-company">Company</a>' +
      '<a href="/blog" data-i18n="nav-blog">Blog</a>' +
      '<a href="/book-a-call" class="btn btn-primary" data-i18n="book-a-call">Book A Call →</a>' +
      '<button class="lang-toggle" id="lang-toggle-mobile" type="button" aria-label="Switch language" style="margin-top:6px;">EN / ES</button>' +
    '</nav>'
  );

  var path = window.location.pathname;
  var activeHref = null;
  if(path.indexOf('/platform') === 0) activeHref = '/platform';
  else if(path.indexOf('/use-cases') === 0) activeHref = '/use-cases';
  else if(path.indexOf('/company') === 0) activeHref = '/company';
  else if(path.indexOf('/blog') === 0) activeHref = '/blog';
  if(activeHref){
    document.querySelectorAll('a[href="' + activeHref + '"]').forEach(function(link){
      link.classList.add('active');
    });
  }
})();

(function(){
  var nav = document.getElementById('mega-nav');
  if(!nav) return;
  var pairs = [
    { trigger: document.getElementById('platform-link'), panel: document.getElementById('platform-mega') },
    { trigger: document.getElementById('company-link'), panel: document.getElementById('company-mega') }
  ].filter(function(p){ return p.trigger && p.panel; });
  if(!pairs.length) return;
  var SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function scrambleReveal(el){
    var final = el.textContent;
    var len = final.length;
    if(reduceMotion || !len) return;
    window.cancelAnimationFrame(el._scrambleRaf);
    var revealed = new Array(len).fill(false);
    var startTime = null;
    function tick(ts){
      if(startTime === null) startTime = ts;
      var elapsed = ts - startTime;
      var out = '';
      var allDone = true;
      for(var i = 0; i < len; i++){
        if(revealed[i] || final[i] === ' '){ out += final[i]; continue; }
        var revealDelay = 150 + i * 110;
        if(elapsed >= revealDelay){ revealed[i] = true; out += final[i]; }
        else { allDone = false; out += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]; }
      }
      el.textContent = out;
      if(!allDone) el._scrambleRaf = window.requestAnimationFrame(tick);
      else el.textContent = final;
    }
    el._scrambleRaf = window.requestAnimationFrame(tick);
  }
  function scrambleInPanel(panel){
    var targets = panel.querySelectorAll('.mega-eyebrow, .mega-block h4');
    targets.forEach(function(el){ scrambleReveal(el); });
  }
  var closeTimer = 0;
  var activePanel = null;
  function openPanel(target){
    window.clearTimeout(closeTimer);
    if(activePanel && activePanel !== target){
      var prev = activePanel;
      prev.classList.add('mega-instant');
      prev.classList.remove('open');
      target.classList.add('mega-instant');
      target.classList.add('open');
      target.offsetHeight;
      prev.classList.remove('mega-instant');
      target.classList.remove('mega-instant');
      scrambleInPanel(target);
    } else {
      target.classList.add('open');
    }
    activePanel = target;
    nav.classList.add('mega-open');
  }
  function closeAll(){
    window.clearTimeout(closeTimer);
    closeTimer = window.setTimeout(function(){
      pairs.forEach(function(p){ p.panel.classList.remove('open'); });
      activePanel = null;
      nav.classList.remove('mega-open');
    }, 150);
  }
  pairs.forEach(function(p){
    p.trigger.addEventListener('mouseenter', function(){ openPanel(p.panel); });
    p.trigger.addEventListener('focus', function(){ openPanel(p.panel); });
    p.panel.addEventListener('mouseenter', function(){ openPanel(p.panel); });
    p.panel.addEventListener('mouseleave', closeAll);
  });
  nav.addEventListener('mouseleave', closeAll);
  document.addEventListener('focusout', function(event){
    if(!nav.contains(event.relatedTarget)) closeAll();
  });
  document.addEventListener('keydown', function(event){
    if(event.key === 'Escape'){
      pairs.forEach(function(p){ p.panel.classList.remove('open'); });
      activePanel = null;
      nav.classList.remove('mega-open');
    }
  });
})();

(function(){
  var toggle = document.getElementById('nav-toggle');
  var menu = document.getElementById('nav-mobile-menu');
  if(!toggle || !menu) return;
  var closeTimer = 0;
  function openMenu(){
    window.clearTimeout(closeTimer);
    menu.hidden = false;
    requestAnimationFrame(function(){ menu.classList.add('open'); });
    toggle.setAttribute('aria-expanded','true');
    toggle.setAttribute('aria-label','Close menu');
  }
  function closeMenu(options){
    options = options || {};
    window.clearTimeout(closeTimer);
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded','false');
    toggle.setAttribute('aria-label','Open menu');
    if(options.immediate || window.matchMedia('(prefers-reduced-motion: reduce)').matches){ menu.hidden = true; }
    else { closeTimer = window.setTimeout(function(){ menu.hidden = true; }, 200); }
    if(options.returnFocus) toggle.focus();
  }
  menu.hidden = true;
  toggle.addEventListener('click', function(){
    if(toggle.getAttribute('aria-expanded') === 'true') closeMenu();
    else openMenu();
  });
  menu.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){ closeMenu({immediate:true}); });
  });
  document.addEventListener('keydown',function(event){ if(event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') closeMenu({returnFocus:true,immediate:true}); });
  document.addEventListener('pointerdown',function(event){ if(toggle.getAttribute('aria-expanded') === 'true' && !menu.contains(event.target) && !toggle.contains(event.target)) closeMenu(); });
  window.addEventListener('resize',function(){ if(window.innerWidth > 820 && toggle.getAttribute('aria-expanded') === 'true') closeMenu({immediate:true}); });
})();
