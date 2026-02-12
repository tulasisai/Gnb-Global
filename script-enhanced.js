// Enhanced Functionality for Improved Website

// ==================== FAQ ACCORDION FUNCTIONALITY (GLOBAL) ====================
// Define toggleFAQ immediately so it's available for onclick handlers
window.toggleFAQ = function(button) {
    const faqItem = button.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    const isActive = answer.classList.contains('active');
    
    // Close all other FAQs in the same column
    const column = button.closest('.faq-column');
    if (column) {
        column.querySelectorAll('.faq-answer.active').forEach(activeAnswer => {
            activeAnswer.classList.remove('active');
            const activeButton = activeAnswer.previousElementSibling;
            if (activeButton) activeButton.classList.remove('active');
        });
    }
    
    // Toggle current FAQ (open if was closed)
    if (!isActive) {
        answer.classList.add('active');
        button.classList.add('active');
    }
};

// FAQ functionality is defined at the top of this file

// Contact form is already handled in script.js

function validateContactForm() {
    const form = document.getElementById('contactForm');
    const fullName = form.querySelector('input[name="fullName"]');
    const email = form.querySelector('input[name="email"]');
    const phone = form.querySelector('input[name="phone"]');
    const buildingType = form.querySelector('select[name="buildingType"]');
    
    let isValid = true;
    
    // Validate Full Name
    if (!fullName.value.trim() || fullName.value.trim().length < 3) {
        showFieldError('fullNameError', 'Please enter a valid name (minimum 3 characters)');
        isValid = false;
    } else {
        clearFieldError('fullNameError');
    }
    
    // Validate Email
    if (!isValidEmail(email.value)) {
        showFieldError('emailError', 'Please enter a valid email address');
        isValid = false;
    } else {
        clearFieldError('emailError');
    }
    
    // Validate Phone
    if (!isValidPhone(phone.value)) {
        showFieldError('phoneError', 'Please enter a valid phone number');
        isValid = false;
    } else {
        clearFieldError('phoneError');
    }
    
    // Validate Building Type
    if (!buildingType.value) {
        showFieldError('buildingTypeError', 'Please select a building type');
        isValid = false;
    } else {
        clearFieldError('buildingTypeError');
    }
    
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\d\-\(\)\s\+]+$|^$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

function showFieldError(fieldId, message) {
    const errorElement = document.getElementById(fieldId);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearFieldError(fieldId) {
    const errorElement = document.getElementById(fieldId);
    if (errorElement) {
        errorElement.textContent = '';
    }
}

function showFormMessage(message, type) {
    const messageElement = document.getElementById('formMessage');
    if (messageElement) {
        messageElement.innerHTML = message.replace(/\n/g, '<br>');
        messageElement.className = `form-message ${type}`;
        messageElement.style.display = 'block';
    }
}

// ==================== NEWSLETTER FORM HANDLING ====================
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = newsletterForm.querySelector('input[name="email"]');
        const submitBtn = newsletterForm.querySelector('button[type="submit"]');
        const messageElement = document.getElementById('newsletterMessage');
        
        // Validate email
        if (!isValidEmail(email.value)) {
            messageElement.innerHTML = '⚠ Please enter a valid email address';
            messageElement.className = 'form-message error';
            messageElement.style.display = 'block';
            return;
        }
        
        // Show loading state
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="loading"></span>';
        
        // Simulate subscription (replace with actual API call)
        setTimeout(() => {
            messageElement.innerHTML = '✓ Successfully subscribed! Check your email for confirmation.';
            messageElement.className = 'form-message success';
            messageElement.style.display = 'block';
            email.value = '';
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }, 1000);
    });
}

// ==================== SMOOTH SCROLL ENHANCEMENT ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Mobile menu already handled in script.js

// ==================== GALLERY IMAGE SWITCHING ====================
window.switchEagleImage = function(imagePath, element, event) {
    if (event) {
        event.stopPropagation();
    }
    const mainImage = document.getElementById('eagleMainImage');
    if (mainImage) {
        mainImage.src = imagePath;
    }
    
    // Update active thumbnail
    document.querySelectorAll('.gallery-thumb').forEach(thumb => {
        thumb.classList.remove('active');
    });
    element.classList.add('active');
};

