// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Handle Dropdown Toggles
document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const navDropdown = this.closest('.nav-dropdown');
        if (navDropdown) {
            navDropdown.classList.toggle('active');
        }
    });
});

// Close menu when link is clicked and handle company navigation
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', function(e) {
        // Check if this is a dropdown toggle (it will be handled above)
        if (this.classList.contains('dropdown-toggle')) {
            return;
        }
        
        // Close all dropdowns
        document.querySelectorAll('.nav-dropdown.active').forEach(dd => {
            dd.classList.remove('active');
        });
        
        navMenu.classList.remove('active');
        
        // Handle GNB Companies dropdown navigation
        const href = this.getAttribute('href');
        if (href === '#gnb-doors-detail') {
            e.preventDefault();
            switchCompany('gnb-doors-detail');
            // Scroll to gnb-companies section
            const section = document.getElementById('gnb-companies');
            if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else if (href === '#rwes-detail') {
            e.preventDefault();
            switchCompany('rwes-detail');
            // Scroll to gnb-companies section
            const section = document.getElementById('gnb-companies');
            if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else if (href === '#supreme-tarps-detail') {
            e.preventDefault();
            switchCompany('supreme-tarps-detail');
            // Scroll to gnb-companies section
            const section = document.getElementById('gnb-companies');
            if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Collect form data
        const formData = new FormData(contactForm);
        
        // Display success message
        alert('✓ Thank you for your inquiry!\n\nA GNB Global salesperson will reach out to you within 24 hours.\n\nFor immediate assistance, call: 1-866-696-6187');
        
        // Reset form
        contactForm.reset();
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Smooth scroll enhancement
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

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.product-card, .benefit-card, .partner-logo, .project, .testimonial-card, .featured-project, .detail, .manufacturing-image, .showcase-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Eagle Mountain Gallery - Switch Images
function switchEagleImage(imageSrc, thumbElement) {
    const mainImage = document.getElementById('eagleMainImage');
    if (mainImage) {
        mainImage.src = imageSrc;
        mainImage.style.width = '100%';
        mainImage.style.height = '100%';
        mainImage.style.objectFit = 'cover';
        mainImage.style.display = 'block';
        
        // Update active thumbnail
        document.querySelectorAll('.gallery-thumb').forEach(thumb => {
            thumb.classList.remove('active');
        });
        
        // Mark the clicked thumbnail as active
        if (thumbElement) {
            thumbElement.classList.add('active');
        }
    }
}

// Gallery Modal Functions
function openGalleryModal() {
    const modal = document.getElementById('galleryModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        console.log('✓ Gallery modal opened');
    }
}

function closeGalleryModal() {
    const modal = document.getElementById('galleryModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        console.log('✓ Gallery modal closed');
    }
}

function switchModalImage(imagePath, element, event) {
    if (event) {
        event.stopPropagation();
    }
    const mainImage = document.getElementById('modalGalleryImage');
    if (mainImage) {
        mainImage.src = imagePath;
    }
    
    // Update active thumbnail
    document.querySelectorAll('.modal-gallery-thumb').forEach(thumb => {
        thumb.classList.remove('active');
    });
    if (element) {
        element.classList.add('active');
    }
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeGalleryModal();
        closeRobinsModal();
        closeNavalModal();
        closeLrdrModal();
    }
});

// ==================== ROBINS AIR FORCE GALLERY FUNCTIONS ====================
function switchRobinsImage(imagePath, element, event) {
    if (event) {
        event.stopPropagation();
    }
    const mainImage = document.getElementById('robinsMainImage');
    if (mainImage) {
        mainImage.src = imagePath;
    }
    
    // Update active thumbnail
    document.querySelectorAll('.robins-gallery .gallery-thumb').forEach(thumb => {
        thumb.classList.remove('active');
    });
    if (element) {
        element.classList.add('active');
    }
}

function openRobinsModal() {
    const modal = document.getElementById('robinsModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        startRobinsAutoScroll();
    }
}

function closeRobinsModal() {
    const modal = document.getElementById('robinsModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function switchRobinsModalImage(imagePath, element, event) {
    if (event) {
        event.stopPropagation();
    }
    const mainImage = document.getElementById('robinsModalImage');
    if (mainImage) {
        mainImage.src = imagePath;
    }
    
    // Update active thumbnail
    document.querySelectorAll('#robinsModal .modal-gallery-thumb').forEach(thumb => {
        thumb.classList.remove('active');
    });
    if (element) {
        element.classList.add('active');
    }
}

// ==================== NAVAL AIR STATION GALLERY FUNCTIONS ====================
function switchNavalImage(imagePath, element, event) {
    if (event) {
        event.stopPropagation();
    }
    const mainImage = document.getElementById('navalMainImage');
    if (mainImage) {
        mainImage.src = imagePath;
    }
    
    // Update active thumbnail
    document.querySelectorAll('.naval-gallery .gallery-thumb').forEach(thumb => {
        thumb.classList.remove('active');
    });
    if (element) {
        element.classList.add('active');
    }
}

function openNavalModal() {
    const modal = document.getElementById('navalModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        startNavalAutoScroll();
    }
}

function closeNavalModal() {
    const modal = document.getElementById('navalModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function switchNavalModalImage(imagePath, element, event) {
    if (event) {
        event.stopPropagation();
    }
    const mainImage = document.getElementById('navalModalImage');
    if (mainImage) {
        mainImage.src = imagePath;
    }
    
    // Update active thumbnail
    document.querySelectorAll('#navalModal .modal-gallery-thumb').forEach(thumb => {
        thumb.classList.remove('active');
    });
    if (element) {
        element.classList.add('active');
    }
}

// ==================== LRDR GALLERY FUNCTIONS ====================
function switchLrdrImage(imagePath, element, event) {
    if (event) {
        event.stopPropagation();
    }
    const mainImage = document.getElementById('lrdrMainImage');
    if (mainImage) {
        mainImage.src = imagePath;
    }
    
    // Update active thumbnail
    document.querySelectorAll('.lrdr-gallery .gallery-thumb').forEach(thumb => {
        thumb.classList.remove('active');
    });
    if (element) {
        element.classList.add('active');
    }
}

function openLrdrModal() {
    const modal = document.getElementById('lrdrModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeLrdrModal() {
    const modal = document.getElementById('lrdrModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function switchLrdrModalImage(imagePath, element, event) {
    if (event) {
        event.stopPropagation();
    }
    const mainImage = document.getElementById('lrdrModalImage');
    if (mainImage) {
        mainImage.src = imagePath;
    }
    
    // Update active thumbnail
    document.querySelectorAll('#lrdrModal .modal-gallery-thumb').forEach(thumb => {
        thumb.classList.remove('active');
    });
    if (element) {
        element.classList.add('active');
    }
}

// ==================== AUTO-SCROLL GALLERY ====================
let autoScrollIndex = 0;
const autoScrollImages = [
    'Eagle-Mountain-Data-Center-thumb.jpg',
    'Eagle-Mountain-Data-Center-02.jpg',
    'Eagle-Mountain-Data-Center-03.jpg',
    'Eagle-Mountain-Data-Center-04.jpg'
];

function startEagleGalleryAutoScroll() {
    const mainImg = document.getElementById('eagleMainImage');
    if (!mainImg) return; // Element not found yet
    
    setInterval(() => {
        autoScrollIndex = (autoScrollIndex + 1) % autoScrollImages.length;
        const imagePath = autoScrollImages[autoScrollIndex];
        
        // Update main image
        mainImg.src = imagePath;
        
        // Update active thumbnail
        const thumbs = document.querySelectorAll('.gallery-thumb');
        thumbs.forEach((thumb, i) => {
            if (i === autoScrollIndex) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
    }, 2000);
}

// Start auto-scroll when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(startEagleGalleryAutoScroll, 500);
        setTimeout(startRobinsGalleryAutoScroll, 700);
        setTimeout(startNavalGalleryAutoScroll, 900);
        setTimeout(startAshGroveGalleryAutoScroll, 1100);
        setTimeout(startMonsantoGalleryAutoScroll, 1300);
        setTimeout(startMGCarterGalleryAutoScroll, 1500);
        setTimeout(startMinnesotaGalleryAutoScroll, 1700);
    });
} else {
    setTimeout(startEagleGalleryAutoScroll, 500);
    setTimeout(startRobinsGalleryAutoScroll, 700);
    setTimeout(startNavalGalleryAutoScroll, 900);
    setTimeout(startAshGroveGalleryAutoScroll, 1100);
    setTimeout(startMonsantoGalleryAutoScroll, 1300);
    setTimeout(startMGCarterGalleryAutoScroll, 1500);
    setTimeout(startMinnesotaGalleryAutoScroll, 1700);
}

// ==================== ROBINS AUTO-SCROLL ====================
let robinsScrollIndex = 0;
const robinsScrollImages = [
    'GNB-Global-Robins-Air-Force-Base-custom-C-17-hangar-building-01.jpg',
    'GNB-Global-Robins-Air-Force-Base-custom-C-17-hangar-building-02.jpg',
    'GNB-Global-Robins-Air-Force-Base-custom-C-17-hangar-building-03.jpg'
];

function startRobinsGalleryAutoScroll() {
    const mainImg = document.getElementById('robinsMainImage');
    if (!mainImg) return;
    
    setInterval(() => {
        robinsScrollIndex = (robinsScrollIndex + 1) % robinsScrollImages.length;
        const imagePath = robinsScrollImages[robinsScrollIndex];
        
        // Update main image
        mainImg.src = imagePath;
        
        // Update active thumbnail
        const thumbs = document.querySelectorAll('.robins-gallery .gallery-thumb');
        thumbs.forEach((thumb, i) => {
            if (i === robinsScrollIndex) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
    }, 2000);
}

function startRobinsAutoScroll() {
    const mainImg = document.getElementById('robinsModalImage');
    if (!mainImg) return;
    
    let robinsModalIndex = 0;
    setInterval(() => {
        robinsModalIndex = (robinsModalIndex + 1) % robinsScrollImages.length;
        const imagePath = robinsScrollImages[robinsModalIndex];
        
        // Update main image
        mainImg.src = imagePath;
        
        // Update active thumbnail
        const thumbs = document.querySelectorAll('#robinsModal .modal-gallery-thumb');
        thumbs.forEach((thumb, i) => {
            if (i === robinsModalIndex) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
    }, 2000);
}

// ==================== NAVAL AUTO-SCROLL ====================
let navalScrollIndex = 0;
const navalScrollImages = [
    'GNB-Global-aircraft-sun-shades-hangar-naval-air-station-corpus-christi-01.jpg',
    'GNB-Global-aircraft-sun-shades-hangar-naval-air-station-corpus-christi-02.jpg',
    'GNB-Global-aircraft-sun-shades-hangar-naval-air-station-corpus-christi-03.jpg'
];

function startNavalGalleryAutoScroll() {
    const mainImg = document.getElementById('navalMainImage');
    if (!mainImg) return;
    
    setInterval(() => {
        navalScrollIndex = (navalScrollIndex + 1) % navalScrollImages.length;
        const imagePath = navalScrollImages[navalScrollIndex];
        
        // Update main image
        mainImg.src = imagePath;
        
        // Update active thumbnail
        const thumbs = document.querySelectorAll('.naval-gallery .gallery-thumb');
        thumbs.forEach((thumb, i) => {
            if (i === navalScrollIndex) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
    }, 2000);
}

function startNavalAutoScroll() {
    const mainImg = document.getElementById('navalModalImage');
    if (!mainImg) return;
    
    let navalModalIndex = 0;
    setInterval(() => {
        navalModalIndex = (navalModalIndex + 1) % navalScrollImages.length;
        const imagePath = navalScrollImages[navalModalIndex];
        
        // Update main image
        mainImg.src = imagePath;
        
        // Update active thumbnail
        const thumbs = document.querySelectorAll('#navalModal .modal-gallery-thumb');
        thumbs.forEach((thumb, i) => {
            if (i === navalModalIndex) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
    }, 2000);
}

// ==================== CAROUSEL SCROLL FUNCTION ====================
function scrollCarousel(direction) {
    const carousel = document.getElementById('showcaseCarousel');
    if (!carousel) return;
    
    stopCarouselAutoScroll();
    
    // Get actual card width
    const card = carousel.querySelector('.showcase-item');
    const cardWidth = card ? card.offsetWidth : 330;
    const gap = 32; // Gap is 2rem = 32px
    const scrollAmount = cardWidth + gap;
    
    if (direction === 'left') {
        carousel.scrollBy({ 
            left: -scrollAmount, 
            behavior: 'smooth' 
        });
    } else if (direction === 'right') {
        carousel.scrollBy({ 
            left: scrollAmount, 
            behavior: 'smooth' 
        });
    }
    
    // Resume auto-scroll after delay
    setTimeout(startCarouselAutoScroll, 3000);
}

// ==================== SCROLL TO SPECIFIC PROJECT ====================
function scrollToProject(index) {
    const carousel = document.getElementById('showcaseCarousel');
    if (!carousel) return;
    
    stopCarouselAutoScroll();
    
    const cards = carousel.querySelectorAll('.showcase-item');
    if (index < 0 || index >= cards.length) return;
    
    const targetCard = cards[index];
    const cardWidth = targetCard.offsetWidth;
    const gap = 32;
    const scrollPosition = index * (cardWidth + gap);
    
    carousel.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
    });
    
    // Update active state on navigation
    const navItems = document.querySelectorAll('.project-nav-item');
    navItems.forEach((item, i) => {
        if (i === index) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    // Resume auto-scroll after delay
    setTimeout(startCarouselAutoScroll, 5000);
}

// Update navigation active state on scroll
function updateNavOnScroll() {
    const carousel = document.getElementById('showcaseCarousel');
    if (!carousel) return;
    
    const cards = carousel.querySelectorAll('.showcase-item');
    const navItems = document.querySelectorAll('.project-nav-item');
    
    if (cards.length === 0 || navItems.length === 0) return;
    
    const cardWidth = cards[0].offsetWidth + 32; // card width + gap
    const scrollLeft = carousel.scrollLeft;
    const activeIndex = Math.round(scrollLeft / cardWidth);
    
    navItems.forEach((item, i) => {
        if (i === activeIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Add scroll listener to carousel
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('showcaseCarousel');
    if (carousel) {
        carousel.addEventListener('scroll', updateNavOnScroll);
    }
});

// ==================== AUTO SCROLL CAROUSEL ====================
let autoScrollInterval;
let currentScrollIndex = 0;

function startCarouselAutoScroll() {
    const carousel = document.getElementById('showcaseCarousel');
    if (!carousel) return;
    
    clearInterval(autoScrollInterval);
    
    autoScrollInterval = setInterval(() => {
        const carousel = document.getElementById('showcaseCarousel');
        if (!carousel) return;
        
        const card = carousel.querySelector('.showcase-item');
        const cardWidth = card ? card.offsetWidth : 330;
        const gap = 32;
        const scrollAmount = cardWidth + gap;
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;
        
        if (carousel.scrollLeft >= maxScroll - 50) {
            // Reset to start
            carousel.scrollLeft = 0;
        } else {
            carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    }, 5000); // Auto scroll every 5 seconds
}

function stopCarouselAutoScroll() {
    if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
    }
}

// Start auto-scroll when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(startCarouselAutoScroll, 1500);
        
        // Add hover listeners
        const carousel = document.getElementById('showcaseCarousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', stopCarouselAutoScroll);
            carousel.addEventListener('mouseleave', () => {
                setTimeout(startCarouselAutoScroll, 500);
            });
        }
    });
} else {
    setTimeout(startCarouselAutoScroll, 1500);
    
    // Add hover listeners
    const carousel = document.getElementById('showcaseCarousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopCarouselAutoScroll);
        carousel.addEventListener('mouseleave', () => {
            setTimeout(startCarouselAutoScroll, 500);
        });
    }
}

// ==================== PROJECTS LIST TOGGLE FUNCTION ====================
function toggleProjectsList() {
    const listContainer = document.getElementById('allProjectsList');
    const arrow = document.querySelector('.expand-arrow');
    
    if (!listContainer) return;
    
    const isHidden = listContainer.style.display === 'none' || listContainer.classList.contains('hidden');
    
    if (isHidden) {
        listContainer.style.display = 'block';
        listContainer.classList.add('active');
        if (arrow) {
            arrow.style.transform = 'rotate(180deg)';
        }
    } else {
        listContainer.classList.remove('active');
        if (arrow) {
            arrow.style.transform = 'rotate(0deg)';
        }
        // Hide after animation completes
        setTimeout(() => {
            listContainer.style.display = 'none';
        }, 400);
    }
}

// ==================== ASH GROVE GALLERY FUNCTIONS ====================
function switchAshGroveImage(imagePath, element, event) {
    if (event) {
        event.stopPropagation();
    }
    const mainImage = document.getElementById('ashgroveMainImage');
    if (mainImage) {
        mainImage.src = imagePath;
    }
    
    // Update active thumbnail
    document.querySelectorAll('.ashgrove-gallery .gallery-thumb').forEach(thumb => {
        thumb.classList.remove('active');
    });
    if (element) {
        element.classList.add('active');
    }
}

function openAshGroveModal() {
    const modal = document.getElementById('ashgroveModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeAshGroveModal() {
    const modal = document.getElementById('ashgroveModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function switchAshGroveModalImage(imagePath, element, event) {
    if (event) {
        event.stopPropagation();
    }
    const mainImage = document.getElementById('ashgroveModalImage');
    if (mainImage) {
        mainImage.src = imagePath;
    }
    
    // Update active thumbnail
    document.querySelectorAll('#ashgroveModal .modal-gallery-thumb').forEach(thumb => {
        thumb.classList.remove('active');
    });
    if (element) {
        element.classList.add('active');
    }
}

// ==================== MONSANTO GALLERY FUNCTIONS ====================
function switchMonsantoImage(imagePath, element, event) {
    if (event) {
        event.stopPropagation();
    }
    const mainImage = document.getElementById('monsantoMainImage');
    if (mainImage) {
        mainImage.src = imagePath;
    }
    
    // Update active thumbnail
    document.querySelectorAll('.monsanto-gallery .gallery-thumb').forEach(thumb => {
        thumb.classList.remove('active');
    });
    if (element) {
        element.classList.add('active');
    }
}

function openMonsantoModal() {
    const modal = document.getElementById('monsantoModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeMonsantoModal() {
    const modal = document.getElementById('monsantoModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function switchMonsantoModalImage(imagePath, element, event) {
    if (event) {
        event.stopPropagation();
    }
    const mainImage = document.getElementById('monsantoModalImage');
    if (mainImage) {
        mainImage.src = imagePath;
    }
    
    // Update active thumbnail
    document.querySelectorAll('#monsantoModal .modal-gallery-thumb').forEach(thumb => {
        thumb.classList.remove('active');
    });
    if (element) {
        element.classList.add('active');
    }
}

// ==================== ASH GROVE AUTO-SCROLL ====================
let ashGroveScrollIndex = 0;
const ashGroveScrollImages = [
    'GNB-Global-Ash-Grove-cement-storage-fabric-builidngs-01.jpg',
    'GNB-Global-Ash-Grove-cement-storage-fabric-builidngs-02.jpg',
    'GNB-Global-Ash-Grove-cement-storage-fabric-builidngs-03.jpg',
    'GNB-Global-Ash-Grove-cement-storage-fabric-builidngs-04.jpg'
];

function startAshGroveGalleryAutoScroll() {
    const mainImg = document.getElementById('ashgroveMainImage');
    if (!mainImg) return;
    
    setInterval(() => {
        ashGroveScrollIndex = (ashGroveScrollIndex + 1) % ashGroveScrollImages.length;
        const imagePath = ashGroveScrollImages[ashGroveScrollIndex];
        
        // Update main image
        mainImg.src = imagePath;
        
        // Update active thumbnail
        const thumbs = document.querySelectorAll('.ashgrove-gallery .gallery-thumb');
        thumbs.forEach((thumb, i) => {
            if (i === ashGroveScrollIndex) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
    }, 2000);
}

// ==================== MONSANTO AUTO-SCROLL ====================
let monsantoScrollIndex = 0;
const monsantoScrollImages = [
    'GNB-Global-Monsanto-mining-storage-building-01.jpg',
    'GNB-Global-Monsanto-mining-storage-building-02.jpg',
    'GNB-Global-Monsanto-mining-storage-building-03.jpg',
    'GNB-Global-Monsanto-mining-storage-building-04.jpg'
];

function startMonsantoGalleryAutoScroll() {
    const mainImg = document.getElementById('monsantoMainImage');
    if (!mainImg) return;
    
    setInterval(() => {
        monsantoScrollIndex = (monsantoScrollIndex + 1) % monsantoScrollImages.length;
        const imagePath = monsantoScrollImages[monsantoScrollIndex];
        
        // Update main image
        mainImg.src = imagePath;
        
        // Update active thumbnail
        const thumbs = document.querySelectorAll('.monsanto-gallery .gallery-thumb');
        thumbs.forEach((thumb, i) => {
            if (i === monsantoScrollIndex) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
    }, 2000);
}

// ==================== MG CARTER AUTO-SCROLL ====================
let mgcarterScrollIndex = 0;
const mgcarterScrollImages = [
    'GNB-Global-MG-Carter-Softball-Complex-buildings-01.jpg',
    'GNB-Global-MG-Carter-Softball-Complex-buildings-02.jpg',
    'GNB-Global-MG-Carter-Softball-Complex-buildings-03.jpg',
    'GNB-Global-MG-Carter-Softball-Complex-buildings-04.jpg'
];

function startMGCarterGalleryAutoScroll() {
    const mainImg = document.getElementById('mgcarterMainImage');
    if (!mainImg) return;
    
    setInterval(() => {
        mgcarterScrollIndex = (mgcarterScrollIndex + 1) % mgcarterScrollImages.length;
        const imagePath = mgcarterScrollImages[mgcarterScrollIndex];
        
        // Update main image
        mainImg.src = imagePath;
        
        // Update active thumbnail
        const thumbs = document.querySelectorAll('.mgcarter-gallery .gallery-thumb');
        thumbs.forEach((thumb, i) => {
            if (i === mgcarterScrollIndex) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
    }, 2000);
}

// ==================== MG CARTER MODAL FUNCTIONS ====================
function switchMGCarterImage(imagePath, element, event) {
    if (event) {
        event.stopPropagation();
    }
    const mainImage = document.getElementById('mgcarterMainImage');
    if (mainImage) {
        mainImage.src = imagePath;
    }
    
    // Update active thumbnail
    document.querySelectorAll('.mgcarter-gallery .gallery-thumb').forEach(thumb => {
        thumb.classList.remove('active');
    });
    if (element) {
        element.classList.add('active');
    }
}

function openMGCarterModal() {
    const modal = document.getElementById('mgcarterModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeMGCarterModal() {
    const modal = document.getElementById('mgcarterModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function switchMGCarterModalImage(imagePath, element, event) {
    if (event) {
        event.stopPropagation();
    }
    const mainImage = document.getElementById('mgcarterModalImage');
    if (mainImage) {
        mainImage.src = imagePath;
    }
    
    // Update active thumbnail
    document.querySelectorAll('#mgcarterModal .modal-gallery-thumb').forEach(thumb => {
        thumb.classList.remove('active');
    });
    if (element) {
        element.classList.add('active');
    }
}

// ==================== MINNESOTA AUTO-SCROLL ====================
let minnesotaScrollIndex = 0;
const minnesotaScrollImages = [
    'minnesota-public-works-facility-tension-fabric-building-01.jpg',
    'minnesota-public-works-facility-tension-fabric-building-02.jpg',
    'minnesota-public-works-facility-tension-fabric-building-03.jpg'
];

function startMinnesotaGalleryAutoScroll() {
    const mainImg = document.getElementById('minnesotaMainImage');
    if (!mainImg) return;
    
    setInterval(() => {
        minnesotaScrollIndex = (minnesotaScrollIndex + 1) % minnesotaScrollImages.length;
        const imagePath = minnesotaScrollImages[minnesotaScrollIndex];
        
        // Update main image
        mainImg.src = imagePath;
        
        // Update active thumbnail
        const thumbs = document.querySelectorAll('.minnesota-gallery .gallery-thumb');
        thumbs.forEach((thumb, i) => {
            if (i === minnesotaScrollIndex) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
    }, 2000);
}

// ==================== MINNESOTA MODAL FUNCTIONS ====================
function switchMinnesotaImage(imagePath, element, event) {
    if (event) {
        event.stopPropagation();
    }
    const mainImage = document.getElementById('minnesotaMainImage');
    if (mainImage) {
        mainImage.src = imagePath;
    }
    
    // Update active thumbnail
    document.querySelectorAll('.minnesota-gallery .gallery-thumb').forEach(thumb => {
        thumb.classList.remove('active');
    });
    if (element) {
        element.classList.add('active');
    }
}

function openMinnesotaModal() {
    const modal = document.getElementById('minnesotaModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeMinnesotaModal() {
    const modal = document.getElementById('minnesotaModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function switchMinnesotaModalImage(imagePath, element, event) {
    if (event) {
        event.stopPropagation();
    }
    const mainImage = document.getElementById('minnesotaModalImage');
    if (mainImage) {
        mainImage.src = imagePath;
    }
    
    // Update active thumbnail
    document.querySelectorAll('#minnesotaModal .modal-gallery-thumb').forEach(thumb => {
        thumb.classList.remove('active');
    });
    if (element) {
        element.classList.add('active');
    }
}

// GNB Companies Tab Switching
function switchCompany(companyId) {
    // Hide all company details
    document.querySelectorAll('.company-detail').forEach(detail => {
        detail.classList.remove('active');
    });
    
    // Remove active class from all tabs
    document.querySelectorAll('.company-tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected company detail
    const selectedCompany = document.getElementById(companyId);
    if (selectedCompany) {
        selectedCompany.classList.add('active');
    }
    
    // Set active tab button based on company ID
    const tabButtons = document.querySelectorAll('.company-tab-btn');
    tabButtons.forEach((btn, index) => {
        if (companyId === 'gnb-doors-detail' && index === 0) {
            btn.classList.add('active');
        } else if (companyId === 'rwes-detail' && index === 1) {
            btn.classList.add('active');
        } else if (companyId === 'supreme-tarps-detail' && index === 2) {
            btn.classList.add('active');
        }
    });
}