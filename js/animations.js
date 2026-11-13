/**
 * The Corner Cafe – Award-Winning GSAP Creative Motion Engine
 * Inspired by premium digital design agencies (AW Media, Locomotive, Monopo).
 * 
 * Features:
 * - GSAP 3.12.5 & ScrollTrigger lifecycle managed via gsap.context() and gsap.matchMedia().
 * - Dedicated responsive configurations:
 *   - Desktop (min-width: 992px): AW Media pinned card-stack showcase with scrub: true, vertical parallax, and smooth cursor.
 *   - Mobile (max-width: 991px): Independent per-card scroll reveals (01 Coffee, 02 Food, 03 Moments), natural document touch scrolling, per-item gallery and review reveals.
 * - Lightweight non-blocking brand intro with bulletproof CSS/JS auto-dismiss.
 * - 100% graceful degradation for prefers-reduced-motion and non-JS fallbacks.
 */

export class AnimationManager {
  constructor() {
    this.gsap = window.gsap;
    this.ScrollTrigger = window.ScrollTrigger;

    this.brandIntro = document.getElementById('brand-intro');
    this.customCursor = document.getElementById('custom-cursor');
    this.customCursorDot = document.getElementById('custom-cursor-dot');
    this.magneticButtons = document.querySelectorAll('.magnetic-btn');

    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    this.ctx = null;
    this.mm = null;
    this.introDismissed = false;
  }

