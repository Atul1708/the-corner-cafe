/**
 * The Corner Cafe – Interactive Editorial Menu Component
 * 
 * Features:
 * 1. Animated gliding active indicator tracking active category tab.
 * 2. Smooth category switching with subtle staggered row reveals.
 * 3. Mobile horizontally scrollable tabs with automatic centering.
 * 4. Dual browsing modes: focused single category or continuous "All Items" view.
 * 5. Full keyboard accessibility (Arrow keys, Home, End, Enter).
 * 6. Sticky header offset management and scroll-spy in All Items mode.
 * 7. Category pagination footer actions for seamless discovery.
 */

import { CAFE_CONFIG } from './config.js';
import { MENU_CATEGORIES, MENU_ITEMS } from './menuData.js';

export class MenuManager {
  constructor() {
    this.stickyNav = document.getElementById('menu-sticky-nav');
    this.navInner = this.stickyNav ? this.stickyNav.querySelector('.menu-sticky-nav-inner') : null;
    this.glider = this.stickyNav ? this.stickyNav.querySelector('.menu-nav-glider') : null;
    this.container = document.getElementById('menu-editorial-content');
    this.categorySections = document.querySelectorAll('.menu-editorial-category');
    this.navPills = document.querySelectorAll('.menu-nav-pill');
    this.header = document.getElementById('main-header');
    this.whatsappNumber = CAFE_CONFIG.contact.whatsappNumber || '917359295384';
    
    this.currentCategory = 'all';
    this.isManualScrolling = false;
    this.observer = null;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  init() {
    if (!this.stickyNav || !this.container) return;

    this.bindTabClicks();
    this.bindCategoryNavBtns();
    this.bindKeyboardNav();
    this.setupStickyObserver();
    this.setupScrollSpy();

    // Check URL hash on initial load (e.g. #cat-beverages)
    const initialHash = window.location.hash.replace('#', '');
    const validCategories = ['all', 'cat-tcc-specials', 'cat-sandwiches-frankies', 'cat-maggi-pasta', 'cat-parathas-combos', 'cat-beverages', 'cat-mojitos'];
    
    if (initialHash && validCategories.includes(initialHash)) {
      this.switchCategory(initialHash, false);
    } else {
      this.switchCategory('all', false);
    }

    // Window resize handler: recalibrate glider without transition
    window.addEventListener('resize', () => {
      const activePill = this.stickyNav.querySelector('.menu-nav-pill.active');
      if (activePill) {
        this.updateGlider(activePill, false);
      }
    }, { passive: true });

    // Initial glider positioning after fonts/layout settle
    setTimeout(() => {
      const activePill = this.stickyNav.querySelector('.menu-nav-pill.active');
      if (activePill) {
        this.updateGlider(activePill, false);
      }
    }, 120);
  }

  getHeaderOffset() {
    const headerHeight = this.header ? this.header.offsetHeight : 68;
    const stickyHeight = this.stickyNav ? this.stickyNav.offsetHeight : 52;
    return headerHeight + stickyHeight + 14;
  }

  updateGlider(activePill, animate = true) {
    if (!this.glider || !activePill) return;

    const pillLeft = activePill.offsetLeft;
    const pillWidth = activePill.offsetWidth;

    if (!animate || this.reducedMotion) {
      this.glider.style.transition = 'none';
    } else {
      this.glider.style.transition = 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), width 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease';
    }

    this.glider.style.transform = `translate3d(${pillLeft}px, 0, 0)`;
    this.glider.style.width = `${pillWidth}px`;
    this.glider.style.opacity = '1';

    if (this.navInner) {
      this.navInner.classList.add('glider-ready');
    }

    if (!animate || this.reducedMotion) {
      this.glider.offsetHeight; // Force reflow
      this.glider.style.transition = '';
    }
  }

  scrollPillIntoView(activePill) {
    if (!this.navInner || !activePill) return;

    const pillLeft = activePill.offsetLeft;
    const pillWidth = activePill.offsetWidth;
    const navWidth = this.navInner.offsetWidth;
    const targetScroll = pillLeft - (navWidth / 2) + (pillWidth / 2);

    this.navInner.scrollTo({
      left: Math.max(0, targetScroll),
      behavior: this.reducedMotion ? 'auto' : 'smooth'
    });
  }

