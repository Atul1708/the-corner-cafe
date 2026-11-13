/**
 * The Corner Cafe – Navigation Component
 * Handles sticky transparent-to-solid navbar, active section spying,
 * mobile drawer menu, and mobile sticky action bar behavior.
 */

export class NavigationManager {
  constructor() {
    this.header = document.getElementById('main-header');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.mobileMenuBtn = document.getElementById('mobile-menu-btn');
    this.mobileDrawer = document.getElementById('mobile-drawer');
    this.mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    this.mobileActionBar = document.getElementById('mobile-action-bar');
    this.footer = document.getElementById('contact');
    
    this.sections = document.querySelectorAll('section[id], footer[id]');
    this.currentActiveId = '';
  }

  init() {
    this.bindScrollEvents();
    this.bindMobileMenu();
    this.bindSectionObserver();
    this.bindSmoothScroll();
    this.updateHeaderState();
  }

  updateHeaderState() {
    if (!this.header) return;
    const scrollY = window.scrollY || window.pageYOffset;
    if (scrollY > 40) {
      this.header.classList.add('scrolled');
    } else {
      this.header.classList.remove('scrolled');
    }

    // Hide mobile action bar when near footer to avoid overlap
    if (this.mobileActionBar && this.footer) {
      const footerRect = this.footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (footerRect.top < windowHeight - 80) {
        this.mobileActionBar.classList.add('docked-or-hidden');
      } else {
        this.mobileActionBar.classList.remove('docked-or-hidden');
      }
    }
  }

  bindScrollEvents() {
    let ticking = false;

    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            this.updateHeaderState();
            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true }
    );
  }

  bindSectionObserver() {
    if (!('IntersectionObserver' in window) || this.sections.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          if (id && id !== this.currentActiveId) {
            this.setActiveLink(id);
          }
        }
      });
    }, observerOptions);

    this.sections.forEach((section) => observer.observe(section));
  }

  setActiveLink(id) {
    this.currentActiveId = id;
    this.navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      const isMatch = href === `#${id}`;
      link.classList.toggle('active', isMatch);
      if (isMatch) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });

    this.mobileNavLinks.forEach((link) => {
      const href = link.getAttribute('href');
      const isMatch = href === `#${id}`;
      link.classList.toggle('active', isMatch);
    });
  }

  bindMobileMenu() {
    if (!this.mobileMenuBtn || !this.mobileDrawer) return;

    const toggleMenu = (open) => {
      const isOpen = open !== undefined ? open : !this.mobileDrawer.classList.contains('open');
      this.mobileDrawer.classList.toggle('open', isOpen);
      this.mobileMenuBtn.classList.toggle('active', isOpen);
      this.mobileMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      this.mobileDrawer.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
      document.body.classList.toggle('menu-open', isOpen);
    };

    this.mobileMenuBtn.addEventListener('click', () => toggleMenu());

    // Close on clicking links
    this.mobileNavLinks.forEach((link) => {
      link.addEventListener('click', () => toggleMenu(false));
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.mobileDrawer.classList.contains('open')) {
        toggleMenu(false);
        this.mobileMenuBtn.focus();
      }
    });
  }

  bindSmoothScroll() {
    const allInternalLinks = document.querySelectorAll('a[href^="#"]');
    allInternalLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (!targetId || targetId === '#') return;

        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          const headerOffset = 80;
          const elementPosition = targetEl.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          // Set focus for accessibility
          targetEl.setAttribute('tabindex', '-1');
          targetEl.focus({ preventScroll: true });
        }
      });
    });
  }
}

