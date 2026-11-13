/**
 * The Corner Cafe – Gallery & Lightbox Component
 * Handles the magazine-style visual grid, lightbox modal, and keyboard accessibility.
 */

import { CAFE_CONFIG } from './config.js';

export class GalleryManager {
  constructor() {
    this.grid = document.getElementById('gallery-grid');
    this.lightbox = document.getElementById('gallery-lightbox');
    this.lightboxImage = document.getElementById('lightbox-img');
    this.lightboxTitle = document.getElementById('lightbox-title');
    this.lightboxSubtitle = document.getElementById('lightbox-subtitle');
    this.lightboxCategory = document.getElementById('lightbox-category');
    this.closeBtn = document.getElementById('lightbox-close');
    this.prevBtn = document.getElementById('lightbox-prev');
    this.nextBtn = document.getElementById('lightbox-next');
    
    this.items = CAFE_CONFIG.galleryItems || [];
    this.currentIndex = 0;
    this.previousActiveElement = null;
  }

  init() {
    if (!this.grid) return;
    this.renderGallery();
    this.bindEvents();
  }

  renderGallery() {
    this.grid.innerHTML = this.items
      .map(
        (item, index) => `
        <figure class="gallery-item gallery-item-${index + 1}" data-index="${index}">
          <button 
            type="button" 
            class="gallery-item-btn" 
            aria-label="View photo: ${item.title}"
            data-index="${index}"
          >
            <img 
              src="${item.image}" 
              alt="${item.alt || item.title}" 
              width="800" 
              height="600" 
              loading="lazy" 
              decoding="async" 
              class="gallery-item-img"
            />
            <figcaption class="gallery-item-caption">
              <span class="gallery-item-tag">${item.category}</span>
              <h3 class="gallery-item-title">${item.title}</h3>
              <p class="gallery-item-sub">${item.subtitle}</p>
              <span class="gallery-expand-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <polyline points="9 21 3 21 3 15"></polyline>
                  <line x1="21" y1="3" x2="14" y2="10"></line>
                  <line x1="3" y1="21" x2="10" y2="14"></line>
                </svg>
              </span>
            </figcaption>
          </button>
        </figure>
      `
      )
      .join('');
  }

  openLightbox(index) {
    if (!this.lightbox || !this.items[index]) return;
    this.previousActiveElement = document.activeElement;
    this.currentIndex = index;
    this.updateLightboxContent();

    this.lightbox.classList.add('active');
    this.lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');

    if (this.closeBtn) {
      this.closeBtn.focus();
    }
  }

  closeLightbox() {
    if (!this.lightbox) return;
    this.lightbox.classList.remove('active');
    this.lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');

    if (this.previousActiveElement && typeof this.previousActiveElement.focus === 'function') {
      this.previousActiveElement.focus();
    }
  }

  updateLightboxContent() {
    const item = this.items[this.currentIndex];
    if (!item) return;

    if (this.lightboxImage) {
      this.lightboxImage.src = item.image;
      this.lightboxImage.alt = item.alt || item.title;
    }
    if (this.lightboxTitle) {
      this.lightboxTitle.textContent = item.title;
    }
    if (this.lightboxSubtitle) {
      this.lightboxSubtitle.textContent = item.subtitle;
    }
    if (this.lightboxCategory) {
      this.lightboxCategory.textContent = item.category;
    }
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
    this.updateLightboxContent();
  }

  prevImage() {
    this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
    this.updateLightboxContent();
  }

  bindEvents() {
    if (this.grid) {
      this.grid.addEventListener('click', (e) => {
        const btn = e.target.closest('.gallery-item-btn');
        if (!btn) return;
        const index = parseInt(btn.dataset.index, 10);
        if (!isNaN(index)) {
          this.openLightbox(index);
        }
      });
    }

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.closeLightbox());
    }

    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.prevImage();
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.nextImage();
      });
    }

    if (this.lightbox) {
      this.lightbox.addEventListener('click', (e) => {
        if (e.target === this.lightbox || e.target.classList.contains('lightbox-backdrop')) {
          this.closeLightbox();
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (!this.lightbox || !this.lightbox.classList.contains('active')) return;

      if (e.key === 'Escape') {
        this.closeLightbox();
      } else if (e.key === 'ArrowRight') {
        this.nextImage();
      } else if (e.key === 'ArrowLeft') {
        this.prevImage();
      }
    });
  }
}

