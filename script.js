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
      ham.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
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
    btn.setAttribute('aria-expanded', 'false');
    btn.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.q-item').forEach(function (i) {
        i.classList.remove('open');
        var b = i.querySelector('.q-btn');
        if (b) b.setAttribute('aria-expanded', 'false');
        var a = i.querySelector('.q-a');
        if (a) a.style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
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

  // Book button that stays visible on phones after scrolling
  var bookLink = document.querySelector('.nav-cta a.btn');
  if (bookLink) {
    var mb = bookLink.cloneNode(true);
    mb.className = 'btn btn-gold mobile-book';
    mb.setAttribute('aria-hidden', 'true');
    mb.setAttribute('tabindex', '-1');
    document.body.appendChild(mb);
    var bookBand = document.getElementById('book');
    var bandVisible = false;
    if (bookBand && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (en) { bandVisible = en[0].isIntersecting; toggleMb(); }).observe(bookBand);
    }
    var toggleMb = function () { mb.classList.toggle('show', window.scrollY > 500 && !bandVisible && !document.getElementById('cookieNotice')); };
    window.addEventListener('scroll', toggleMb, { passive: true });
    toggleMb();
  }

  // Current year in the footer
  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  // Cookie choice for Google Analytics
  var KEY = 'bloomConsent';
  var getChoice = function () { try { return localStorage.getItem(KEY); } catch (e) { return null; } };
  var setChoice = function (v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', { analytics_storage: v === 'denied' ? 'denied' : 'granted' });
    }
  };
  var showNotice = function () {
    if (document.getElementById('cookieNotice')) return;
    var box = document.createElement('div');
    box.className = 'cookie-notice';
    box.id = 'cookieNotice';
    box.setAttribute('role', 'region');
    box.setAttribute('aria-label', 'Cookie choice');
    box.innerHTML = '<p>This site uses Google Analytics cookies to see which pages are helpful. <a href="/privacy">Privacy Policy</a></p>' +
      '<div class="cookie-actions"><button type="button" class="btn btn-outline" data-choice="denied">Decline</button>' +
      '<button type="button" class="btn btn-gold" data-choice="granted">Accept</button></div>';
    box.querySelectorAll('button').forEach(function (b) {
      b.addEventListener('click', function () {
        setChoice(b.getAttribute('data-choice'));
        box.remove();
      });
    });
    document.body.appendChild(box);
  };
  if (!getChoice()) showNotice();
  document.querySelectorAll('[data-consent-reset]').forEach(function (b) {
    b.addEventListener('click', function () {
      try { localStorage.removeItem(KEY); } catch (e) {}
      showNotice();
    });
  });
})();
