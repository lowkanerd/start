/**
 * LOW KANE - Premium Artist Landing Page
 * Interactive Experience Script
 * Redesigned 2026
 *
 * Features:
 * - Custom cursor with magnetic hover effects
 * - Smooth scroll-triggered animations
 * - Navbar state management with dynamic color based on hero image brightness
 * - Mobile menu functionality
 * - Auto slider for hero images (5s interval)
 * - Collage hover interactions
 * - Image lazy loading with fade-in
 */

(function() {
    'use strict';

    // ============================================
    // DOM Elements
    // ============================================
    const cursor = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursor-follower');
    const navbar = document.getElementById('navbar');
    const logo = document.querySelector('.logo');
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const navLinks = document.querySelectorAll('.nav-link');
    const pageTransition = document.getElementById('pageTransition');
    const collageItems = document.querySelectorAll('.collage-item');

    // Hero Slider elements
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroSubtitle = document.querySelector('.hero-subtitle');

    // ============================================
    // Custom Cursor
    // ============================================
    const cursorState = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        followerX: window.innerWidth / 2,
        followerY: window.innerHeight / 2
    };

    function initCursor() {
        // Only initialize on non-touch devices
        if (window.matchMedia('(hover: none)').matches) {
            return;
        }

        document.addEventListener('mousemove', handleMouseMove);

        // Add hover effects to interactive elements
        const interactiveElements = document.querySelectorAll(
            'a, button, .collage-item, .video-card, .nav-link, .mobile-link, .shop-item'
        );

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
                cursorFollower.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
                cursorFollower.classList.remove('hover');
            });
        });

        // Start animation loop
        requestAnimationFrame(updateCursor);
    }

    function handleMouseMove(e) {
        cursorState.x = e.clientX;
        cursorState.y = e.clientY;
    }

    function updateCursor() {
        // Smooth follower with lerp (optimized)
        cursorState.followerX += (cursorState.x - cursorState.followerX) * 0.2;
        cursorState.followerY += (cursorState.y - cursorState.followerY) * 0.2;

        cursor.style.transform = `translate(${cursorState.x - 5}px, ${cursorState.y - 5}px)`;
        cursorFollower.style.transform = `translate(${cursorState.followerX - 17.5}px, ${cursorState.followerY - 17.5}px)`;

        requestAnimationFrame(updateCursor);
    }

    // ============================================
    // Navbar Scroll Effect
    // ============================================
    function initNavbar() {
        let lastScroll = 0;
        const scrollThreshold = 50;

        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;

            // Add scrolled class when past hero section
            if (currentScroll > scrollThreshold) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        }, { passive: true });
    }

    // ============================================
    // Mobile Menu
    // ============================================
    function initMobileMenu() {
        menuToggle.addEventListener('click', toggleMobileMenu);

        // Close menu when clicking a link
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMobileMenu();
            });
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeMobileMenu();
            }
        });
    }

    function toggleMobileMenu() {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    function closeMobileMenu() {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    // ============================================
    // Scroll Animations (Intersection Observer)
    // ============================================
    function initScrollAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -10% 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Unobserve after animation triggers (one-time)
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe section titles
        document.querySelectorAll('.section-title').forEach(el => {
            observer.observe(el);
        });

        // Observe other fade-in elements
        document.querySelectorAll('.fade-in, .bio-content, .design-item').forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    }

    // ============================================
    // Collage Stagger Animation on Scroll
    // ============================================
    function initCollageAnimations() {
        const collageSection = document.querySelector('.collage-section');
        if (!collageSection) return;

        const collageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add stagger animation to collage items
                    collageItems.forEach((item, index) => {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px) scale(0.95)';

                        setTimeout(() => {
                            item.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0) scale(1)';
                        }, index * 100);
                    });

                    collageObserver.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '0px',
            threshold: 0.2
        });

        collageObserver.observe(collageSection);
    }

    // ============================================
    // Image Lazy Loading
    // ============================================
    function initImageLoading() {
        const images = document.querySelectorAll('img');

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.addEventListener('load', () => {
                        img.classList.add('loaded');
                    });
                    // Trigger load if not already loaded
                    if (img.complete) {
                        img.classList.add('loaded');
                    }
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px'
        });

        images.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ============================================
    // Smooth Scroll for Anchor Links
    // ============================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');

                // Skip if it's just "#"
                if (href === '#') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const navHeight = navbar.offsetHeight;
                    const targetPosition = target.offsetTop - navHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    if (mobileMenu.classList.contains('active')) {
                        closeMobileMenu();
                    }
                }
            });
        });
    }

    // ============================================
    // Parallax Effect for Hero
    // ============================================
    function initParallax() {
        const heroImage = document.querySelector('.hero-image');
        if (!heroImage) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const heroHeight = document.querySelector('.hero')?.offsetHeight || 0;

            if (scrolled < heroHeight) {
                // Subtle parallax effect on hero image
                heroImage.style.transform = `translateY(${scrolled * 0.2}px) scale(1.02)`;
            }
        }, { passive: true });
    }

    // ============================================
    // Magnetic Effect for Social Links
    // ============================================
    function initMagneticEffects() {
        const socialLinks = document.querySelectorAll('.social-link');

        socialLinks.forEach(link => {
            link.addEventListener('mousemove', (e) => {
                const rect = link.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                link.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) translateY(-4px)`;
            });

            link.addEventListener('mouseleave', () => {
                link.style.transform = 'translate(0, 0)';
            });
        });
    }

    // ============================================
    // Page Transition (for future multi-page)
    // ============================================
    function triggerPageTransition(callback) {
        pageTransition.classList.add('active');

        setTimeout(() => {
            callback();
        }, 600);

        setTimeout(() => {
            pageTransition.classList.remove('active');
        }, 1200);
    }

    // ============================================
    // Keyboard Navigation Enhancement
    // ============================================
    function initKeyboardNav() {
        // Add skip link functionality for accessibility
        document.addEventListener('keydown', (e) => {
            // Press 'M' to toggle mobile menu (for testing)
            if (e.key === 'm' && e.metaKey) {
                toggleMobileMenu();
            }
        });
    }

    // ============================================
    // Performance: Debounce/Throttle utilities
    // ============================================
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // ============================================
    // Collage Item Individual Hover Enhancement
    // ============================================
    function initCollageHover() {
        collageItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                // Dim other items slightly
                collageItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.style.opacity = '0.5';
                    }
                });
            });

            item.addEventListener('mouseleave', function() {
                // Restore all items
                collageItems.forEach(otherItem => {
                    otherItem.style.opacity = '1';
                });
            });
        });
    }

    // ============================================
    // Hero Auto Slider (5s interval)
    // ============================================
    function initHeroSlider() {
        if (heroSlides.length <= 1) return;

        let currentSlide = 0;
        const slideInterval = 5000; // 5 seconds

        function nextSlide() {
            // Remove active class from current
            heroSlides[currentSlide].classList.remove('active');

            // Calculate next slide index
            currentSlide = (currentSlide + 1) % heroSlides.length;

            // Add active class to next
            heroSlides[currentSlide].classList.add('active');

            // Trigger navbar color update based on new image
            updateNavbarColor();
        }

        // Start auto-rotation
        setInterval(nextSlide, slideInterval);

        // Initial navbar color check is removed as we are using mix-blend-mode
    }

    // ============================================
    // Initialize All Modules
    // ============================================
    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        // Initialize all features
        initCursor();
        initNavbar();
        initMobileMenu();
        initScrollAnimations();
        initImageLoading();
        initSmoothScroll();
        initParallax();
        initCollageAnimations();
        initMagneticEffects();
        initKeyboardNav();
        initCollageHover();
        initHeroSlider(); // Auto slider cada 5s

        // Log initialization (remove in production)
        console.log('%c LOW KANE | Experience Loaded', 'color: #fff; background: #111; padding: 8px 16px; font-weight: bold;');
    }

    // Auto-initialize
    init();

})();
