/**
 * The Corner Cafe – Editorial Menu Component
 * 
 * Manages sticky category jump navigation, scroll-spy section tracking,
 * active pill alignment on mobile, and WhatsApp enquiry actions.
 */

import { CAFE_CONFIG } from './config.js';
import { MENU_CATEGORIES, MENU_ITEMS } from './menuData.js';

export class MenuManager {
  constructor() {
    this.stickyNav = document.getElementById('menu-sticky-nav');
    this.container = document.getElementById('menu-editorial-content');
    this.categorySections = document.querySelectorAll('.menu-editorial-category');
    this.navPills = document.querySelectorAll('.menu-nav-pill');
    this.whatsappNumber = CAFE_CONFIG.contact.whatsappNumber || '917359295384';
    this.header = document.getElementById('main-header');
    this.observer = null;
    this.isManualScrolling = false;
  }

  init() {
    this.bindStickyNavClicks();
    this.setupScrollSpy();
    this.setupStickyObserver();
  }

  getHeaderOffset() {
    const headerHeight = this.header ? this.header.offsetHeight : 76;
    const stickyHeight = this.stickyNav ? this.stickyNav.offsetHeight : 54;
    return headerHeight + stickyHeight + 10;
  }

  bindStickyNavClicks() {
    if (!this.stickyNav) return;

    this.stickyNav.addEventListener('click', (e) => {
      const link = e.target.closest('.menu-nav-pill');
      if (!link) return;

      e.preventDefault();
      const targetId = link.getAttribute('data-target') || link.getAttribute('href').replace('#', '');
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        this.isManualScrolling = true;
        this.setActivePill(targetId);

        const targetTop = targetSection.getBoundingClientRect().top + window.pageYOffset - this.getHeaderOffset();

        window.scrollTo({
          top: targetTop,
          behavior: 'smooth'
        });

        // Re-enable scroll-spy after scroll completes
        setTimeout(() => {
          this.isManualScrolling = false;
        }, 800);
      }
    });
  }

  setActivePill(targetId) {
    if (!this.navPills) return;

    let activePill = null;
    this.navPills.forEach((pill) => {
      const match = pill.getAttribute('data-target') === targetId || pill.getAttribute('href') === `#${targetId}`;
      pill.classList.toggle('active', match);
      pill.setAttribute('aria-selected', match ? 'true' : 'false');
      if (match) activePill = pill;
    });

    // On mobile, scroll sticky nav container so active pill is centered
    if (activePill && this.stickyNav) {
      const navInner = this.stickyNav.querySelector('.menu-sticky-nav-inner');
      if (navInner) {
        const pillLeft = activePill.offsetLeft;
        const pillWidth = activePill.offsetWidth;
        const navWidth = navInner.offsetWidth;
        navInner.scrollTo({
          left: pillLeft - (navWidth / 2) + (pillWidth / 2),
          behavior: 'smooth'
        });
      }
    }
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
            this.setActivePill(sectionId);
          }
        }
      });
    }, observerOptions);

    this.categorySections.forEach((section) => {
      this.observer.observe(section);
    });
  }

  setupStickyObserver() {
    // Add subtle shadow when sticky navigation is pinned
    if (!this.stickyNav) return;

    const checkSticky = () => {
      const headerHeight = this.header ? this.header.offsetHeight : 76;
      const navTop = this.stickyNav.getBoundingClientRect().top;
      this.stickyNav.classList.toggle('is-pinned', navTop <= headerHeight + 2);
    };

    window.addEventListener('scroll', checkSticky, { passive: true });
    checkSticky();
  }
}
