/* ==========================================================================
   Configuration
   ========================================================================== */
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

/* ==========================================================================
   Login Modal Initialization
   ========================================================================== */
// Load login modal content and initialize modal logic after loading
document.addEventListener('DOMContentLoaded', function() {
    fetch('./pages/home/login-modal.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('loginModalContainer').innerHTML = html;
            // Initialize Bootstrap Modal
            const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
        })
        .catch(error => {
            console.error('Error loading login modal:', error);
        });
});

/* ==========================================================================
   Smooth Scrolling
   ========================================================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

/* ==========================================================================
   Intersection Observer Setup
   ========================================================================== */
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all location cards
document.querySelectorAll('.location-card').forEach(card => {
    observer.observe(card);
});

/* ==========================================================================
   Parallax Effects
   ========================================================================== */
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-section');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
});

/* ==========================================================================
   Location Points Animation
   ========================================================================== */
let currentIndex = 0;

function animateNextPoint() {
    if (currentIndex < locationPoints.length) {
        locationPoints[currentIndex].style.opacity = '1';
        locationPoints[currentIndex].style.transform = 'translateY(0)';
        currentIndex++;
        setTimeout(animateNextPoint, 200);
    }
}

// Initialize location points with delays
const locationPoints = document.querySelectorAll('.location-point');
locationPoints.forEach((point, index) => {
    point.style.animationDelay = `${index * 0.2}s`;
});

// Start animation when section is in view
const exploreSection = document.querySelector('.explore-section');
const exploreObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNextPoint();
            exploreObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

exploreObserver.observe(exploreSection);

/* ==========================================================================
   Interactive Effects
   ========================================================================== */
// Location points hover effects
document.querySelectorAll('.location-point').forEach(point => {
    point.addEventListener('mouseenter', () => {
        const card = point.querySelector('.location-card');
        card.style.transform = 'translateY(-20px)';
        card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
    });
    
    point.addEventListener('mouseleave', () => {
        const card = point.querySelector('.location-card');
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
    });
});

// Location cards floating animation
document.querySelectorAll('.location-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.animation = 'float 2s ease-in-out infinite';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.animation = 'none';
    });
}); 