  switchCategory(categoryId, scrollToTop = false) {
    this.currentCategory = categoryId;

    // 1. Update pills
    let activePill = null;
    this.navPills.forEach((pill) => {
      const target = pill.getAttribute('data-category') || pill.getAttribute('data-target') || pill.getAttribute('href')?.replace('#', '');
      const match = target === categoryId;
      pill.classList.toggle('active', match);
      pill.setAttribute('aria-selected', match ? 'true' : 'false');
      pill.tabIndex = match ? 0 : -1;
      if (match) activePill = pill;
    });

    // 2. Update glider and mobile horizontal scroll
    if (activePill) {
      this.updateGlider(activePill, true);
      this.scrollPillIntoView(activePill);
    }

    // 3. Update container active state
    if (this.container) {
      this.container.setAttribute('data-active-cat', categoryId);

      // Determine which sections to animate
      const targetSections = categoryId === 'all'
        ? Array.from(this.categorySections)
        : [document.getElementById(categoryId)].filter(Boolean);

      targetSections.forEach((section) => {
        section.classList.remove('is-animating');
        void section.offsetWidth; // Force reflow
        section.classList.add('is-animating');

        // Apply staggered entrance delays to each menu row
        const rows = section.querySelectorAll('.menu-row-item');
        rows.forEach((row, idx) => {
          const delay = Math.min(idx * 25, 300);
          row.style.setProperty('--item-delay', `${delay}ms`);
        });
      });
    }

    // 4. Smooth scroll to target category when clicked
    if (scrollToTop) {
      const headerOffset = this.getHeaderOffset();
      if (categoryId === 'all') {
        const menuTop = this.stickyNav ? this.stickyNav.getBoundingClientRect().top + window.pageYOffset - (this.header ? this.header.offsetHeight : 68) : 0;
        window.scrollTo({
          top: Math.max(0, menuTop),
          behavior: this.reducedMotion ? 'auto' : 'smooth'
        });
      } else {
        const targetSection = document.getElementById(categoryId);
        if (targetSection) {
          const sectionTop = targetSection.getBoundingClientRect().top + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: Math.max(0, sectionTop),
            behavior: this.reducedMotion ? 'auto' : 'smooth'
          });
        }
      }

      // Adjustment 5: Recalibrate ScrollTrigger after category scroll settles
      if (window.ScrollTrigger) {
        setTimeout(() => {
          window.ScrollTrigger.refresh();
        }, 400);
      }
    }
  }

  bindTabClicks() {
    if (!this.stickyNav) return;

    this.stickyNav.addEventListener('click', (e) => {
      const pill = e.target.closest('.menu-nav-pill');
      if (!pill) return;

      e.preventDefault();
      const categoryId = pill.getAttribute('data-category') || pill.getAttribute('data-target') || pill.getAttribute('href')?.replace('#', '');
      if (categoryId) {
        this.switchCategory(categoryId, true);
      }
    });
  }

  bindCategoryNavBtns() {
    if (!this.container) return;

    this.container.addEventListener('click', (e) => {
      const btn = e.target.closest('.menu-cat-nav-btn');
      if (!btn) return;

      e.preventDefault();
      const target = btn.getAttribute('data-target');
      if (target) {
        this.switchCategory(target, true);
      }
    });
  }

  bindKeyboardNav() {
    if (!this.navInner) return;

    this.navInner.addEventListener('keydown', (e) => {
      const pills = Array.from(this.navPills);
      const currentIndex = pills.findIndex(p => p.classList.contains('active'));
      if (currentIndex === -1) return;

      let nextIndex = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        nextIndex = (currentIndex + 1) % pills.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        nextIndex = (currentIndex - 1 + pills.length) % pills.length;
      } else if (e.key === 'Home') {
        nextIndex = 0;
      } else if (e.key === 'End') {
        nextIndex = pills.length - 1;
      }

      if (nextIndex !== null) {
        e.preventDefault();
        const nextPill = pills[nextIndex];
        nextPill.focus();
        const categoryId = nextPill.getAttribute('data-category') || nextPill.getAttribute('data-target');
        if (categoryId) {
          this.switchCategory(categoryId, false);
        }
      }
    });
  }

  setupScrollSpy() {
    if (!('IntersectionObserver' in window) || this.categorySections.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: `-${this.getHeaderOffset() + 20}px 0px -50% 0px`,
      threshold: 0.1
    };

    this.observer = new IntersectionObserver((entries) => {
      if (this.isManualScrolling) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          if (sectionId) {
            const matchingPill = this.stickyNav.querySelector(`.menu-nav-pill[data-category="${sectionId}"]`);
            if (matchingPill) {
              this.navPills.forEach(p => {
                const isMatch = p === matchingPill;
                p.classList.toggle('active', isMatch);
                p.setAttribute('aria-selected', isMatch ? 'true' : 'false');
              });
              this.updateGlider(matchingPill, true);
              this.scrollPillIntoView(matchingPill);
            }
          }
        }
      });
    }, observerOptions);

    this.categorySections.forEach((section) => {
      this.observer.observe(section);
    });
  }

  setupStickyObserver() {
    if (!this.stickyNav) return;

    const checkSticky = () => {
      const headerHeight = this.header ? this.header.offsetHeight : 68;
      const navTop = this.stickyNav.getBoundingClientRect().top;
      this.stickyNav.classList.toggle('is-pinned', navTop <= headerHeight + 2);
    };

    window.addEventListener('scroll', checkSticky, { passive: true });
    checkSticky();
  }
}
