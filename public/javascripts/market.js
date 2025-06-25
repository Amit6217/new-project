// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add active class to navigation items on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Function to fetch and render products by category
async function fetchAndRenderProducts(category) {
    // Map category names to API endpoints and section IDs
    const apiMap = {
        'newProducts': '/marketplace/api/ourproduct',
        'bookRentals': '/marketplace/api/bookrental',
        'resellItems': '/marketplace/api/resell'
    };
    const sectionMap = {
        'newProducts': 'our-products',
        'bookRentals': 'book-rentals',
        'resellItems': 'resell'
    };

    const apiUrl = apiMap[category];
    const sectionId = sectionMap[category];
    const container = document.querySelector(`#${sectionId} .row`);
    if (!container) return;

    try {
        const res = await fetch(apiUrl);
        const products = await res.json();

        // Sort by price and show only first 3 for home page
        const sortedProducts = products.sort((a, b) => a.price - b.price).slice(0, 3);

        container.innerHTML = '';
        sortedProducts.forEach(product => {
            container.innerHTML += createProductCard(product, category);
        });
    } catch (err) {
        container.innerHTML = `<div class="col-12 text-center"><p class="no-results">Failed to load products.</p></div>`;
    }
}

// Function to create product card HTML (update to use DB fields)
function createProductCard(product, category) {
    const isRental = category === 'bookRentals';
    const priceDisplay = isRental ? `₹${product.price}/${product.rentalPeriod || 'month'}` : `₹${product.price}`;
    const categoryDisplay = category === 'newProducts' ? 'Our Product' :
        category === 'bookRentals' ? 'Book Rental' : 'Resell Item';

    return `
        <div class="product-card" data-aos="fade-up">
            <div class="product-image">
                <img src="${product.imageUrl || product.imageUrls?.[0] || '/images/placeholder.png'}" alt="${product.name}">
                <span class="category-badge">${categoryDisplay}</span>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="description">${product.description || ''}</p>
                <div class="price">${priceDisplay}</div>
                ${product.condition ? `<div class="condition">Condition: ${product.condition}</div>` : ''}
                <div class="product-actions">
                    ${product.contactNumber ? `<a href="https://wa.me/${product.contactNumber}" class="whatsapp-btn" target="_blank">
                        <i class="fab fa-whatsapp"></i> Contact Seller
                    </a>` : ''}
                </div>
            </div>
        </div>
    `;
}

// Initialize page
function initializePage() {
    fetchAndRenderProducts('newProducts');
    fetchAndRenderProducts('bookRentals');
    fetchAndRenderProducts('resellItems');

    // Section click handlers (unchanged)
    const sections = document.querySelectorAll('.section-container');
    sections.forEach(section => {
        section.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.closest('button') || e.target.closest('a')) {
                return;
            }
            const sectionId = section.id;
            let targetPage;
            switch(sectionId) {
                case 'our-products': targetPage = 'ourproduct'; break;
                case 'book-rentals': targetPage = 'bookrental'; break;
                case 'resell': targetPage = 'resell'; break;
            }
            if (targetPage) window.location.href = targetPage;
        });
    });
}

document.addEventListener('DOMContentLoaded', initializePage);

// Add to cart functionality
function addToCart(productId) {
    alert('Product added to cart!');
    // Here you would typically add the product to a cart array or send to a backend
}

// Initialize tooltips
document.addEventListener('DOMContentLoaded', function() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

// Add toggle save functionality
function toggleSave(productId) {
    const saveBtn = document.querySelector(`[onclick="toggleSave('${productId}')"]`);
    const icon = saveBtn.querySelector('i');
    
    if (icon.classList.contains('far')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        icon.style.color = '#ff4d4d';
    } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
        icon.style.color = '';
    }
}

const mongoose = require('mongoose');

const ourProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('OurProduct', ourProductSchema);

const bookRentalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    author: String,
    description: String,
    price: { type: Number, required: true },
    category: String,
    imageUrl: { type: String, required: true },
    contactNumber: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BookRental', bookRentalSchema);

const jwt = require('jsonwebtoken');
const User = require('./backend/models/user');
app.use(async (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id);
        } catch (e) {
            req.user = null;
        }
    } else {
        req.user = null;
    }
    next();
});

router.get('/api/ourproduct', async (req, res) => {
    const products = await OurProduct.find();
    res.json(products);
});
router.get('/api/bookrental', async (req, res) => {
    const books = await BookRental.find();
    res.json(books);
});
router.get('/api/resell', async (req, res) => {
    const items = await Resell.find();
    res.json(items);
});