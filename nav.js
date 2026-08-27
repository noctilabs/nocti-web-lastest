/* Shared nav bar component. Loaded by every page via a synchronous
   <script src="/nav.js"></script> placed exactly where the nav should render —
   this file writes the nav markup at that point, then wires up its behavior.
   Single source of truth: edit here, not per page. */
(function(){
  document.write(
    '<div class="nav-outer">' +
      '<div class="nav">' +
        '<a href="/" class="nav-brand">NoctiLabs</a>' +
        '<div class="nav-links">' +
          '<a href="/#how" data-i18n="nav-platform">Platform</a>' +
          '<a href="/#automate" data-i18n="nav-usecases">Use Cases</a>' +
          '<a href="/company" data-i18n="nav-company">Company</a>' +
          '<a href="/blog" data-i18n="nav-blog">Blog</a>' +
        '</div>' +
        '<a href="/book-a-call" class="btn btn-primary" data-i18n="book-a-call">Book A Call →</a>' +
        '<button class="lang-toggle" id="lang-toggle" type="button" aria-label="Switch language">EN</button>' +
        '<button class="nav-toggle" id="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="nav-mobile-menu">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line class="nav-toggle-line nav-toggle-line-top" x1="4" y1="7" x2="20" y2="7"/><line class="nav-toggle-line nav-toggle-line-middle" x1="4" y1="12" x2="20" y2="12"/><line class="nav-toggle-line nav-toggle-line-bottom" x1="4" y1="17" x2="20" y2="17"/></svg>' +
        '</button>' +
      '</div>' +
    '</div>' +
    '<nav class="nav-mobile-menu" id="nav-mobile-menu">' +
      '<a href="/#how" data-i18n="nav-platform">Platform</a>' +
      '<a href="/#automate" data-i18n="nav-usecases">Use Cases</a>' +
      '<a href="/company" data-i18n="nav-company">Company</a>' +
      '<a href="/blog" data-i18n="nav-blog">Blog</a>' +
      '<a href="/book-a-call" class="btn btn-primary" data-i18n="book-a-call">Book A Call →</a>' +
      '<button class="lang-toggle" id="lang-toggle-mobile" type="button" aria-label="Switch language" style="margin-top:6px;">EN / ES</button>' +
    '</nav>'
  );

  var path = window.location.pathname;
  var activeHref = null;
  if(path.indexOf('/company') === 0) activeHref = '/company';
  else if(path.indexOf('/blog') === 0) activeHref = '/blog';
  if(activeHref){
    var activeLink = document.querySelector('.nav-links a[href="' + activeHref + '"]');
    if(activeLink) activeLink.classList.add('active');
  }
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
