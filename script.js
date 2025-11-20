// Portfolio Interactive Features for Don Anthony - AI & Automation Specialist
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinksContainer) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinksContainer.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Scroll animations using Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Special handling for counters
                const counters = entry.target.querySelectorAll('[data-count]');
                counters.forEach(counter => {
                    animateCounter(counter);
                });
                
                // Special handling for timeline items
                if (entry.target.classList.contains('timeline-item')) {
                    animateTimelineItem(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Add fade-in-up class to elements and observe them
    const animatedElements = document.querySelectorAll('.project-card, .role-card, .skill-category, .why-card, .timeline-item');
    
    animatedElements.forEach(element => {
        element.classList.add('fade-in-up');
        observer.observe(element);
    });
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Show success message
            showFormSuccess();
            
            // Reset form
            this.reset();
        });
        
        // Add real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }
    
    // Form success message
    function showFormSuccess() {
        const successMessage = document.createElement('div');
        successMessage.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: #171717;
                color: #E5E5E5;
                padding: 3rem 2rem;
                border-radius: 16px;
                text-align: center;
                z-index: 1000;
                box-shadow: 0 20px 60px rgba(37, 99, 235, 0.3);
                border: 1px solid #2563EB;
                animation: fadeInScale 400ms ease-out;
                max-width: 400px;
            ">
                <div style="width: 4rem; height: 4rem; margin: 0 auto 1.5rem; color: #22C55E;">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                </div>
                <h3 style="margin-bottom: 1rem; font-family: 'Poppins', sans-serif;">Message Sent!</h3>
                <p style="margin: 0; color: #A3A3A3;">Thanks for reaching out! I'll get back to you within 24 hours.</p>
            </div>
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                z-index: 999;
            " onclick="this.parentElement.remove()"></div>
        `;
        
        document.body.appendChild(successMessage);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (successMessage.parentElement) {
                successMessage.remove();
            }
        }, 5000);
    }
    
    // Field validation
    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        const fieldGroup = field.closest('.form-group');
        
        // Clear previous errors
        clearFieldError(field);
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            showFieldError(field, 'This field is required');
            return false;
        }
        
        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(field, 'Please enter a valid email address');
                return false;
            }
        }
        
        return true;
    }
    
    function showFieldError(field, message) {
        const fieldGroup = field.closest('.form-group');
        
        // Remove existing error
        clearFieldError(field);
        
        // Add error styling
        field.style.borderColor = '#EF4444';
        field.style.boxShadow = '0 0 24px 0 rgba(239, 68, 68, 0.2)';
        
        // Add error message
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.style.cssText = `
            color: #EF4444;
            font-size: 0.75rem;
            margin-top: 0.25rem;
            font-family: 'Inter', sans-serif;
        `;
        errorElement.textContent = message;
        
        fieldGroup.appendChild(errorElement);
    }
    
    function clearFieldError(field) {
        const fieldGroup = field.closest('.form-group');
        const errorElement = fieldGroup.querySelector('.field-error');
        
        if (errorElement) {
            errorElement.remove();
        }
        
        field.style.borderColor = '';
        field.style.boxShadow = '';
    }
    
    // Counter animation
    function animateCounter(element) {
        const target = parseInt(element.dataset.count || element.textContent);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (element.textContent.includes('%')) {
                element.textContent = Math.floor(current) + '%';
            } else if (element.textContent.includes('x')) {
                element.textContent = current.toFixed(1) + 'x';
            } else if (element.textContent.includes('min')) {
                element.textContent = Math.floor(current) + ' min';
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    // Timeline animation
    function animateTimelineItem(element) {
        const children = element.children;
        let delay = 0;
        
        Array.from(children).forEach(child => {
            setTimeout(() => {
                child.style.opacity = '0';
                child.style.transform = 'translateX(-20px)';
                child.style.transition = 'all 600ms ease-out';
                
                setTimeout(() => {
                    child.style.opacity = '1';
                    child.style.transform = 'translateX(0)';
                }, 100);
            }, delay);
            
            delay += 200;
        });
    }
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero && scrolled < hero.offsetHeight) {
            const rate = scrolled * -0.3;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Navigation background on scroll
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('.nav');
        if (window.scrollY > 100) {
            nav.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
            nav.style.backdropFilter = 'blur(20px)';
        } else {
            nav.style.backgroundColor = 'rgba(10, 10, 10, 0.9)';
        }
    });
    
    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const image = card.querySelector('.project-image');
        
        if (image) {
            image.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.02)';
            });
            
            image.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        }
    });
    
    // Skill items stagger animation
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 400ms ease-out';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 50);
    });
    
    // Why card entrance animation
    const whyCards = document.querySelectorAll('.why-card');
    
    whyCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 600ms ease-out';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Add CSS animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInScale {
            from {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.9);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
        }
        
        .nav-links.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background-color: rgba(10, 10, 10, 0.95);
            backdrop-filter: blur(20px);
            padding: 2rem;
            gap: 1rem;
        }
        
        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        @media (min-width: 769px) {
            .nav-links.active {
                display: flex;
                flex-direction: row;
                position: static;
                background-color: transparent;
                padding: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close mobile menu if open
            if (navLinksContainer && navLinksContainer.classList.contains('active')) {
                navLinksContainer.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
            
            // Close any open modals
            const modals = document.querySelectorAll('[style*="position: fixed"]');
            modals.forEach(modal => modal.remove());
        }
    });
    
    // Loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Trigger entrance animations
        const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-stats, .hero-ctas');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });
    });
    
    // Performance optimization: Debounce scroll events
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
    
    // Apply debouncing to scroll events
    const debouncedScroll = debounce(() => {
        // Any heavy scroll calculations can go here
    }, 16);
    
    window.addEventListener('scroll', debouncedScroll);
    
    // Add intersection observer for fade-in animations
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observe all elements with fade-in-up class
    document.querySelectorAll('.fade-in-up').forEach(el => {
        fadeInObserver.observe(el);
    });
    
    // Custom cursor for enhanced interactivity (desktop only)
    if (window.innerWidth > 768) {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: rgba(37, 99, 235, 0.8);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.3s ease;
            display: none;
        `;
        document.body.appendChild(cursor);
        
        cursor.style.display = 'block';
        
        document.addEventListener('mousemove', function(e) {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
        });
        
        // Scale cursor on hover
        const hoverElements = document.querySelectorAll('a, button, .project-card, .role-card');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
            });
        });
    }
    
    // Scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #2563EB, #1D4ED8);
        z-index: 1000;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
    
    // Neural network background animation enhancement
    const neuralNodes = document.querySelectorAll('.neural-node');
    
    neuralNodes.forEach((node, index) => {
        node.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.5)';
            this.style.boxShadow = '0 0 20px rgba(37, 99, 235, 0.8)';
        });
        
        node.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Stats counter animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    animateStat(stat);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }
    
    function animateStat(element) {
        const text = element.textContent;
        const isPercentage = text.includes('%');
        const isMultiplier = text.includes('x');
        
        let target = parseInt(text);
        if (isMultiplier) {
            target = parseFloat(text);
        }
        
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (isPercentage) {
                element.textContent = Math.floor(current) + '%';
            } else if (isMultiplier) {
                element.textContent = current.toFixed(1) + 'x';
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    console.log('🚀 Don Anthony AI Portfolio loaded successfully!');
    console.log('Transforming complex AI systems into business solutions...');
});