  init() {
    // 1. Always enforce failsafe timeout for brand intro immediately
    this.setupBrandIntroFailsafe();

    // 2. Graceful fallback if GSAP is unavailable or reduced motion is active
    if (!this.gsap || !this.ScrollTrigger || this.reducedMotion) {
      this.dismissBrandIntro(true);
      this.revealAllImmediately();
      return;
    }

    // 3. Register ScrollTrigger plugin
    this.gsap.registerPlugin(this.ScrollTrigger);

    // 4. Clean up any existing GSAP context and matchMedia before re-binding
    if (this.ctx) {
      this.ctx.revert();
    }
    if (this.mm) {
      this.mm.revert();
    }

    // 5. Initialize matchMedia instance
    this.mm = this.gsap.matchMedia();

    // 6. Build all motion pipelines inside a scoped gsap.context
    this.ctx = this.gsap.context(() => {
      // Shared / Universal Entrance (Runs across all screen sizes)
      this.initBrandIntroSequence();
      this.initHeroEntrance();

      // ======================================================================
      // DESKTOP CONFIGURATION (min-width: 992px)
      // ======================================================================
      this.mm.add('(min-width: 992px)', () => {
        this.initHeroParallax();
        this.initDesktopStoryMotion();
        this.initDesktopMenuMotion();
        this.initDesktopExperienceShowcase();
        this.initDesktopGalleryMotion();
        this.initDesktopReviewsAndLocationMotion();
        this.initDesktopSectionHeadersMotion();

        if (!this.isTouchDevice) {
          this.initCustomCursor();
          this.initMagneticButtons();
        }

        return () => {
          document.body.classList.remove('has-custom-cursor');
        };
      });

      // ======================================================================
      // MOBILE & TABLET CONFIGURATION (max-width: 991px)
      // ======================================================================
      this.mm.add('(max-width: 991px)', () => {
        this.initMobileStoryMotion();
        this.initMobileMenuMotion();
        this.initMobileExperienceShowcase();
        this.initMobileGalleryMotion();
        this.initMobileReviewsAndLocationMotion();
        this.initMobileSectionHeadersMotion();
      });
    });

    // 7. Recalibrate ScrollTrigger after web fonts and image assets settle
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        if (this.ScrollTrigger) this.ScrollTrigger.refresh();
      });
    }

    window.addEventListener('load', () => {
      setTimeout(() => {
        if (this.ScrollTrigger) this.ScrollTrigger.refresh();
      }, 150);
    });
  }

  /* ==========================================================================
     Safety & Fallback: Immediate Visibility
     ========================================================================== */

  revealAllImmediately() {
    this.dismissBrandIntro(true);

    const elementsToReveal = document.querySelectorAll(
      '.reveal-on-scroll, .reveal-heading, .reveal-text, .reveal-clip, .reveal-scale, .hero-stagger, .scroll-indicator, .menu-row-item, .story-image-card, .exp-stack-card, .exp-mobile-card, .exp-card'
    );
    elementsToReveal.forEach((el) => {
      el.classList.add('is-revealed');
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.clipPath = 'none';
      el.style.filter = 'none';
    });
  }

  /* ==========================================================================
     0. Brand Intro Sequence (Subtle, Non-blocking, Hard Failsafe)
     ========================================================================== */

  setupBrandIntroFailsafe() {
    // Guaranteed hard dismissal after 450ms regardless of script execution
    setTimeout(() => {
      this.dismissBrandIntro(true);
    }, 450);
  }

  initBrandIntroSequence() {
    if (!this.brandIntro || this.introDismissed) {
      this.playHeroEntrance();
      return;
    }

    const content = this.brandIntro.querySelector('.brand-intro-content');
    const introTl = this.gsap.timeline({
      onComplete: () => {
        this.dismissBrandIntro();
      }
    });

    if (content) {
      introTl.fromTo(
        content,
        { opacity: 0, scale: 0.95, y: 8 },
        { opacity: 1, scale: 1, y: 0, duration: 0.25, ease: 'power2.out' },
        0
      );
    }

    // Swift curtain lift
    introTl.to(
      this.brandIntro,
      {
        yPercent: -100,
        opacity: 0,
        duration: 0.35,
        ease: 'power3.inOut'
      },
      0.28
    );
  }

  dismissBrandIntro(immediate = false) {
    if (this.introDismissed) return;
    this.introDismissed = true;

    if (this.brandIntro) {
      if (immediate) {
        this.brandIntro.classList.add('dismissed');
        this.brandIntro.style.display = 'none';
      } else {
        this.brandIntro.classList.add('dismissed');
        setTimeout(() => {
          if (this.brandIntro) this.brandIntro.style.display = 'none';
        }, 400);
      }
    }

    this.playHeroEntrance();
  }

  /* ==========================================================================
     1. Hero Section: Universal Entrance & Desktop Parallax
     ========================================================================== */

  initHeroEntrance() {
    if (!this.brandIntro || this.brandIntro.classList.contains('dismissed')) {
      this.playHeroEntrance();
    }
  }

  playHeroEntrance() {
    if (this.heroEntrancePlayed) return;
    this.heroEntrancePlayed = true;

    const heroTl = this.gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Culture badge
    const badge = document.querySelector('.hero-culture-badge');
    if (badge) {
      heroTl.fromTo(badge, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 0.05);
    }

    // Eyebrow
    const eyebrow = document.querySelector('.hero-eyebrow');
    if (eyebrow) {
      heroTl.fromTo(eyebrow, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5 }, 0.1);
    }

    // Two-line headline
    const line1 = document.querySelector('.hero-line-primary');
    const line2 = document.querySelector('.hero-line-secondary');
    if (line1) {
      heroTl.fromTo(line1, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.65 }, 0.16);
    }
    if (line2) {
      heroTl.fromTo(line2, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.65 }, 0.26);
    }

    // Supporting paragraph
    const support = document.querySelector('.hero-support-text');
    if (support) {
      heroTl.fromTo(support, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.55 }, 0.35);
    }

    // CTA buttons
    const ctas = document.querySelectorAll('.hero-cta-cluster a');
    if (ctas.length > 0) {
      heroTl.fromTo(ctas, { opacity: 0, y: 14 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.55 }, 0.42);
    }

    // Bottom Information Strip (Trust Bar)
    const trustBar = document.querySelector('.hero-info-strip-area');
    if (trustBar) {
      heroTl.fromTo(trustBar, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.55 }, 0.52);
    }

    // Scroll Mouse Indicator
    const scrollInd = document.querySelector('.scroll-indicator');
    if (scrollInd) {
      heroTl.fromTo(scrollInd, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.45 }, 0.62);
    }
  }

  initHeroParallax() {
    const heroSection = document.getElementById('hero');
    const heroContainer = document.querySelector('.hero-bg-container');
    const scrollInd = document.querySelector('.scroll-indicator');

    if (!heroSection) return;

    if (heroContainer) {
      this.gsap.to(heroContainer, {
        scrollTrigger: {
          trigger: heroSection,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        },
        yPercent: 10,
        ease: 'none'
      });
    }

    if (scrollInd) {
      this.gsap.to(scrollInd, {
        scrollTrigger: {
          trigger: heroSection,
          start: 'top top',
          end: '120px top',
          scrub: true
        },
        opacity: 0,
        y: 8,
        ease: 'none'
      });
    }
  }

  /* ==========================================================================
     2. DESKTOP: Our Story Motion (min-width: 992px)
     ========================================================================== */

  initDesktopStoryMotion() {
    const story = document.getElementById('story');
    if (!story) return;

    const storyTl = this.gsap.timeline({
      scrollTrigger: {
        trigger: story,
        start: 'top 95%',
        toggleActions: 'play none none none'
      },
      defaults: { ease: 'power3.out' }
    });

    const tag = story.querySelector('.story-section-tag');
    const rule = story.querySelector('.story-eyebrow-rule');
    const lines = story.querySelectorAll('.story-headline-line');
    const imageCard = story.querySelector('.story-image-card');
    const narrativeElements = story.querySelectorAll(
      '.story-decorative-mark, .story-lead-text, .story-body-text, .story-ethos-strip'
    );

    if (tag) {
      storyTl.fromTo(tag, { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: 0.4 }, 0);
    }
    if (rule) {
      storyTl.fromTo(rule, { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, duration: 0.5 }, 0.05);
    }
    if (lines.length > 0) {
      storyTl.fromTo(lines, { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.06, duration: 0.45 }, 0.08);
    }
    if (imageCard) {
      storyTl.fromTo(
        imageCard,
        { clipPath: 'inset(6% 0% 6% 0% round 20px)' },
        { clipPath: 'inset(0% 0% 0% 0% round 20px)', duration: 0.55 },
        0.1
      );
    }
    if (narrativeElements.length > 0) {
      storyTl.fromTo(
        narrativeElements,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, stagger: 0.05, duration: 0.45 },
        0.12
      );
    }
  }

  /* ==========================================================================
     3. DESKTOP: Signature Menu Motion (min-width: 992px)
     ========================================================================== */

  initDesktopMenuMotion() {
    const banners = document.querySelectorAll('.menu-editorial-break');
    banners.forEach((banner) => {
      this.gsap.fromTo(
        banner,
        { clipPath: 'inset(6% 0% 6% 0% round 16px)' },
        {
          scrollTrigger: {
            trigger: banner,
            start: 'top 90%',
            toggleActions: 'play none none none'
          },
          clipPath: 'inset(0% 0% 0% 0% round 16px)',
          duration: 0.8,
          ease: 'power3.out'
        }
      );
    });

    const catHeaders = document.querySelectorAll('.menu-cat-header');
    catHeaders.forEach((hdr) => {
      this.gsap.fromTo(
        hdr,
        { opacity: 0, y: 16 },
        {
          scrollTrigger: {
            trigger: hdr,
            start: 'top 92%',
            toggleActions: 'play none none none'
          },
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: 'power3.out'
        }
      );
    });
  }

  /* ==========================================================================
     4. DESKTOP: Pinned In-Place Experience Card-Stack Showcase (min-width: 992px)
        AW Media Pattern with Scrub Synchronization
     ========================================================================== */

  initDesktopExperienceShowcase() {
    const pinViewport = document.getElementById('experience-pinned-viewport');
    const deck = document.getElementById('exp-card-deck');
    if (!pinViewport || !deck) return;

    const cards = deck.querySelectorAll('.exp-stack-card');
    const dots = document.querySelectorAll('.exp-deck-nav .exp-nav-dot');
    const currentStepDisplay = document.getElementById('exp-current-step');
    const progressFill = document.getElementById('exp-stack-progress-fill');
    const header = document.getElementById('main-header');

    if (cards.length < 3) return;

    const getHeaderHeight = () => (header ? header.offsetHeight : 68);

    // Initial state: Card 0 is visible at resting position
    this.gsap.set(cards[0], { yPercent: 0, scale: 1, filter: 'brightness(1)' });
    // Card 1 and Card 2 start below the stage ready to slide up
    this.gsap.set(cards[1], { yPercent: 105, scale: 0.96, filter: 'brightness(0.85)' });
    this.gsap.set(cards[2], { yPercent: 105, scale: 0.92, filter: 'brightness(0.75)' });

    // Helper to update active indicator dot and number
    const setActiveStep = (index) => {
      if (currentStepDisplay) {
        currentStepDisplay.textContent = `0${index + 1}`;
      }
      dots.forEach((dot, idx) => {
        const isActive = idx === index;
        dot.classList.toggle('active', isActive);
        dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
      cards.forEach((card, idx) => {
        card.classList.toggle('is-active', idx === index);
      });
    };

    // Master Coordinated Timeline pinned beneath header
    const expTl = this.gsap.timeline({
      scrollTrigger: {
        trigger: pinViewport,
        start: () => `top ${getHeaderHeight()}px`,
        end: '+=180%',
        pin: true,
        pinSpacing: true,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress < 0.35) {
            setActiveStep(0);
          } else if (progress < 0.72) {
            setActiveStep(1);
          } else {
            setActiveStep(2);
          }
        }
      }
    });

    // 1. Progress Bar Fill: scaleY 0 -> 1 across full timeline (duration: 2.0)
    if (progressFill) {
      expTl.to(
        progressFill,
        {
          scaleY: 1,
          ease: 'none',
          duration: 2.0
        },
        0
      );
    }

    // TRANSITION 1: Card 01 -> Card 02 (t = 0.45 to 0.95)
    expTl.to(
      cards[0],
      {
        scale: 0.94,
        y: -16,
        filter: 'brightness(0.65)',
        duration: 0.5,
        ease: 'power2.inOut'
      },
      0.45
    );

    expTl.to(
      cards[1],
      {
        yPercent: 0,
        scale: 1,
        filter: 'brightness(1)',
        duration: 0.5,
        ease: 'power2.inOut'
      },
      0.45
    );

    // TRANSITION 2: Card 02 -> Card 03 (t = 1.25 to 1.75)
    expTl.to(
      cards[0],
      {
        scale: 0.88,
        y: -30,
        filter: 'brightness(0.45)',
        duration: 0.5,
        ease: 'power2.inOut'
      },
      1.25
    );

    expTl.to(
      cards[1],
      {
        scale: 0.94,
        y: -16,
        filter: 'brightness(0.65)',
        duration: 0.5,
        ease: 'power2.inOut'
      },
      1.25
    );

    expTl.to(
      cards[2],
      {
        yPercent: 0,
        scale: 1,
        filter: 'brightness(1)',
        duration: 0.5,
        ease: 'power2.inOut'
      },
      1.25
    );

    // Interactive Click on Step Navigation Dots
    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        if (!expTl.scrollTrigger) return;
        const progressMilestones = [0.05, 0.55, 0.95];
        const targetProgress = progressMilestones[idx];
        const st = expTl.scrollTrigger;
        const targetY = st.start + (st.end - st.start) * targetProgress;
        window.scrollTo({
          top: targetY,
          behavior: 'smooth'
        });
      });
    });
  }

  /* ==========================================================================
     5. DESKTOP: Visual Gallery Motion (min-width: 992px)
     ========================================================================== */

  initDesktopGalleryMotion() {
    const galleryGrid = document.getElementById('gallery-grid');
    if (!galleryGrid) return;

    const items = galleryGrid.querySelectorAll('.gallery-item');
    if (items.length === 0) return;

    this.gsap.fromTo(
      items,
      { opacity: 0, y: 24 },
      {
        scrollTrigger: {
          trigger: galleryGrid,
          start: 'top 90%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        stagger: 0.06,
        duration: 0.65,
        ease: 'power2.out'
      }
    );
  }

  /* ==========================================================================
     6. DESKTOP: Customer Reviews & Location Motion (min-width: 992px)
     ========================================================================== */

  initDesktopReviewsAndLocationMotion() {
    const reviewCards = document.querySelectorAll('.reviews-showcase article');
    if (reviewCards.length > 0) {
      this.gsap.fromTo(
        reviewCards,
        { opacity: 0, y: 20 },
        {
          scrollTrigger: {
            trigger: '#reviews',
            start: 'top 82%',
            toggleActions: 'play none none none'
          },
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power2.out'
        }
      );
    }

    const locationCards = document.querySelectorAll('.location-info-card, .location-map-wrap');
    if (locationCards.length > 0) {
      this.gsap.fromTo(
        locationCards,
        { opacity: 0, y: 20 },
        {
          scrollTrigger: {
            trigger: '#contact',
            start: 'top 80%',
            toggleActions: 'play none none none'
          },
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.75,
          ease: 'power2.out'
        }
      );
    }
  }

  /* ==========================================================================
     7. DESKTOP: Shared Section Headers (min-width: 992px)
     ========================================================================== */

  initDesktopSectionHeadersMotion() {
    const titles = document.querySelectorAll('.section-title.reveal-heading');
    titles.forEach((t) => {
      this.gsap.fromTo(
        t,
        { opacity: 0, y: 16 },
        {
          scrollTrigger: {
            trigger: t,
            start: 'top 92%',
            toggleActions: 'play none none none'
          },
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power3.out'
        }
      );
    });

    const subtitles = document.querySelectorAll('.section-subtitle.reveal-text, .section-eyebrow.reveal-text');
    subtitles.forEach((s) => {
      this.gsap.fromTo(
        s,
        { opacity: 0, y: 12 },
        {
          scrollTrigger: {
            trigger: s,
            start: 'top 94%',
            toggleActions: 'play none none none'
          },
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: 'power2.out'
        }
      );
    });
  }

  /* ==========================================================================
     ==========================================================================
     MOBILE & TABLET ANIMATIONS (max-width: 991px)
     Natural Touch Scrolling, Independent Per-Element Scroll Triggers
     ==========================================================================
     ========================================================================== */

  /* ==========================================================================
     M1. MOBILE: Our Story Motion (max-width: 991px)
     ========================================================================== */

  initMobileStoryMotion() {
    const story = document.getElementById('story');
    if (!story) return;

    // 1. Mobile Story Header: Lines upward fade
    const header = story.querySelector('.story-header');
    const lines = story.querySelectorAll('.story-headline-line');
    if (header && lines.length > 0) {
      this.gsap.fromTo(
        lines,
        { opacity: 0, y: 16 },
        {
          scrollTrigger: {
            trigger: header,
            start: 'top 90%',
            toggleActions: 'play none none none'
          },
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.45,
          ease: 'power2.out'
        }
      );
    }

    // 2. Mobile Story Image: Smooth curtain clip-path reveal
    const imageCard = story.querySelector('.story-image-card');
    if (imageCard) {
      this.gsap.fromTo(
        imageCard,
        { clipPath: 'inset(6% 0% 6% 0% round 16px)' },
        {
          scrollTrigger: {
            trigger: imageCard,
            start: 'top 88%',
            toggleActions: 'play none none none'
          },
          clipPath: 'inset(0% 0% 0% 0% round 16px)',
          duration: 0.5,
          ease: 'power2.out'
        }
      );
    }

    // 3. Mobile Story Narrative: Lead & body text
    const content = story.querySelector('.story-narrative-content');
    if (content) {
      const paras = content.querySelectorAll('p');
      this.gsap.fromTo(
        paras,
        { opacity: 0, y: 14 },
        {
          scrollTrigger: {
            trigger: content,
            start: 'top 88%',
            toggleActions: 'play none none none'
          },
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.45,
          ease: 'power2.out'
        }
      );
    }

    // 4. Mobile Story Ethos Bar: Subtle scale & fade
    const ethos = story.querySelector('.story-ethos-strip');
    if (ethos) {
      this.gsap.fromTo(
        ethos,
        { opacity: 0, scale: 0.96 },
        {
          scrollTrigger: {
            trigger: ethos,
            start: 'top 92%',
            toggleActions: 'play none none none'
          },
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: 'power2.out'
        }
      );
    }
  }

  /* ==========================================================================
     M2. MOBILE: Menu Motion (max-width: 991px)
     ========================================================================== */

  initMobileMenuMotion() {
    // 1. Mobile Category Headers: independent triggers
    const catHeaders = document.querySelectorAll('.menu-cat-header');
    catHeaders.forEach((hdr) => {
      this.gsap.fromTo(
        hdr,
        { opacity: 0, y: 14 },
        {
          scrollTrigger: {
            trigger: hdr,
            start: 'top 90%',
            toggleActions: 'play none none none'
          },
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: 'power2.out'
        }
      );
    });

    // 2. Mobile Editorial Photo Banners: curtain reveals
    const banners = document.querySelectorAll('.menu-editorial-break');
    banners.forEach((banner) => {
      this.gsap.fromTo(
        banner,
        { clipPath: 'inset(6% 0% 6% 0% round 14px)' },
        {
          scrollTrigger: {
            trigger: banner,
            start: 'top 88%',
            toggleActions: 'play none none none'
          },
          clipPath: 'inset(0% 0% 0% 0% round 14px)',
          duration: 0.5,
          ease: 'power2.out'
        }
      );
    });

    // 3. Mobile Menu Items Staggered Appearance per Subgroup
    const subgroups = document.querySelectorAll('.menu-subgroup');
    subgroups.forEach((subgroup) => {
      const items = subgroup.querySelectorAll('.menu-row-item');
      if (items.length > 0) {
        this.gsap.fromTo(
          items,
          { opacity: 0, y: 10 },
          {
            scrollTrigger: {
              trigger: subgroup,
              start: 'top 90%',
              toggleActions: 'play none none none'
            },
            opacity: 1,
            y: 0,
            stagger: 0.03,
            duration: 0.35,
            ease: 'power2.out'
          }
        );
      }
    });
  }

  /* ==========================================================================
     M3. MOBILE: Dedicated Pinned In-Place Storytelling Showcase (max-width: 991px)
     AW Media-inspired Mobile Storytelling: Coordinated 1:1 Scrub Timeline
     Sequence: 01 Coffee & Drinks -> 02 Comforting Food -> 03 Moments & Atmosphere
     ========================================================================== */

  initMobileExperienceShowcase() {
    const stage = document.getElementById('experience-mobile-pinned-stage');
    
    // If the mobile pinned storytelling stage is present, initialize the in-place pinned timeline
    if (stage) {
      const slides = stage.querySelectorAll('.exp-mob-visual-slide');
      const stories = stage.querySelectorAll('.exp-mob-story-panel');
      const segFills = [
        document.getElementById('exp-mob-seg-fill-0'),
        document.getElementById('exp-mob-seg-fill-1'),
        document.getElementById('exp-mob-seg-fill-2')
      ];
      const stepNum = document.getElementById('exp-mob-step-num');
      const header = document.getElementById('main-header');

      if (slides.length >= 3 && stories.length >= 3) {
        const getHeaderHeight = () => (header ? header.offsetHeight : 64);

        // Initial State Setup: State 01 (Coffee & Drinks) is fully active
        this.gsap.set(slides[0], { autoAlpha: 1, scale: 1 });
        this.gsap.set(slides[1], { autoAlpha: 0, scale: 1.05 });
        this.gsap.set(slides[2], { autoAlpha: 0, scale: 1.05 });

        this.gsap.set(stories[0], { autoAlpha: 1, y: 0 });
        this.gsap.set(stories[1], { autoAlpha: 0, y: 14 });
        this.gsap.set(stories[2], { autoAlpha: 0, y: 14 });

        segFills.forEach((fill) => {
          if (fill) this.gsap.set(fill, { scaleX: 0 });
        });

        // Helper to update active step number and accessibility attributes
        const setActiveMobileStep = (index) => {
          if (stepNum) {
            stepNum.textContent = `0${index + 1}`;
          }
          slides.forEach((slide, idx) => {
            slide.classList.toggle('is-active', idx === index);
          });
          stories.forEach((story, idx) => {
            const isActive = idx === index;
            story.classList.toggle('is-active', isActive);
            story.setAttribute('aria-hidden', isActive ? 'false' : 'true');
          });
        };

        // Master Coordinated Timeline pinned beneath header
        const mobileExpTl = this.gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: () => `top ${getHeaderHeight()}px`,
            end: '+=160%',
            pin: true,
            pinSpacing: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const p = self.progress;
              if (p < 0.33) {
                setActiveMobileStep(0);
              } else if (p < 0.68) {
                setActiveMobileStep(1);
              } else {
                setActiveMobileStep(2);
              }
            }
          }
        });

        // ====================================================================
        // TIMELINE SEQUENCE (Total duration: 2.0)
        // State 01: 0.00 - 0.65  |  Transition 1: 0.65 - 0.95
        // State 02: 0.95 - 1.35  |  Transition 2: 1.35 - 1.65
        // State 03: 1.65 - 2.00
        // ====================================================================

        // Segment 0 fill across first third (0.00 to 0.66)
        if (segFills[0]) {
          mobileExpTl.to(segFills[0], { scaleX: 1, ease: 'none', duration: 0.66 }, 0);
        }

        // TRANSITION 1: State 01 (Coffee) -> State 02 (Food) (t = 0.65 to 0.95)
        mobileExpTl.to(
          stories[0],
          {
            autoAlpha: 0,
            y: -12,
            duration: 0.14,
            ease: 'power2.in'
          },
          0.65
        );

        mobileExpTl.to(
          slides[0],
          {
            autoAlpha: 0,
            scale: 0.96,
            duration: 0.25,
            ease: 'power2.inOut'
          },
          0.67
        );

        mobileExpTl.to(
          slides[1],
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.25,
            ease: 'power2.inOut'
          },
          0.70
        );

        mobileExpTl.to(
          stories[1],
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.15,
            ease: 'power2.out'
          },
          0.80
        );

        // Segment 1 fill across second third (0.66 to 1.33)
        if (segFills[1]) {
          mobileExpTl.to(segFills[1], { scaleX: 1, ease: 'none', duration: 0.67 }, 0.66);
        }

        // TRANSITION 2: State 02 (Food) -> State 03 (Moments) (t = 1.35 to 1.65)
        mobileExpTl.to(
          stories[1],
          {
            autoAlpha: 0,
            y: -12,
            duration: 0.14,
            ease: 'power2.in'
          },
          1.35
        );

        mobileExpTl.to(
          slides[1],
          {
            autoAlpha: 0,
            scale: 0.96,
            duration: 0.25,
            ease: 'power2.inOut'
          },
          1.37
        );

        mobileExpTl.to(
          slides[2],
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.25,
            ease: 'power2.inOut'
          },
          1.40
        );

        mobileExpTl.to(
          stories[2],
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.15,
            ease: 'power2.out'
          },
          1.50
        );

        // Segment 2 fill across final third (1.33 to 2.00)
        if (segFills[2]) {
          mobileExpTl.to(segFills[2], { scaleX: 1, ease: 'none', duration: 0.67 }, 1.33);
        }

        return;
      }
    }

    // Accessible Fallback: Vertical card reveal for reduced motion or no-pinned scenarios
    const cards = document.querySelectorAll('.experience-mobile-container .exp-mobile-card');
    if (cards.length === 0) return;

    cards.forEach((card) => {
      const imgWrap = card.querySelector('.exp-mobile-img-wrap');
      const badge = card.querySelector('.exp-mobile-badge');
      const tag = card.querySelector('.exp-card-tag');
      const title = card.querySelector('.exp-mobile-title');
      const desc = card.querySelector('.exp-mobile-desc');
      const features = card.querySelectorAll('.exp-feature-pill');

      const cardTl = this.gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          toggleActions: 'play none none none'
        },
        defaults: { ease: 'power2.out' }
      });

      if (imgWrap) {
        cardTl.fromTo(
          imgWrap,
          { clipPath: 'inset(6% 0% 6% 0% round 14px)' },
          { clipPath: 'inset(0% 0% 0% 0% round 14px)', duration: 0.5 },
          0
        );
      }

      if (badge) {
        cardTl.fromTo(
          badge,
          { opacity: 0, y: -6 },
          { opacity: 1, y: 0, duration: 0.35 },
          0.05
        );
      }

      const headGroup = [tag, title].filter(Boolean);
      if (headGroup.length > 0) {
        cardTl.fromTo(
          headGroup,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, stagger: 0.05, duration: 0.4 },
          0.1
        );
      }

      if (desc) {
        cardTl.fromTo(
          desc,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4 },
          0.18
        );
      }

      if (features.length > 0) {
        cardTl.fromTo(
          features,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, stagger: 0.03, duration: 0.35 },
          0.22
        );
      }
    });
  }

  /* ==========================================================================
     M4. MOBILE: Visual Gallery Motion (max-width: 991px)
     Per-Item ScrollTrigger for smooth vertical streaming
     ========================================================================== */

  initMobileGalleryMotion() {
    const items = document.querySelectorAll('.gallery-grid .gallery-item');
    if (items.length === 0) return;

    items.forEach((item) => {
      this.gsap.fromTo(
        item,
        { opacity: 0, y: 18, scale: 0.98 },
        {
          scrollTrigger: {
            trigger: item,
            start: 'top 88%',
            toggleActions: 'play none none none'
          },
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          ease: 'power2.out'
        }
      );
    });
  }

  /* ==========================================================================
     M5. MOBILE: Reviews & Contact Motion (max-width: 991px)
     ========================================================================== */

  initMobileReviewsAndLocationMotion() {
    // Review cards: each animates independently on entry
    const reviewCards = document.querySelectorAll('.reviews-showcase article');
    reviewCards.forEach((card) => {
      this.gsap.fromTo(
        card,
        { opacity: 0, y: 16 },
        {
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none none'
          },
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: 'power2.out'
        }
      );
    });

    // Contact cards: location info card and map card
    const locationCards = document.querySelectorAll('.location-info-card, .location-map-wrap');
    locationCards.forEach((card) => {
      this.gsap.fromTo(
        card,
        { opacity: 0, y: 16 },
        {
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none none'
          },
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: 'power2.out'
        }
      );
    });
  }

  /* ==========================================================================
     M6. MOBILE: Section Headers Motion (max-width: 991px)
     ========================================================================== */

  initMobileSectionHeadersMotion() {
    const titles = document.querySelectorAll('.section-title.reveal-heading');
    titles.forEach((t) => {
      this.gsap.fromTo(
        t,
        { opacity: 0, y: 14 },
        {
          scrollTrigger: {
            trigger: t,
            start: 'top 92%',
            toggleActions: 'play none none none'
          },
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: 'power2.out'
        }
      );
    });

    const subtitles = document.querySelectorAll('.section-subtitle.reveal-text, .section-eyebrow.reveal-text');
    subtitles.forEach((s) => {
      this.gsap.fromTo(
        s,
        { opacity: 0, y: 10 },
        {
          scrollTrigger: {
            trigger: s,
            start: 'top 94%',
            toggleActions: 'play none none none'
          },
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out'
        }
      );
    });
  }

  /* ==========================================================================
     8. Tactile Micro-Interactions (GSAP quickTo Physics)
     ========================================================================== */

  initCustomCursor() {
    if (!this.customCursor || !this.customCursorDot) return;

    // Enable custom cursor mode: replaces default OS cursor on fine-pointer desktop
    document.body.classList.add('has-custom-cursor');

    // 1. Follower ring: smooth physics easing (chases the lead dot)
    this.gsap.set(this.customCursor, { xPercent: -50, yPercent: -50, x: -100, y: -100 });
    const circleXTo = this.gsap.quickTo(this.customCursor, 'x', { duration: 0.18, ease: 'power3.out' });
    const circleYTo = this.gsap.quickTo(this.customCursor, 'y', { duration: 0.18, ease: 'power3.out' });

    // 2. Lead dot: instantaneous 1:1 tracking (zero lag)
    this.gsap.set(this.customCursorDot, { xPercent: -50, yPercent: -50, x: -100, y: -100 });
    const dotXSet = this.gsap.quickSetter(this.customCursorDot, 'x', 'px');
    const dotYSet = this.gsap.quickSetter(this.customCursorDot, 'y', 'px');

    let isVisible = false;
    let isHoveringDot = false;

    window.addEventListener('mousemove', (e) => {
      if (!isVisible) {
        this.customCursor.style.opacity = '1';
        this.customCursorDot.style.opacity = '1';
        isVisible = true;
      }

      // Lead dot updates instantly directly at pointer coordinates
      dotXSet(e.clientX);
      dotYSet(e.clientY);

      // Circle chases smoothly behind the dot
      if (!isHoveringDot) {
        circleXTo(e.clientX);
        circleYTo(e.clientY);
      }
    });

    document.addEventListener('mouseleave', () => {
      this.customCursor.style.opacity = '0';
      this.customCursorDot.style.opacity = '0';
      isVisible = false;
    });

    document.addEventListener('mouseenter', () => {
      if (isVisible) {
        this.customCursor.style.opacity = '1';
        this.customCursorDot.style.opacity = '1';
      }
    });

    // Tactile click press feedback
    window.addEventListener('mousedown', () => {
      this.customCursor.classList.add('clicking');
      this.customCursorDot.classList.add('clicking');
    });

    window.addEventListener('mouseup', () => {
      this.customCursor.classList.remove('clicking');
      this.customCursorDot.classList.remove('clicking');
    });

    // Magnetic concentric snap for Experience navigation dots (ensures dot is dead-centered)
    const navDots = document.querySelectorAll('.exp-nav-dot');
    navDots.forEach((dot) => {
      dot.addEventListener('mouseenter', (e) => {
        isHoveringDot = true;
        this.customCursor.classList.add('hovering');
        this.customCursorDot.classList.add('hovering');
        const rect = dot.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        circleXTo(cx);
        circleYTo(cy);
      });
      dot.addEventListener('mousemove', (e) => {
        const rect = dot.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        // Subtle magnetic pull toward center of dot (80% pulled to center, 20% mouse motion)
        circleXTo(cx + (e.clientX - cx) * 0.2);
        circleYTo(cy + (e.clientY - cy) * 0.2);
      });
      dot.addEventListener('mouseleave', () => {
        isHoveringDot = false;
        this.customCursor.classList.remove('hovering');
        this.customCursorDot.classList.remove('hovering');
      });
    });

    // Hover effect on other interactive elements
    const otherInteractives = document.querySelectorAll(
      'a, button:not(.exp-nav-dot), input, textarea, select, [role="button"]:not(.exp-nav-dot), .menu-row-item, .gallery-item-deck'
    );
    otherInteractives.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        this.customCursor.classList.add('hovering');
        this.customCursorDot.classList.add('hovering');
      });
      el.addEventListener('mouseleave', () => {
        this.customCursor.classList.remove('hovering');
        this.customCursorDot.classList.remove('hovering');
      });
    });
  }

  initMagneticButtons() {
    if (this.magneticButtons.length === 0) return;

    this.magneticButtons.forEach((btn) => {
      const xTo = this.gsap.quickTo(btn, 'x', { duration: 0.35, ease: 'power2.out' });
      const yTo = this.gsap.quickTo(btn, 'y', { duration: 0.35, ease: 'power2.out' });

      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * 0.25;
        const deltaY = (e.clientY - centerY) * 0.25;

        xTo(deltaX);
        yTo(deltaY);
      });

      btn.addEventListener('mouseleave', () => {
        xTo(0);
        yTo(0);
      });
    });
  }
}
