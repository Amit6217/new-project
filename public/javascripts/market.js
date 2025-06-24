// Product data objects
const products = {
    newProducts: [
        {
            id: 'np1',
            name: 'Premium Headphones',
            description: 'High-quality wireless headphones with noise cancellation.',
            price: 199.99,
            phone: '+916203514291',
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            category: 'ourProducts'
        },
        {
            id: 'np2',
            name: 'Smart Watch',
            description: 'Feature-rich smartwatch with health monitoring.',
            price: 299.99,
            phone: '+916203514291',
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            category: 'ourProducts'
        },
        {
            id: 'np3',
            name: 'Wireless Earbuds',
            description: 'True wireless earbuds with premium sound quality.',
            price: 149.99,
            phone: '+916203514291',
            image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            category: 'ourProducts'
        }

    ],
    bookRentals: [
        {
            id: 'br1',
            name: 'The Great Gatsby',
            description: 'Classic novel by F. Scott Fitzgerald',
            price: 5.99,
            phone: '+916203514291',
            image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            category: 'bookRentals',
            rentalPeriod: 'month'
        },
        {
            id: 'br2',
            name: 'To Kill a Mockingbird',
            description: 'Harper Lee\'s masterpiece',
            price: 4.99,
            phone: '+916203514291',
            image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            category: 'bookRentals',
            rentalPeriod: 'month'
        },
        {
            id: 'br3',
            name: '1984',
            description: 'George Orwell\'s dystopian classic',
            price: 6.99,
            phone: '+916203514291',
            image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            category: 'bookRentals',
            rentalPeriod: 'month'
        }
    ],
    resellItems: [
        {
            id: 'ri1',
            name: 'Used Laptop',
            description: 'MacBook Pro 2019, Excellent Condition',
            price: 899.99,
            phone: '+916203514291',
            image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            category: 'resellItems',
            condition: 'Excellent'
        },
        {
            id: 'ri2',
            name: 'Gaming Console',
            description: 'PlayStation 4 Pro, Like New',
            price: 299.99,
            phone: '+916203514291',
            image: 'https://images.unsplash.com/photo-1486401899868-0e435ed85128?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            category: 'resellItems',
            condition: 'Like New'
        },
        {
            id: 'ri3',
            name: 'Smartphone',
            description: 'iPhone 12, Good Condition',
            price: 499.99,
            phone: '+916203514291',
            image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            category: 'resellItems',
            condition: 'Good'
        }
    ]
};

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

// Function to create product card HTML
function createProductCard(product) {
    const isRental = product.category === 'bookRentals';
    const priceDisplay = isRental ? 
        `₹${product.price}/${product.rentalPeriod}` : 
        `₹${product.price}`;
    
    const categoryDisplay = product.category === 'ourProducts' ? 'our Product' :
                          product.category === 'bookRentals' ? 'Book Rental' :
                          'Resell Item';

    return `
        <div class="product-card" data-aos="fade-up">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <span class="category-badge">${categoryDisplay}</span>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="description">${product.description}</p>
                <div class="price">${priceDisplay}</div>
                ${product.condition ? `<div class="condition">Condition: ${product.condition}</div>` : ''}
                <div class="product-actions">
                    <a href="https://wa.me/${product.phone}" class="whatsapp-btn" target="_blank">
                        <i class="fab fa-whatsapp"></i> Contact Seller
                    </a>
                    <button class="save-btn" onclick="toggleSave('${product.id}')">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Function to render products by category
function renderProducts(category) {
    // Map category names to section IDs
    const sectionMap = {
        'newProducts': 'our-products',
        'bookRentals': 'book-rentals',
        'resellItems': 'resell'
    };
    
    const sectionId = sectionMap[category];
    const container = document.querySelector(`#${sectionId} .row`);
    if (!container) {
        console.error(`Container not found for category: ${category} (section: ${sectionId})`);
        return;
    }

    // Sort products by price
    const sortedProducts = [...products[category]].sort((a, b) => a.price - b.price);
    
    // Clear existing content
    container.innerHTML = '';
    
    // Add only first 4 products for home page
    const productsToShow = sortedProducts.slice(0, 3);
    
    // Add sorted products
    productsToShow.forEach(product => {
        container.innerHTML += createProductCard(product);
    });
}

// Function to initialize the page
function initializePage() {
    // Render each category
    renderProducts('newProducts');
    renderProducts('bookRentals');
    renderProducts('resellItems');

    // Add click handlers to sections
    const sections = document.querySelectorAll('.section-container');
    sections.forEach(section => {
        section.addEventListener('click', (e) => {
            // Don't trigger if clicking on a button or link
            if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.closest('button') || e.target.closest('a')) {
                return;
            }
            
            const sectionId = section.id;
            let targetPage;
            
            switch(sectionId) {
                case 'our-products':
                    targetPage = 'ourproduct';
                    break;
                case 'book-rentals':
                    targetPage = 'bookrental';
                    break;
                case 'resell':
                    targetPage = 'resell';
                    break;
            }
            
            if (targetPage) {
                window.location.href = targetPage;
            }
        });
    });
}

// Initialize when DOM is loaded
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