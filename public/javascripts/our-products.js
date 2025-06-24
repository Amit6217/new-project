// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Render initial products
    renderFilteredProducts();

    // Add event listeners for filters
    document.getElementById('searchInput').addEventListener('input', renderFilteredProducts);
    document.getElementById('sortSelect').addEventListener('change', renderFilteredProducts);
    document.getElementById('categorySelect').addEventListener('change', renderFilteredProducts);
});

// Function to filter and sort products
function renderFilteredProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const sortValue = document.getElementById('sortSelect').value;
    const categoryValue = document.getElementById('categorySelect').value;

    // Filter products
    let filteredProducts = products.newProducts.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                            product.description.toLowerCase().includes(searchTerm);
        const matchesCategory = categoryValue === 'all' || product.category === categoryValue;
        return matchesSearch && matchesCategory;
    });

    // Sort products
    filteredProducts.sort((a, b) => {
        switch(sortValue) {
            case 'price-asc':
                return a.price - b.price;
            case 'price-desc':
                return b.price - a.price;
            case 'name-asc':
                return a.name.localeCompare(b.name);
            case 'name-desc':
                return b.name.localeCompare(a.name);
            default:
                return 0;
        }
    });

    // Render products
    const container = document.getElementById('productsContainer');
    container.innerHTML = '';

    if (filteredProducts.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center">
                <p class="no-results">No products found matching your criteria.</p>
            </div>
        `;
        return;
    }

    filteredProducts.forEach(product => {
        container.innerHTML += createProductCard(product);
    });
}

// Function to handle save button clicks
function toggleSave(productId) {
    const saveBtn = document.querySelector(`[onclick="toggleSave('${productId}')"]`);
    const icon = saveBtn.querySelector('i');
    
    if (icon.classList.contains('far')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        icon.style.color = '#ff4444';
        // Here you would typically save the product to user's favorites
    } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
        icon.style.color = '';
        // Here you would typically remove the product from user's favorites
    }
}

// Add smooth scrolling for navigation
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