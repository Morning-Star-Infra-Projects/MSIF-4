/* navigation.js — MPA Navigation & UI Logic
   Morning Star Infra Projects
   Handles: hamburger menu, header scroll shadow, mobile menu close on link click,
            active nav link highlighting.
   Does NOT intercept or prevent any <a href> navigation — links work natively.
   Note: openModal / closeModal are defined in main.min.js (from forms.js merge). */

'use strict';

(function () {

  // ── DOM refs ────────────────────────────────────────────────────────────────
  var hamburger  = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobile-menu');
  var siteHeader = document.getElementById('site-header');

  // ── Hamburger toggle ────────────────────────────────────────────────────────
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.toggle('open');
      // Visual state for hamburger (X)
      hamburger.classList.toggle('is-active', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      mobileMenu.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    });
  }

  // ── Close mobile menu when any mobile link is clicked ──────────────────────
  if (mobileMenu) {
    mobileMenu.addEventListener('click', function (e) {
      var link = e.target.closest('a');
      if (link) {
        mobileMenu.classList.remove('open');
        if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
      }
    });
    // Close when clicking outside the menu
    document.addEventListener('click', function (e) {
      if (!mobileMenu.classList.contains('open')) return;
      var within = e.target.closest && (e.target.closest('#mobile-menu') || e.target.closest('#hamburger'));
      if (!within) {
        mobileMenu.classList.remove('open');
        if (hamburger) {
          hamburger.classList.remove('is-active');
          hamburger.setAttribute('aria-expanded', 'false');
        }
        mobileMenu.setAttribute('aria-hidden', 'true');
      }
    });
    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        if (hamburger) {
          hamburger.classList.remove('is-active');
          hamburger.setAttribute('aria-expanded', 'false');
        }
        mobileMenu.setAttribute('aria-hidden', 'true');
      }
    });
    // Close when resizing to larger screens
    window.addEventListener('resize', function () {
      if (window.innerWidth > 900 && mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        if (hamburger) {
          hamburger.classList.remove('is-active');
          hamburger.setAttribute('aria-expanded', 'false');
        }
        mobileMenu.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // ── Header scroll shadow ────────────────────────────────────────────────────
  if (siteHeader) {
    window.addEventListener('scroll', function () {
      siteHeader.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // ── Active nav link: highlight the link matching the current page ───────────
  var currentFile = window.location.pathname.replace(/^.*\//, '') || 'index.html';
  document.querySelectorAll('.nav-link, .drop-link, .mob-link').forEach(function (el) {
    var href = (el.getAttribute('href') || '').replace(/^.*\//, '');
    if (href && href === currentFile) {
      el.classList.add('active');
    }
  });

})();