// ==================== SUPER SIMPLE GALLERY AUTO-SCROLL ====================
let frontGalleryAutoScrollInterval = null;
let currentImageIndex = 0;

// Start auto-scroll IMMEDIATELY
function startAutoScroll() {
    console.log('🔵 startAutoScroll called');
    
    const mainImg = document.getElementById('eagleMainImage');
    const counter = document.getElementById('imageCounter');
    
    console.log('Main image:', mainImg ? '✓ FOUND' : '✗ NOT FOUND');
    console.log('Counter:', counter ? '✓ FOUND' : '✗ NOT FOUND');
    
    // Find ALL images in the gallery first
    const gallery = document.querySelector('.eagle-mountain-gallery');
    console.log('Gallery container:', gallery ? '✓ FOUND' : '✗ NOT FOUND');
    
    const thumbs = gallery ? Array.from(gallery.querySelectorAll('.gallery-thumb')) : [];
    console.log('📸 Found', thumbs.length, 'thumbnail images');
    
    if (thumbs.length > 0) {
        thumbs.forEach((thumb, i) => {
            console.log(`  [${i}] src="${thumb.src}"`);
        });
    }
    
    if (thumbs.length === 0) {
        console.error('❌ NO THUMBNAILS FOUND! Aborting.');
        return;
    }
    
    // Function to change to next image
    const changeImage = () => {
        currentImageIndex = (currentImageIndex + 1) % thumbs.length;
        const thumb = thumbs[currentImageIndex];
        const src = thumb.src;
        
        console.log(`⭐ Change image to ${currentImageIndex + 1}/${thumbs.length}: ${src}`);
        
        // Update main image
        mainImg.src = src;
        
        // Update counter - with verification
        if (counter) {
            counter.textContent = `Image ${currentImageIndex + 1} of ${thumbs.length}`;
            console.log(`   Counter updated to: ${counter.textContent}`);
        }
        
        // Update active thumbnail
        thumbs.forEach((t, i) => {
            if (i === currentImageIndex) {
                t.classList.add('active');
            } else {
                t.classList.remove('active');
            }
        });
    };
    
    // First change after 1 second
    setTimeout(() => {
        console.log('⏱ 1 second passed, changing image now...');
        changeImage();
    }, 1000);
    
    // Then change every 4 seconds
    frontGalleryAutoScrollInterval = setInterval(() => {
        changeImage();
    }, 4000);
    
    console.log('✅ AUTO-SCROLL INITIALIZED - Changes every 4 seconds');
}

// Wait for DOM to be fully ready
function initGalleryWhenReady() {
    console.log('🚀 initGalleryWhenReady called, readyState:', document.readyState);
    
    if (document.readyState === 'loading') {
        console.log('DOM still loading, waiting for DOMContentLoaded');
        document.addEventListener('DOMContentLoaded', () => {
            console.log('DOMContentLoaded fired, starting gallery in 500ms');
            setTimeout(startAutoScroll, 500);
        });
    } else {
        console.log('DOM already ready, starting gallery in 500ms');
        setTimeout(startAutoScroll, 500);
    }
}

// Initialize immediately
initGalleryWhenReady();

// ==================== MODAL GALLERY FUNCTIONS ====================
// Auto-scroll functionality for modal gallery (10 images)
let modalGalleryAutoScrollInterval = null;
let modalGalleryIndex = 0;

// Define globally so onclick handlers can access
function openGalleryModal() {
    const modal = document.getElementById('galleryModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        console.log('Gallery modal opened');
        // Start auto-scroll when modal opens
        startModalGalleryAutoScroll();
    }
}

function closeGalleryModal() {
    const modal = document.getElementById('galleryModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        console.log('Gallery modal closed');
        stopModalGalleryAutoScroll();
    }
}

function switchModalImage(imagePath, element, event) {
    if (event) {
        event.stopPropagation();
    }
    const mainImage = document.getElementById('modalGalleryImage');
    if (mainImage) {
        mainImage.src = imagePath;
        console.log('Switched to:', imagePath);
    }
    
    // Update active thumbnail
    document.querySelectorAll('.modal-gallery-thumb').forEach(thumb => {
        thumb.classList.remove('active');
    });
    element.classList.add('active');
}

// Also make available on window for HTML onclick handlers
window.openGalleryModal = openGalleryModal;
window.closeGalleryModal = closeGalleryModal;
window.switchModalImage = switchModalImage;

