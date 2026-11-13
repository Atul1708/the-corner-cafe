/**
 * The Corner Cafe – Creative Animations & Motion Engine
 * Pure Vanilla JavaScript & CSS transforms.
 * Strictly respects prefers-reduced-motion and mobile power savings.
 */

export class AnimationManager {
  constructor() {
    this.preloader = document.getElementById('preloader');
    this.preloaderProgress = document.getElementById('preloader-progress');
    this.heroImage = document.querySelector('.hero-bg-media');
    this.heroContent = document.querySelector('.hero-content');
    this.revealElements = document.querySelectorAll('.reveal-on-scroll');
    this.parallaxElements = document.querySelectorAll('[data-parallax-speed]');
    this.customCursor = document.getElementById('custom-cursor');
    this.magneticButtons = document.querySelectorAll('.magnetic-btn');

    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }

  init() {
    this.initPreloader();
    this.initScrollReveals();
    if (!this.reducedMotion && !this.isTouchDevice) {
      this.initParallax();
      this.initCustomCursor();
      this.initMagneticButtons();
    }
    this.initHeroEntrance();
  }

  initPreloader() {
    if (!this.preloader) return;

    // Simulate snappy realistic loading sequence
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 25) + 15;
      if (progress > 100) progress = 100;

      if (this.preloaderProgress) {
        this.preloaderProgress.style.width = `${progress}%`;
      }

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          this.dismissPreloader();
        }, 120);
      }
    }, 40);

    // Guaranteed fallback dismiss
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.dismissPreloader();
      }, 400);
    });
  }

  dismissPreloader() {
    if (!this.preloader || this.preloader.classList.contains('dismissed')) return;
    this.preloader.classList.add('dismissed');
    document.body.classList.remove('loading');

    // Trigger hero entrance sequence
    this.animateHeroElements();
  }

  initHeroEntrance() {
    // If user prefers reduced motion or preloader was bypassed
    if (this.reducedMotion) {
      document.body.classList.remove('loading');
      if (this.heroImage) this.heroImage.style.transform = 'scale(1)';
    }
  }

  animateHeroElements() {
    if (this.reducedMotion) return;

    if (this.heroImage) {
      this.heroImage.classList.add('scale-settle');
    }

    const heroStaggers = document.querySelectorAll('.hero-stagger');
    heroStaggers.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('visible');
      }, index * 120);
    });
  }

  initScrollReveals() {
    // Re-query dynamically AFTER all DOM content and components are populated
    this.revealElements = document.querySelectorAll('.reveal-on-scroll');

    if (!('IntersectionObserver' in window)) {
      this.revealElements.forEach((el) => {
        el.classList.add('is-revealed');
        el.classList.remove('will-reveal');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            entry.target.classList.remove('will-reveal');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px 80px 0px' // Start reveal smoothly 80px before entering viewport
      }
    );

    const windowHeight = window.innerHeight;

    this.revealElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      // If already in or near viewport, make visible immediately
      if (rect.top < windowHeight + 80) {
        el.classList.add('is-revealed');
        el.classList.remove('will-reveal');
      } else {
        el.classList.add('will-reveal');
        observer.observe(el);
      }
    });

    // Safety watchdog: ensure everything within view is visible after initial layout
    setTimeout(() => {
      document.querySelectorAll('.reveal-on-scroll.will-reveal').forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 120) {
          el.classList.add('is-revealed');
          el.classList.remove('will-reveal');
        }
      });
    }, 350);
  }

  initParallax() {
    if (this.parallaxElements.length === 0) return;

    let ticking = false;

    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const scrollY = window.pageYOffset || window.scrollY;
            this.parallaxElements.forEach((el) => {
              const speed = parseFloat(el.dataset.parallaxSpeed) || 0.15;
              const rect = el.getBoundingClientRect();
              // Only compute if within or near viewport
              if (rect.top < window.innerHeight && rect.bottom > 0) {
                const offset = (scrollY - (el.offsetTop - 300)) * speed;
                el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
              }
            });
            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true }
    );
  }

  initCustomCursor() {
    if (!this.customCursor) return;

    let mouseX = -100;
    let mouseY = -100;
    let cursorX = -100;
    let cursorY = -100;

    window.addEventListener(
      'mousemove',
      (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (!this.customCursor.classList.contains('active')) {
          this.customCursor.classList.add('active');
        }
      },
      { passive: true }
    );

    document.addEventListener('mouseleave', () => {
      this.customCursor.classList.remove('active');
    });

    const loop = () => {
      cursorX += (mouseX - cursorX) * 0.2;
      cursorY += (mouseY - cursorY) * 0.2;
      this.customCursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);

    // Interactive cursor state on hoverable elements
    const hoverables = document.querySelectorAll('a, button, .menu-card, .gallery-item');
    hoverables.forEach((el) => {
      el.addEventListener('mouseenter', () => this.customCursor.classList.add('hovering'));
      el.addEventListener('mouseleave', () => this.customCursor.classList.remove('hovering'));
    });
  }

  initMagneticButtons() {
    this.magneticButtons.forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        // Subtle magnetic pull
        btn.style.transform = `translate3d(${x * 0.2}px, ${y * 0.2}px, 0)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate3d(0, 0, 0)';
      });
    });
  }
}

