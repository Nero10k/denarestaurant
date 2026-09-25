/**
 * DENA'S Persian Fusion Restaurant
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  initMobileMenu();
  
  // Menu Filter Tabs
  initMenuFilters();
  
  // Smooth scroll for anchor links
  initSmoothScroll();
  
  // Header scroll effect
  initHeaderScroll();

  // Floating click-to-call button
  initCallButton();
});

/**
 * Floating Call Button
 * Injected on every page so guests can call to reserve or ask questions
 * with a single tap. The line is answered 24/7.
 */
function initCallButton() {
  if (document.querySelector('.call-fab')) return;

  var DISPLAY_NUMBER = '070 207 1479';
  var DIAL_NUMBER = '+31702071479';

  // Button copy follows the page language (<html lang="nl"> on Dutch pages).
  var isDutch = (document.documentElement.lang || '').toLowerCase().indexOf('nl') === 0;
  var TEXT = isDutch
    ? { call: 'Bel ons', copied: 'Nummer gekopieerd!', aria: 'Bel DENA\'s op ' + DISPLAY_NUMBER + ' om te reserveren' }
    : { call: 'Call us', copied: 'Number copied!', aria: 'Call DENA\'s on ' + DISPLAY_NUMBER + ' to reserve a table' };

  // Phones/tablets can actually place a call; desktops would only show an
  // "open with which app?" prompt, so there we show and copy the number instead.
  function canDial() {
    return (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) ||
           navigator.maxTouchPoints > 0;
  }

  var phoneIcon =
    '<svg class="call-fab-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
    '<path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>' +
    '</svg>';

  var a = document.createElement('a');
  a.className = 'call-fab';
  a.href = 'tel:' + DIAL_NUMBER;
  a.setAttribute('aria-label', TEXT.aria);
  a.innerHTML = phoneIcon + '<span class="call-fab-text"></span>';

  function setLabel() {
    a.querySelector('.call-fab-text').textContent = canDial() ? TEXT.call : DISPLAY_NUMBER;
  }
  setLabel();

  // Re-label if the device turns out to be touch-capable after load.
  if (window.matchMedia) {
    var mq = window.matchMedia('(pointer: coarse)');
    if (mq.addEventListener) mq.addEventListener('change', setLabel);
  }
  window.addEventListener('touchstart', setLabel, { once: true, passive: true });

  // Decided at click time, so a real phone always dials even if touch support
  // is detected late.
  a.addEventListener('click', function (e) {
    if (canDial()) return; // let the tel: link dial normally

    e.preventDefault();
    var label = a.querySelector('.call-fab-text');

    function flash(msg) {
      label.textContent = msg;
      setTimeout(function () { label.textContent = DISPLAY_NUMBER; }, 2000);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(DISPLAY_NUMBER)
        .then(function () { flash(TEXT.copied); })
        .catch(function () { flash(DISPLAY_NUMBER); });
    } else {
      flash(DISPLAY_NUMBER);
    }
  });

  document.body.appendChild(a);
}

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.nav');
  
  if (mobileMenuBtn && nav) {
    mobileMenuBtn.addEventListener('click', function() {
      nav.classList.toggle('active');
      
      // Toggle hamburger/close icon
      const span = this.querySelector('span');
      if (nav.classList.contains('active')) {
        span.textContent = '✕';
      } else {
        span.textContent = '☰';
      }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        nav.classList.remove('active');
        mobileMenuBtn.querySelector('span').textContent = '☰';
      }
    });
  }
}

/**
 * Menu Filter Tabs
 */
function initMenuFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const menuCategories = document.querySelectorAll('.menu-category');
  
  if (filterBtns.length && menuCategories.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const filter = this.dataset.filter;
        
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Filter categories
        menuCategories.forEach(category => {
          if (filter === 'all' || category.dataset.category === filter) {
            category.style.display = 'block';
            // Add fade in animation
            category.style.animation = 'fadeInUp 0.4s ease forwards';
          } else {
            category.style.display = 'none';
          }
        });
      });
    });
  }
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Skip if it's just "#"
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/**
 * Header Scroll Effect
 */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  
  if (header) {
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;
      
      // Add shadow on scroll
      if (currentScroll > 50) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
      } else {
        header.style.boxShadow = 'none';
      }
      
      lastScroll = currentScroll;
    });
  }
}

/**
 * Intersection Observer for Animations
 * Adds animation classes when elements come into view
 */
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fadeInUp');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe elements with data-animate attribute
  document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
  });
}


