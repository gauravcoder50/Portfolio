// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }

    // Smooth scrolling for navigation links
    const navLinksElements = document.querySelectorAll('a[href^="#"]');
    navLinksElements.forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navLinks) {
                    navLinks.classList.remove('active');
                }
                if (mobileToggle) {
                    const icon = mobileToggle.querySelector('i');
                    if (icon) {
                        icon.classList.add('fa-bars');
                        icon.classList.remove('fa-times');
                    }
                }
            }
        });
    });

    // Navbar scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (navbar) {
            if (scrollTop > 100) {
                navbar.style.background = 'rgba(255,255,255,0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
            } else {
                navbar.style.background = 'rgba(255,255,255,0.95)';
                navbar.style.boxShadow = 'none';
            }
        }
        lastScrollTop = scrollTop;
    });

    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinksForHighlight = document.querySelectorAll('.nav-links a[href^="#"]');

    function highlightNavigation() {
        let currentSection = '';
        const scrollPosition = window.scrollY + 100;

        sections.forEach(function (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinksForHighlight.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }

    // Throttle scroll events for performance
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(highlightNavigation);
            ticking = true;
            setTimeout(function () {
                ticking = false;
            }, 100);
        }
    }

    window.addEventListener('scroll', requestTick);

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(function (el) {
        observer.observe(el);
    });

    // Skill tag interactions
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(function (tag) {
        tag.addEventListener('click', function () {
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });

    // Contact item hover effects
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(function (item) {
        item.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        item.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(-5px)';
        });
    });

    // Project card enhanced hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(function (card) {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-15px)';
            this.style.boxShadow = '0 25px 50px rgba(0,0,0,0.2)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
        });
    });

    // Stat items animation on hover
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(function (item) {
        item.addEventListener('mouseenter', function () {
            const number = this.querySelector('.stat-number');
            if (number) {
                number.style.transform = 'scale(1.2)';
                number.style.transition = 'transform 0.3s ease';
            }
        });

        item.addEventListener('mouseleave', function () {
            const number = this.querySelector('.stat-number');
            if (number) {
                number.style.transform = 'scale(1)';
            }
        });
    });

    // Parallax effect for hero section (subtle)
    let heroElement = document.querySelector('.hero');
    if (heroElement) {
        window.addEventListener('scroll', function () {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;

            if (scrolled < window.innerHeight) {
                heroElement.style.transform = `translateY(${rate}px)`;
            }
        });
    }

    // Social links animation
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(function (link, index) {
        link.style.animationDelay = `${index * 0.1}s`;

        link.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px) rotate(10deg)';
        });

        link.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(-3px) rotate(0deg)';
        });
    });

    // Timeline items stagger animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(function (item, index) {
        item.style.transitionDelay = `${index * 0.2}s`;
    });

    // Button ripple effect
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(function (button) {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255,255,255,0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(function () {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple animation CSS
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
    document.head.appendChild(rippleStyle);

    // Loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    window.addEventListener('load', function () {
        setTimeout(function () {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Error handling for missing elements
    console.log('Portfolio loaded successfully');

}); // End of DOMContentLoaded

// Backup for older browsers that don't support DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
        console.log('DOM loaded via DOMContentLoaded');
    });
} else {
    console.log('DOM already loaded');
}

// Handle window resize
window.addEventListener('resize', function () {
    const navLinks = document.querySelector('.nav-links');
    if (window.innerWidth > 768 && navLinks) {
        navLinks.classList.remove('active');
    }
});

// Prevent default behavior on placeholder links
document.addEventListener('click', function (e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href') === '#') {
        e.preventDefault();
    }
});