// ===== Navigation Scroll Effect =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===== Mobile Menu Toggle =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside or on overlay
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Close menu on window resize if it's open
    window.addEventListener('resize', () => {
        if (window.innerWidth > 968) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ===== Intersection Observer for Scroll Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optionally stop observing after animation
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with animation classes
const animatedElements = document.querySelectorAll(
    '.fade-in, .fade-in-delay, .fade-in-delay-2, .fade-up, .fade-up-delay, .fade-up-delay-2, .fade-up-delay-3, .fade-up-delay-4, .fade-up-delay-5, .slide-in'
);

animatedElements.forEach(el => {
    observer.observe(el);
});

// ===== Parallax Effect for Hero Section =====
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = hero.querySelector('.hero-content');
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
        }
    });
}

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== EmailJS Configuration =====
// IMPORTANT: Replace these with your own EmailJS credentials
// Get them from https://www.emailjs.com/ after signing up
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'YOUR_PUBLIC_KEY',      // Your EmailJS Public Key
    SERVICE_ID: 'YOUR_SERVICE_ID',      // Your EmailJS Service ID
    TEMPLATE_ID: 'YOUR_TEMPLATE_ID'     // Your EmailJS Template ID
};

// ===== Contact Form Handling =====
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form elements
    const form = e.target;
    const submitBtn = document.getElementById('submit-btn');
    const formMessage = document.getElementById('form-message');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    // Clear previous messages
    clearErrors();
    formMessage.className = 'form-message';
    formMessage.textContent = '';
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim() || 'Not provided',
        business: document.getElementById('business').value.trim() || 'Not provided',
        industry: document.getElementById('industry').value || 'Not specified',
        service: document.getElementById('service').value || 'Not specified',
        message: document.getElementById('message').value.trim()
    };
    
    // Validate form
    if (!validateForm(formData)) {
        return;
    }
    
    // Check if EmailJS is configured
    if (EMAILJS_CONFIG.PUBLIC_KEY === 'YOUR_PUBLIC_KEY' || 
        EMAILJS_CONFIG.SERVICE_ID === 'YOUR_SERVICE_ID' || 
        EMAILJS_CONFIG.TEMPLATE_ID === 'YOUR_TEMPLATE_ID') {
        formMessage.className = 'form-message error';
        formMessage.textContent = 'Email service is not configured. Please contact the website administrator.';
        return;
    }
    
    // Show loading state
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';
    
    // Prepare email template parameters
    const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        business: formData.business,
        industry: formData.industry,
        service: formData.service,
        message: formData.message,
        to_name: 'Bloom On Consulting Team'
    };
    
    // Send email using EmailJS
    emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams
    )
    .then(() => {
        // Success
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        
        formMessage.className = 'form-message success';
        formMessage.textContent = 'Thank you! Your message has been sent successfully. We will get back to you within 24-48 hours.';
        
        // Reset form
        form.reset();
        
        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.opacity = '0';
            setTimeout(() => {
                formMessage.className = 'form-message';
                formMessage.textContent = '';
                formMessage.style.opacity = '1';
            }, 300);
        }, 5000);
    })
    .catch((error) => {
        // Error handling
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        
        formMessage.className = 'form-message error';
        formMessage.textContent = 'Sorry, there was an error sending your message. Please try again later or contact us directly at info@bloomonconsulting.com';
        
        console.error('EmailJS Error:', error);
        
        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
}

function validateForm(data) {
    let isValid = true;
    
    // Validate name
    if (!data.name || data.name.length < 2) {
        showError('name', 'Please enter your full name (at least 2 characters)');
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate phone (optional but if provided, should be valid)
    if (data.phone) {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(data.phone) || data.phone.length < 10) {
            showError('phone', 'Please enter a valid phone number');
            isValid = false;
        }
    }
    
    // Validate message
    if (!data.message || data.message.length < 10) {
        showError('message', 'Please enter a detailed message (at least 10 characters)');
        isValid = false;
    }
    
    return isValid;
}

function showError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(`${fieldName}-error`);
    
    if (field && errorElement) {
        field.style.borderColor = '#ef4444';
        errorElement.textContent = message;
    }
}

