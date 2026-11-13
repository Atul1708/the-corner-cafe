/**
 * The Corner Cafe – Main Application Entry Point
 * Orchestrates modules, injects centralized config data, and binds global UI handlers.
 */

import { CAFE_CONFIG } from './config.js';
import { NavigationManager } from './navigation.js';
import { AnimationManager } from './animations.js';
import { MenuManager } from './menu.js';
import { GalleryManager } from './gallery.js';

class App {
  constructor() {
    this.navigation = new NavigationManager();
    this.animations = new AnimationManager();
    this.menu = new MenuManager();
    this.gallery = new GalleryManager();
  }

  init() {
    this.populateConfigData();
    this.renderExperiences();
    this.renderRatingHighlights();
    
    // Initialize components
    this.navigation.init();
    this.menu.init();
    this.gallery.init();
    this.animations.init();

    this.bindActionButtons();
    this.setupAccessibilityAids();
    this.setupBackToTop();
  }

  populateConfigData() {
    // Populate dynamic text from config across the page
    const ratingValues = document.querySelectorAll('.dynamic-rating-value');
    ratingValues.forEach((el) => {
      el.textContent = `${CAFE_CONFIG.ratings.googleRating}`;
    });

    const reviewCounts = document.querySelectorAll('.dynamic-review-count');
    reviewCounts.forEach((el) => {
      el.textContent = `${CAFE_CONFIG.ratings.reviewCount}`;
    });

    const phoneDisplays = document.querySelectorAll('.dynamic-phone-display');
    phoneDisplays.forEach((el) => {
      el.textContent = CAFE_CONFIG.contact.phoneDisplay;
    });

    const phoneLinks = document.querySelectorAll('.dynamic-phone-link');
    phoneLinks.forEach((el) => {
      el.setAttribute('href', CAFE_CONFIG.contact.callUrl);
    });

    const whatsappLinks = document.querySelectorAll('.dynamic-whatsapp-link');
    whatsappLinks.forEach((el) => {
      el.setAttribute('href', CAFE_CONFIG.contact.whatsappUrl);
    });

    const mapsLinks = document.querySelectorAll('.dynamic-maps-link');
    mapsLinks.forEach((el) => {
      el.setAttribute('href', CAFE_CONFIG.location.mapsUrl);
    });

    const addressDisplays = document.querySelectorAll('.dynamic-address-display');
    addressDisplays.forEach((el) => {
      el.textContent = CAFE_CONFIG.location.fullAddress;
    });

    const hoursDisplays = document.querySelectorAll('.dynamic-hours-display');
    hoursDisplays.forEach((el) => {
      el.textContent = CAFE_CONFIG.hours.display;
    });

    const yearDisplays = document.querySelectorAll('.dynamic-current-year');
    yearDisplays.forEach((el) => {
      el.textContent = '2026';
    });
  }

  renderExperiences() {
    const container = document.getElementById('experience-cards-grid');
    if (!container || container.children.length > 0) return;

    const experiences = CAFE_CONFIG.experiences || [];
    container.innerHTML = experiences
      .map(
        (exp, i) => `
        <div class="exp-card reveal-on-scroll" style="--stagger-delay: ${i * 90}ms">
          <div class="exp-card-number">${exp.number}</div>
          <div class="exp-card-body">
            <h3 class="exp-card-title">${exp.title}</h3>
            <p class="exp-card-desc">${exp.description}</p>
          </div>
          <div class="exp-card-corner-accent" aria-hidden="true"></div>
        </div>
      `
      )
      .join('');
  }

  renderRatingHighlights() {
    const container = document.getElementById('reviews-highlights-grid');
    if (!container) return;

    const highlights = CAFE_CONFIG.ratings.highlights || [];
    container.innerHTML = highlights
      .map(
        (hl, i) => `
        <article class="reputation-card reveal-on-scroll" style="--stagger-delay: ${i * 80}ms">
          <div class="reputation-card-header">
            <span class="reputation-badge">${hl.badge}</span>
            <div class="reputation-stars" aria-hidden="true">★★★★★</div>
          </div>
          <h3 class="reputation-card-title">${hl.title}</h3>
          <p class="reputation-card-desc">${hl.description}</p>
        </article>
      `
      )
      .join('');
  }

  bindActionButtons() {
    // Quick CTA interactions or feedback triggers if needed
  }

  setupAccessibilityAids() {
    // Handle tab navigation focus rings
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('user-is-tabbing');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('user-is-tabbing');
    });

    // Guard against unwanted horizontal scroll drift on mobile touch
    const checkOverflow = () => {
      if (document.documentElement.scrollWidth > window.innerWidth) {
        document.documentElement.style.overflowX = 'clip';
        document.body.style.overflowX = 'clip';
      }
    };
    window.addEventListener('resize', checkOverflow, { passive: true });
    checkOverflow();
  }

  setupBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    const toggleVisibility = () => {
      const scrolled = window.pageYOffset || document.documentElement.scrollTop;
      btn.classList.toggle('is-visible', scrolled > 450);
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility();

    btn.addEventListener('click', () => {
      if (this.animations && this.animations.lenis) {
        this.animations.lenis.scrollTo(0, { duration: 1.4 });
      } else {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    });
  }
}

// Bootstrap once DOM content is parsed
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
  });
} else {
  const app = new App();
  app.init();
}
