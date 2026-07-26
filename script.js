// Bloom On Consulting - shared behavior
(function () {
  'use strict';

  // Sticky nav shadow on scroll
  var nav = document.getElementById('nav');
  if (nav) {
    var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 10); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Full-screen mobile menu with scroll lock
  var ham = document.getElementById('hamburger');
  var links = document.getElementById('navLinks');
  if (ham && links) {
    var setMenu = function (open) {
      links.classList.toggle('open', open);
      ham.classList.toggle('open', open);
      ham.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    };
    ham.addEventListener('click', function () { setMenu(!links.classList.contains('open')); });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenu(false);
    });
  }

  // FAQ accordion
  document.querySelectorAll('.q-item').forEach(function (item) {
    var btn = item.querySelector('.q-btn');
    var ans = item.querySelector('.q-a');
    if (!btn || !ans) return;
    btn.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.q-item').forEach(function (i) {
        i.classList.remove('open');
        var a = i.querySelector('.q-a');
        if (a) a.style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        ans.style.maxHeight = ans.scrollHeight + 'px';
      }
    });
  });

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Subtle hero parallax
  var bg = document.getElementById('heroBg');
  if (bg && !reduce) {
    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      if (y < 900) bg.style.transform = 'translateY(' + (y * 0.18) + 'px)';
    }, { passive: true });
  }

  // Scroll reveal
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    if (reduce || !('IntersectionObserver' in window)) {
      reveals.forEach(function (el) { el.classList.add('in'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
        });
      }, { threshold: 0.12 });
      reveals.forEach(function (el) { io.observe(el); });
    }
  }
})();
