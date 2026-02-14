/* ============================================
   Church Cottage, Studland — Script
   Scroll interactions and animations
   ============================================ */

(function () {
  'use strict';

  // --- Reading Progress Bar ---
  const progressBar = document.getElementById('progressBar');

  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
  }

  // --- Navigation scroll state ---
  const siteNav = document.getElementById('siteNav');

  function updateNav() {
    if (window.scrollY > 100) {
      siteNav.classList.add('scrolled');
    } else {
      siteNav.classList.remove('scrolled');
    }
  }

  // --- Hero mist effect ---
  const heroMist = document.getElementById('heroMist');

  function updateMist() {
    if (window.scrollY > 200) {
      heroMist.classList.add('cleared');
    } else {
      heroMist.classList.remove('cleared');
    }
  }

  // --- Section fade-in on scroll ---
  const sections = document.querySelectorAll('.content-section');
  const timelineItems = document.querySelectorAll('.timeline-item');

  const sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  sections.forEach(function (section) {
    sectionObserver.observe(section);
  });

  // --- Timeline items ---
  const timelineObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: '0px 0px -30px 0px'
    }
  );

  timelineItems.forEach(function (item) {
    timelineObserver.observe(item);
  });

  // --- Unified scroll handler ---
  let ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(function () {
        updateProgress();
        updateNav();
        updateMist();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // Initial state
  updateProgress();
  updateNav();
})();