function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form select');
    
    errorMessages.forEach(el => {
        el.textContent = '';
    });
    
    formInputs.forEach(input => {
        input.style.borderColor = '';
    });
}

// ===== FAQ Accordion =====
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    }
});

// ===== Number Counter Animation (for stats) =====
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// ===== Active Navigation Link Highlighting =====
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Initialize active nav link
setActiveNavLink();

// ===== Scroll to Top Button (Optional Enhancement) =====
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'scroll-to-top';
    button.setAttribute('aria-label', 'Scroll to top');
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: var(--shadow-lg);
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-5px)';
        button.style.background = 'var(--primary-dark)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
        button.style.background = 'var(--primary-color)';
    });
}

// Initialize scroll to top button
createScrollToTopButton();

// ===== Form Input Real-time Validation =====
const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        validateField(input);
    });
    
    input.addEventListener('input', () => {
        // Clear error on input
        const errorElement = document.getElementById(`${input.id}-error`);
        if (errorElement) {
            errorElement.textContent = '';
            input.style.borderColor = '';
        }
    });
});

function validateField(field) {
    const fieldName = field.id;
    const value = field.value.trim();
    const errorElement = document.getElementById(`${fieldName}-error`);
    
    if (!errorElement) return;
    
    switch (fieldName) {
        case 'name':
            if (!value || value.length < 2) {
                showError('name', 'Please enter your full name (at least 2 characters)');
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value || !emailRegex.test(value)) {
                showError('email', 'Please enter a valid email address');
            }
            break;
        case 'phone':
            if (value) {
                const phoneRegex = /^[\d\s\-\+\(\)]+$/;
                if (!phoneRegex.test(value) || value.length < 10) {
                    showError('phone', 'Please enter a valid phone number');
                }
            }
            break;
        case 'message':
            if (!value || value.length < 10) {
                showError('message', 'Please enter a detailed message (at least 10 characters)');
            }
            break;
    }
}

// ===== Video Background Error Handling =====
const heroVideo = document.querySelector('.hero-video');
if (heroVideo) {
    // Show fallback gradient if video fails to load
    heroVideo.addEventListener('error', () => {
        const videoWrapper = heroVideo.closest('.hero-video-wrapper');
        if (videoWrapper) {
            videoWrapper.classList.add('video-error');
        }
    });
    
    // Try to play video, show fallback if it fails
    heroVideo.addEventListener('loadstart', () => {
        heroVideo.play().catch(() => {
            const videoWrapper = heroVideo.closest('.hero-video-wrapper');
            if (videoWrapper) {
                videoWrapper.classList.add('video-error');
            }
        });
    });
}

// ===== Initialize on page load =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize EmailJS if available (only on contact page)
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    }
    
    // Trigger initial animations for elements already in viewport
    animatedElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            el.classList.add('visible');
        }
    });
    
    // Add smooth reveal to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.style.opacity = '1';
        }, 100);
    }
    
    // Check if video exists and loaded properly
    if (heroVideo) {
        const checkVideo = () => {
            if (heroVideo.readyState === 0) {
                // Video hasn't loaded, check if source exists
                const videoWrapper = heroVideo.closest('.hero-video-wrapper');
                if (videoWrapper && !heroVideo.src) {
                    videoWrapper.classList.add('video-error');
                }
            }
        };
        
        // Check after a short delay
        setTimeout(checkVideo, 1000);
    }
});

// ===== Performance Optimization: Debounce scroll events =====
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

// Apply debounce to scroll-heavy functions
const debouncedScroll = debounce(() => {
    // Additional scroll-based animations can go here
}, 10);

window.addEventListener('scroll', debouncedScroll);

document.addEventListener('DOMContentLoaded', () => {
  const CONSULT_LABEL = 'Book your free consultation call';
  document.querySelectorAll('.consult-btn').forEach((btn) => {
    btn.textContent = CONSULT_LABEL;
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // existing consult button code...

  // make value pills clickable to toggle definition (for touch devices)
  document.querySelectorAll('.value-pill').forEach((pill) => {
    pill.addEventListener('click', () => {
      pill.classList.toggle('is-open');
    });
  });
});

