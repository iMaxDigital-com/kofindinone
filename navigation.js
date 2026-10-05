(function () {
  'use strict';
  function init() {
    var nav = document.querySelector('.site-nav');
    if (!nav) return;
    var toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'menu-toggle';
    toggle.setAttribute('aria-label', 'Open navigation');
    toggle.setAttribute('aria-controls', 'mobile-menu');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = '<span aria-hidden="true">&#9776;</span>';
    nav.appendChild(toggle);
    var menu = document.createElement('dialog');
    menu.id = 'mobile-menu';
    menu.className = 'mobile-menu';
    menu.setAttribute('aria-label', 'Site navigation');
    menu.innerHTML = '<div class="menu-inner"><div class="menu-top"><a href="index.html" class="menu-brand"><img src="images/kn1-badge.webp" width="31" height="40" alt=""><span class="fr">Konfide In One</span></a><button type="button" class="menu-close" aria-label="Close navigation">&times;</button></div><nav class="menu-links" aria-label="Mobile navigation"><a href="index.html">Home</a><a href="corporate.html">Corporate</a><a href="residential.html">Residential</a><a href="ecosystem.html">Ecosystem</a><a href="mission.html">Mission</a></nav><div class="menu-contact"><span>Konfide In One &middot; Austin, TX</span><a href="mailto:hello@konfideinone.com">hello@konfideinone.com</a><a href="tel:+15125550142">(512) 555-0142</a></div><a class="cta-solid menu-cta" href="get-started.html">Get Started &rarr;</a></div>';
    document.body.appendChild(menu);
    menu.querySelectorAll('a').forEach(function (link) {
      if (link.getAttribute('href') === location.pathname.split('/').pop()) link.setAttribute('aria-current', 'page');
      link.addEventListener('click', close);
    });
    var previousOverflow;
    function close() { if (menu.open) menu.close(); }
    toggle.addEventListener('click', function () {
      previousOverflow = document.body.style.overflow;
      document.body.classList.add('menu-open');
      document.body.style.overflow = 'hidden';
      menu.showModal();
      toggle.setAttribute('aria-expanded', 'true');
      menu.querySelector('.menu-close').focus();
    });
    menu.querySelector('.menu-close').addEventListener('click', close);
    menu.addEventListener('click', function (event) {
      var box = menu.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) close();
    });
    menu.addEventListener('close', function () {
      document.body.classList.remove('menu-open');
      document.body.style.overflow = previousOverflow || '';
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    });
    window.matchMedia('(min-width: 1200px)').addEventListener('change', function (event) { if (event.matches) close(); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
