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
});

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


