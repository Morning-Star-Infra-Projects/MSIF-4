/* animations.js — Scroll Reveal & Image Blur-Up */

'use strict';

// IntersectionObserver for .reveal elements
(function initReveal() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('in-view'));
    return;
  }
  const obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) { e.target.classList.add('in-view'); obs.unobserve(e.target); }
    });
  }, { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
})();

// Blur-up helper for hero and division tab images
(function initBlurUp() {
  try {
    const imgs = document.querySelectorAll('.hero-bg img, .div-tab-bg img, .hero-split-right img, .div-tab-media img');
    imgs.forEach(img => {
      if (img.complete && img.naturalWidth) {
        img.classList.add('loaded');
      } else {
        img.addEventListener('load',  () => img.classList.add('loaded'), { once: true });
        img.addEventListener('error', () => img.classList.add('loaded'), { once: true });
      }
    });
  } catch(e) { console.warn('blur-up init failed', e); }
})();

// ── Infinite Horizontal Showcase Carousel ────────────────────────────────────
(function initShowcaseCarousel() {
  const track = document.getElementById('showcase-carousel-track');
  if (!track) return;

  // If server-rendered HTML already includes duplicated groups for the marquee,
  // do not append more. This prevents accidental over-duplication.
  const existingGroups = track.querySelectorAll('.showcase-carousel-group');
  if (existingGroups && existingGroups.length >= 2) return;

  const projects = [
    {
      name: 'Signature Villa, ECR',
      category: 'Home Construction',
      img: './assets/images/home-construction-card-800.webp'
    },
    {
      name: 'Luxury Penthouse',
      category: 'Interior Fitouts',
      img: './assets/images/hero_interiors.webp'
    },
    {
      name: 'NDT Retrofitting, OMR',
      category: 'Structural Repair',
      img: './assets/images/structural-repair-retrofitting-800.webp'
    },
    {
      name: 'PEB Warehouse',
      category: 'Commercial & Industrial',
      img: './assets/images/commercial-industrial-800.webp'
    },
    {
      name: 'Premium Residence',
      category: 'Home Construction',
      img: './assets/images/home-construction-page-800.webp'
    },
    {
      name: 'Morning Star HQ',
      category: 'Architectural Works',
      img: './assets/images/hero_brand-800.webp'
    },
    {
      name: 'Contemporary Duplex',
      category: 'Home Construction',
      img: './assets/images/home-construction-card.webp'
    },
    {
      name: 'Bespoke Mod Interiors',
      category: 'Interior Fitouts',
      img: './assets/images/hero_interiors.webp'
    }
  ];

  // Function to create a group of items
  function createGroup() {
    const group = document.createElement('div');
    group.className = 'showcase-carousel-group';
    
    projects.forEach(project => {
      const item = document.createElement('div');
      item.className = 'showcase-carousel-item';
      
      const img = document.createElement('img');
      img.className = 'showcase-carousel-img';
      img.src = project.img;
      img.alt = `${project.name} - ${project.category}`;
      img.loading = 'lazy';
      img.width = 300;
      img.height = 400;
      
      const overlay = document.createElement('div');
      overlay.className = 'showcase-carousel-overlay';
      
      const cat = document.createElement('div');
      cat.className = 'showcase-carousel-category';
      cat.textContent = project.category;
      
      const name = document.createElement('h3');
      name.className = 'showcase-carousel-name';
      name.textContent = project.name;
      
      overlay.appendChild(cat);
      overlay.appendChild(name);
      item.appendChild(img);
      item.appendChild(overlay);
      group.appendChild(item);
    });
    
    return group;
  }

  // To make the infinite loop perfectly seamless with no visible resets,
  // we append two identical sets of the items next to each other.
  // The first set represents group A, the second set is group B (an exact duplicate).
  track.appendChild(createGroup());
  track.appendChild(createGroup());
})();