function startModalGalleryAutoScroll() {
    const modalThumbs = document.querySelectorAll('.modal-gallery-thumb');
    console.log('Modal auto-scroll starting - thumbnails found:', modalThumbs.length);
    
    if (modalThumbs.length === 0) return;
    
    function nextModalImage() {
        modalGalleryIndex = (modalGalleryIndex + 1) % modalThumbs.length;
        const nextThumb = modalThumbs[modalGalleryIndex];
        const imagePath = nextThumb.src;
        
        console.log(`Modal auto-scroll to image ${modalGalleryIndex}:`, imagePath);
        
        // Update main image
        const mainImage = document.getElementById('modalGalleryImage');
        if (mainImage) {
            mainImage.src = imagePath;
        }
        
        // Update active thumbnail
        modalThumbs.forEach(thumb => thumb.classList.remove('active'));
        nextThumb.classList.add('active');
    }
    
    // Auto-scroll every 4 seconds
    modalGalleryAutoScrollInterval = setInterval(nextModalImage, 4000);
    
    // Pause on hover
    const modalThumbs_hover = document.querySelector('.modal-gallery-thumbnails');
    if (modalThumbs_hover) {
        modalThumbs_hover.addEventListener('mouseenter', () => {
            if (modalGalleryAutoScrollInterval) clearInterval(modalGalleryAutoScrollInterval);
        });
        modalThumbs_hover.addEventListener('mouseleave', () => {
            modalGalleryAutoScrollInterval = setInterval(nextModalImage, 4000);
        });
    }
}

function stopModalGalleryAutoScroll() {
    if (modalGalleryAutoScrollInterval) {
        clearInterval(modalGalleryAutoScrollInterval);
        modalGalleryAutoScrollInterval = null;
    }
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('galleryModal');
        if (modal && modal.classList.contains('active')) {
            closeGalleryModal();
        }
    }
});

// ==================== SCROLL ANIMATIONS ====================
// Scroll animations disabled
/* const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.benefit-card, .product-card, .testimonial-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
}); */

// ==================== ACTIVE NAVIGATION HIGHLIGHT ====================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 100) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === currentSection) {
            link.classList.add('active');
        }
    });
});

// ==================== FORM REAL-TIME VALIDATION ====================
const contactFormInputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');

contactFormInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.name === 'fullName') {
            if (input.value.trim().length < 3) {
                showFieldError('fullNameError', '⚠ Minimum 3 characters');
            } else {
                clearFieldError('fullNameError');
            }
        }
        
        if (input.name === 'email') {
            if (!isValidEmail(input.value)) {
                showFieldError('emailError', '⚠ Invalid email');
            } else {
                clearFieldError('emailError');
            }
        }
        
        if (input.name === 'phone') {
            if (!isValidPhone(input.value)) {
                showFieldError('phoneError', '⚠ Invalid phone');
            } else {
                clearFieldError('phoneError');
            }
        }
        
        if (input.name === 'buildingType' && !input.value) {
            showFieldError('buildingTypeError', '⚠ Please select');
        }
    });
    
    input.addEventListener('focus', () => {
        const errorId = `${input.name}Error`;
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.textContent = '';
        }
    });
});

// ==================== COMPARISON TABLE MOBILE SCROLL HINT ====================
const comparisonTable = document.querySelector('.comparison-table');
if (comparisonTable && window.innerWidth <= 768) {
    const wrapper = comparisonTable.parentElement;
    wrapper.style.position = 'relative';
    
    const scrollHint = document.createElement('div');
    scrollHint.style.cssText = 'position: absolute; right: 0; top: 50%; transform: translateY(-50%); background: var(--secondary-color); color: white; padding: 8px 12px; border-radius: 4px; font-size: 0.8rem; opacity: 0.8; animation: pulse 2s infinite;';
    scrollHint.textContent = '← Scroll →';
    wrapper.appendChild(scrollHint);
    
    setTimeout(() => scrollHint.remove(), 5000);
}

// ==================== KEYBOARD NAVIGATION ====================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        if (navMenu) {
            navMenu.classList.remove('active');
        }
        // Close active FAQs
        document.querySelectorAll('.faq-answer.active').forEach(answer => {
            answer.classList.remove('active');
            answer.previousElementSibling.classList.remove('active');
        });
    }
});

// ==================== PERFORMANCE OPTIMIZATION - Lazy Load Images ====================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==================== PRODUCT DETAILS MODAL ====================
function openProductModal(productKey) {
    console.log('openProductModal called with:', productKey);
    
    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('modalBody');
    
    if (!modal) {
        console.error('Modal element not found');
        return;
    }
    
    if (!modalBody) {
        console.error('Modal body element not found');
        return;
    }
    
    const productDetailsScript = document.getElementById('productDetails');
    
    if (!productDetailsScript) {
        console.error('Product details script not found');
        return;
    }
    
    let productDetails;
    try {
        productDetails = JSON.parse(productDetailsScript.textContent);
    } catch(e) {
        console.error('Failed to parse product details:', e);
        return;
    }
    
    const product = productDetails[productKey];
    
    if (!product) {
        console.error('Product not found:', productKey, 'Available products:', Object.keys(productDetails));
        return;
    }
    
    console.log('Product found:', product);
    
    // Build modal content
    let specsHtml = '';
    if (product.specifications) {
        const specs = product.specifications;
        let widthsHtml = specs.widths ? `<ul>${specs.widths.map(w => `<li>${w}</li>`).join('')}</ul>` : '';
        let heightsHtml = specs.legHeights ? `<ul>${specs.legHeights.map(h => `<li>${h}</li>`).join('')}</ul>` : '';
        
        specsHtml = `
            <div class="modal-specs-grid">
                <div class="modal-spec-section">
                    <h3>Available Widths</h3>
                    ${widthsHtml}
                </div>
                <div class="modal-spec-section">
                    <h3>Leg Heights</h3>
                    ${heightsHtml}
                </div>
                <div class="modal-spec-section">
                    <h3>Construction Details</h3>
                    <ul>
                        <li><strong>Truss Type:</strong> ${specs.trussType || 'N/A'}</li>
                        <li><strong>Material:</strong> ${specs.material || 'N/A'}</li>
                        <li><strong>Fabric Cover:</strong> ${specs.fabricCover || 'N/A'}</li>
                    </ul>
                </div>
                <div class="modal-spec-section">
                    <h3>Ideal Applications</h3>
                    <ul>
                        <li>${specs.bestFor || 'Custom applications'}</li>
                    </ul>
                </div>
            </div>
        `;
    }
    
    const modalContent = `
        <h2>${product.title}</h2>
        <p class="modal-tagline">${product.tagline}</p>
        <div class="modal-overview">${product.overview}</div>
        <p class="modal-description">${product.description}</p>
        ${specsHtml}
        <div class="modal-contact-cta">
            <h4>Ready to Build Your Project?</h4>
            <p>Contact our team for a custom quote and detailed specifications tailored to your needs.</p>
            <a href="#contact" class="modal-contact-btn" onclick="closeProductModal()">Get Free Quote</a>
        </div>
    `;
    
    modalBody.innerHTML = modalContent;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ==================== PAGE PERFORMANCE TRACKING (Optional) ====================
if ('performance' in window) {
    window.addEventListener('load', () => {
        const perfData = performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page load time: ${pageLoadTime}ms`);
    });
}

// ==================== DOCUMENT READY INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    console.log('Enhanced website features loaded successfully');
    
    // ==================== PRODUCT MODAL EVENT LISTENERS ====================
    // Learn More button click handlers
    const learnMoreButtons = document.querySelectorAll('.learn-more');
    console.log('Found Learn More buttons:', learnMoreButtons.length);
    
    learnMoreButtons.forEach(button => {
        console.log('Attaching click handler to button:', button.getAttribute('data-product'));
        button.addEventListener('click', (e) => {
            console.log('Learn More clicked:', button.getAttribute('data-product'));
            e.preventDefault();
            const productKey = button.getAttribute('data-product');
            console.log('Product key:', productKey);
            if (productKey) {
                openProductModal(productKey);
            }
        });
    });
    
    // Modal close button
    const closeBtn = document.querySelector('.modal-close');
    console.log('Modal close button found:', closeBtn ? 'yes' : 'no');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeProductModal);
    }
    
    // Close modal when clicking outside
    const modal = document.getElementById('productModal');
    console.log('Modal element found:', modal ? 'yes' : 'no');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeProductModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeProductModal();
        }
    });
});

// Global function for external calls
window.toggleFAQ = toggleFAQ;
window.isValidEmail = isValidEmail;
window.openProductModal = openProductModal;
window.closeProductModal = closeProductModal;

// ==================== MOBILE OPTIMIZATION ====================

// Detect if user is on mobile device
const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           (window.innerWidth <= 768);
};

// Detect viewport changes for responsive adjustments
const handleViewportChange = () => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    
    // Update body data attribute for CSS targeting
    if (vw <= 480) {
        document.body.setAttribute('data-device', 'mobile-small');
    } else if (vw <= 768) {
        document.body.setAttribute('data-device', 'mobile');
    } else if (vw <= 1024) {
        document.body.setAttribute('data-device', 'tablet');
    } else {
        document.body.setAttribute('data-device', 'desktop');
    }
};

// Call on load and resize
handleViewportChange();
window.addEventListener('resize', handleViewportChange);

// Optimize modal for mobile - adjust positioning
const optimizeModalForMobile = () => {
    const modal = document.getElementById('companyTypeModal');
    const productModal = document.getElementById('productModal');
    
    if (isMobileDevice()) {
        if (modal) {
            modal.style.paddingTop = '20px';
        }
        if (productModal) {
            productModal.style.paddingTop = '20px';
        }
    }
};

// Enhanced hamburger menu with better mobile support
// Note: hamburger is already declared in script.js, so we reference it directly
const hamburgerEl = document.getElementById('hamburger');
const navMenuEl = document.getElementById('navMenu');

if (hamburgerEl && navMenuEl) {
    // Add active class toggle for hamburger animation
    hamburgerEl.addEventListener('click', () => {
        hamburgerEl.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const navLinks = navMenuEl.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenuEl.classList.remove('active');
            hamburgerEl.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburgerEl.contains(e.target) && !navMenuEl.contains(e.target)) {
            navMenuEl.classList.remove('active');
            hamburgerEl.classList.remove('active');
        }
    });
}

// Better touch handling for modals
const setupTouchHandling = () => {
    const modals = document.querySelectorAll('[class*="modal"]');
    
    modals.forEach(modal => {
        let startY = 0;
        
        modal.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
        }, false);

        modal.addEventListener('touchmove', (e) => {
            const currentY = e.touches[0].clientY;
            
            // Prevent scrolling if user is trying to scroll up while at top
            if (startY < currentY && modal.scrollTop === 0) {
                e.preventDefault();
            }
        }, { passive: false });
    });
};

document.addEventListener('DOMContentLoaded', () => {
    setupTouchHandling();
    optimizeModalForMobile();
});

// Optimize button sizes for touch
const setupTouchFriendlyButtons = () => {
    const buttons = document.querySelectorAll('button, .btn, [role="button"]');
    
    buttons.forEach(button => {
        const rect = button.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        
        // Ensure minimum touch target size (44x44px)
        if (width < 44 || height < 44) {
            button.style.minWidth = '44px';
            button.style.minHeight = '44px';
        }
    });
};

// Call after DOM is ready
document.addEventListener('DOMContentLoaded', setupTouchFriendlyButtons);
window.addEventListener('resize', setupTouchFriendlyButtons);

// Improve scroll performance on mobile
const enablePassiveListeners = () => {
    let supportsPassive = false;
    
    try {
        const opts = Object.defineProperty({}, 'passive', {
            get: () => {
                supportsPassive = true;
                return true;
            }
        });
        window.addEventListener('test', null, opts);
    } catch (e) {
        supportsPassive = false;
    }
    
    return supportsPassive;
};

// Optimize animations for reduced motion preference
const setupReducedMotion = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        document.documentElement.style.setProperty('--transition-duration', '0.01ms');
    }
    
    prefersReducedMotion.addEventListener('change', () => {
        if (prefersReducedMotion.matches) {
            document.documentElement.style.setProperty('--transition-duration', '0.01ms');
        } else {
            document.documentElement.style.setProperty('--transition-duration', '0.3s');
        }
    });
};

setupReducedMotion();

// Enhanced iOS support
const setupIOSOptimizations = () => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    
    if (isIOS) {
        // Fix for iOS input zoom issue
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.style.fontSize = '16px'; // Prevents zoom on focus
        });
        
        // Add iOS-specific class
        document.body.classList.add('ios-device');
    }
};

document.addEventListener('DOMContentLoaded', setupIOSOptimizations);

// Fix viewport height issues on mobile (address bar hiding/showing)
const setupVHFix = () => {
    const setVh = () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setVh();
    window.addEventListener('resize', setVh);
    window.addEventListener('orientationchange', setVh);
};

setupVHFix();

// Optimize lazy loading for images on mobile
const setupLazyLoading = () => {
    if ('IntersectionObserver' in window) {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
};

document.addEventListener('DOMContentLoaded', setupLazyLoading);

// Network speed detection for mobile optimization
const setupNetworkOptimization = () => {
    if ('connection' in navigator) {
        const connection = navigator.connection;
        const updateDataSaver = () => {
            if (connection.saveData) {
                document.body.classList.add('data-saver-mode');
            }
        };
        
        updateDataSaver();
        connection.addEventListener('change', updateDataSaver);
    }
};

setupNetworkOptimization();

/* ==================== SOLUTION FINDER ASSISTANT ==================== */

let assistantState = {
    isOpen: false,
    conversationHistory: []
};

// Initialize assistant when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const assistantToggle = document.getElementById('assistantToggle');
    const assistantClose = document.getElementById('assistantClose');
    const assistantSend = document.getElementById('assistantSend');
    const assistantInput = document.getElementById('assistantInput');

    if (assistantToggle) {
        assistantToggle.addEventListener('click', toggleAssistantChat);
    }
    if (assistantClose) {
        assistantClose.addEventListener('click', closeAssistantChat);
    }
    if (assistantSend) {
        assistantSend.addEventListener('click', assistantSendMessage);
    }
    if (assistantInput) {
        assistantInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                assistantSendMessage();
            }
        });
    }
});

function toggleAssistantChat() {
    const assistantChat = document.getElementById('assistantChat');
    const assistantToggle = document.getElementById('assistantToggle');
    
    if (assistantState.isOpen) {
        closeAssistantChat();
    } else {
        assistantChat.classList.add('active');
        assistantToggle.style.display = 'none';
        assistantState.isOpen = true;
        document.getElementById('assistantInput').focus();
    }
}

function closeAssistantChat() {
    const assistantChat = document.getElementById('assistantChat');
    const assistantToggle = document.getElementById('assistantToggle');
    
    assistantChat.classList.remove('active');
    assistantToggle.style.display = 'flex';
    assistantState.isOpen = false;
}

function assistantSendMessage() {
    const input = document.getElementById('assistantInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    addAssistantMessage(message, 'user');
    input.value = '';
    
    // Store in history
    assistantState.conversationHistory.push({ role: 'user', content: message });
    
    // Simulate processing delay
    setTimeout(() => {
        const response = generateAssistantResponse(message);
        addAssistantMessage(response, 'bot');
        assistantState.conversationHistory.push({ role: 'bot', content: response });
    }, 600);
}

function addAssistantMessage(text, sender) {
    const messagesContainer = document.getElementById('assistantMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = text;
    
    messageDiv.appendChild(contentDiv);
    messagesContainer.appendChild(messageDiv);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function assistantHandleAction(action) {
    const input = document.getElementById('assistantInput');
    let query = '';
    
    switch(action) {
        case 'find-solution':
            query = 'Help me find the right building solution';
            break;
        case 'compare':
            query = 'Compare the different product series';
            break;
        case 'companies':
            query = 'Tell me about GNB companies';
            break;
        case 'consult':
            query = 'I want to schedule a consultation';
            break;
    }
    
    input.value = query;
    assistantSendMessage();
}

function generateAssistantResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    // Solution Finder Responses
    if (lowerMessage.includes('solution') || lowerMessage.includes('building')) {
        if (lowerMessage.includes('small') || lowerMessage.includes('storage') || lowerMessage.includes('agricultural')) {
            return `
                <p><strong>✓ Spartan Series</strong> is perfect for you!</p>
                <ul>
                    <li><strong>Width:</strong> 32-100 feet</li>
                    <li><strong>Best For:</strong> Storage, agricultural, material handling</li>
                    <li><strong>Install Time:</strong> 2-4 weeks</li>
                    <li><strong>Warranty:</strong> 16 years</li>
                </ul>
                <p><strong>Ready to learn more?</strong> <a href="#products" style="color: #f57d1a; font-weight: 700; cursor: pointer; text-decoration: underline;">View Products →</a></p>
            `;
        } else if (lowerMessage.includes('large') || lowerMessage.includes('commercial') || lowerMessage.includes('mining')) {
            return `
                <p><strong>✓ Centurion Series</strong> is your match!</p>
                <ul>
                    <li><strong>Width:</strong> 40-150+ feet</li>
                    <li><strong>Best For:</strong> Commercial, mining, heavy manufacturing</li>
                    <li><strong>Install Time:</strong> 3-6 weeks</li>
                    <li><strong>Warranty:</strong> 16 years</li>
                </ul>
                <p><strong>Compare with other series:</strong> <a href="#comparison" style="color: #f57d1a; font-weight: 700; cursor: pointer; text-decoration: underline;">See Comparison →</a></p>
            `;
        } else if (lowerMessage.includes('custom') || lowerMessage.includes('military') || lowerMessage.includes('data center') || lowerMessage.includes('aerospace')) {
            return `
                <p><strong>✓ Custom Solutions</strong> - Perfect for specialized needs!</p>
                <ul>
                    <li><strong>Width:</strong> Up to 400+ feet</li>
                    <li><strong>Best For:</strong> Military, data centers, aerospace</li>
                    <li><strong>Custom:</strong> Fully engineered solutions</li>
                    <li><strong>Warranty:</strong> 16 years</li>
                </ul>
                <p><strong>Get expert consultation:</strong> <a href="#contact" style="color: #f57d1a; font-weight: 700; cursor: pointer; text-decoration: underline;">Contact Us →</a></p>
            `;
        } else {
            return `
                <p>Great question! To recommend the best solution, tell me about your project:</p>
                <ul>
                    <li>What's the primary use? (storage, manufacturing, data center, etc.)</li>
                    <li>What size building do you need?</li>
                    <li>What industry are you in?</li>
                </ul>
                <p>Or <a href="#comparison" style="color: #f57d1a; font-weight: 700; cursor: pointer; text-decoration: underline;">compare all three series →</a></p>
            `;
        }
    }
    
    // Company Information
    if (lowerMessage.includes('company') || lowerMessage.includes('companies') || lowerMessage.includes('doors') || lowerMessage.includes('rwes') || lowerMessage.includes('tarps')) {
        if (lowerMessage.includes('doors')) {
            return `
                <p><strong>🚪 GNB Doors</strong> - 24/7 Commercial Overhead Doors & Loading Docks</p>
                <ul>
                    <li>Emergency response within 1 hour</li>
                    <li>Technician on-site within 3 hours</li>
                    <li>Service across Canada & North Texas</li>
                    <li>24/7 availability guaranteed</li>
                </ul>
                <p><a href="#gnb-companies" style="color: #f57d1a; font-weight: 700; cursor: pointer; text-decoration: underline;">Learn More about GNB Doors →</a></p>
            `;
        } else if (lowerMessage.includes('rwes')) {
            return `
                <p><strong>🏗️ RWES</strong> - Reusable Weather Enclosure Systems</p>
                <ul>
                    <li>Patented construction envelopes</li>
                    <li>99% weather-tight protection</li>
                    <li>50-80% faster than tarps</li>
                    <li>OSHA fall protection compliant</li>
                </ul>
                <p><a href="#gnb-companies" style="color: #f57d1a; font-weight: 700; cursor: pointer; text-decoration: underline;">Learn More about RWES →</a></p>
            `;
        } else if (lowerMessage.includes('tarp')) {
            return `
                <p><strong>📦 Supreme Tarps</strong> - Commercial-Grade Heavy Duty Tarps</p>
                <ul>
                    <li>Strongest commercial tarps available</li>
                    <li>Locally manufactured (USA & Canada)</li>
                    <li>Perfect for industrial applications</li>
                    <li>North America-wide delivery</li>
                </ul>
                <p><a href="#gnb-companies" style="color: #f57d1a; font-weight: 700; cursor: pointer; text-decoration: underline;">Learn More about Supreme Tarps →</a></p>
            `;
        } else {
            return `
                <p><strong>GNB Global Companies:</strong></p>
                <ul>
                    <li>🚪 <strong>GNB Doors</strong> - Commercial overhead doors & loading docks</li>
                    <li>🏗️ <strong>RWES</strong> - Weather enclosure systems</li>
                    <li>📦 <strong>Supreme Tarps</strong> - Heavy-duty tarps</li>
                </ul>
                <p><a href="#gnb-companies" style="color: #f57d1a; font-weight: 700; cursor: pointer; text-decoration: underline;">See All Companies →</a></p>
            `;
        }
    }
    
    // Pricing/Cost
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('quote')) {
        return `
            <p>Pricing for fabric buildings varies based on:</p>
            <ul>
                <li>Building size and specifications</li>
                <li>Product series (Spartan, Centurion, or Custom)</li>
                <li>Installation location</li>
                <li>Customization requirements</li>
            </ul>
            <p><strong>Get a custom quote:</strong> <a href="#contact" style="color: #f57d1a; font-weight: 700; cursor: pointer; text-decoration: underline;">Contact Our Experts →</a></p>
        `;
    }
    
    // Warranty
    if (lowerMessage.includes('warranty') || lowerMessage.includes('guarantee')) {
        return `
            <p><strong>All GNB Buildings Include:</strong></p>
            <ul>
                <li>✓ <strong>16-Year Warranty</strong></li>
                <li>✓ Full coverage on fabric and structure</li>
                <li>✓ Engineering support included</li>
            </ul>
            <p><strong>GNB Doors Guarantee:</strong> "Never Leave A Door Open" - Door secured by end of day or we make it right! 🛡️</p>
        `;
    }
    
    // Consultation
    if (lowerMessage.includes('consult') || lowerMessage.includes('expert') || lowerMessage.includes('contact') || lowerMessage.includes('call')) {
        return `
            <p><strong>Ready to talk to an expert?</strong></p>
            <ul>
                <li>📞 Get a free consultation</li>
                <li>📊 Custom quotes for your project</li>
                <li>💡 Expert recommendations</li>
            </ul>
            <p><a href="#contact" style="color: #f57d1a; font-weight: 700; cursor: pointer; text-decoration: underline;">Schedule Consultation →</a></p>
            <p><strong>Or call now for immediate assistance!</strong></p>
        `;
    }
    
    // Comparison
    if (lowerMessage.includes('compare') || lowerMessage.includes('different') || lowerMessage.includes('series')) {
        return `
            <p><strong>Compare Our Three Product Series:</strong></p>
            <ul>
                <li><strong>Spartan:</strong> 32-100 ft (Storage, Agricultural)</li>
                <li><strong>Centurion:</strong> 40-150+ ft (Commercial, Mining)</li>
                <li><strong>Custom:</strong> Up to 400+ ft (Specialized Applications)</li>
            </ul>
            <p><a href="#comparison" style="color: #f57d1a; font-weight: 700; cursor: pointer; text-decoration: underline;">View Full Comparison →</a></p>
        `;
    }
    
    // Projects/Portfolio
    if (lowerMessage.includes('project') || lowerMessage.includes('portfolio') || lowerMessage.includes('example')) {
        return `
            <p><strong>GNB Global has completed 250+ landmark projects:</strong></p>
            <ul>
                <li>🏢 Data Centers (Eagle Mountain)</li>
                <li>✈️ Military Hangars (Robins AFB, Naval Bases)</li>
                <li>⛏️ Mining Facilities</li>
                <li>🏭 Industrial Storage</li>
            </ul>
            <p><a href="#projects-showcase" style="color: #f57d1a; font-weight: 700; cursor: pointer; text-decoration: underline;">View Our Projects →</a></p>
        `;
    }
    
    // Default response
    return `
        <p>Great question! I can help you with:</p>
        <ul>
            <li>🎯 Finding the right building solution</li>
            <li>📊 Comparing product series</li>
            <li>🏢 Information about our companies</li>
            <li>💬 Answers to common questions</li>
            <li>📞 Scheduling a consultation</li>
        </ul>
        <p><strong>What would you like to explore?</strong></p>
    `;
}

// Make functions globally available
window.assistantHandleAction = assistantHandleAction;
window.assistantSendMessage = assistantSendMessage;