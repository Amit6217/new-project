// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Render initial items
    renderFilteredItems();

    // Add event listeners for filters
    document.getElementById('searchInput').addEventListener('input', renderFilteredItems);
    document.getElementById('sortSelect').addEventListener('change', renderFilteredItems);
    document.getElementById('conditionSelect').addEventListener('change', renderFilteredItems);
});

// Function to filter and sort items
function renderFilteredItems() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const sortValue = document.getElementById('sortSelect').value;
    const conditionValue = document.getElementById('conditionSelect').value;

    // Filter items
    let filteredItems = products.resellItems.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm) ||
                            item.description.toLowerCase().includes(searchTerm);
        const matchesCondition = conditionValue === 'all' || item.condition === conditionValue;
        return matchesSearch && matchesCondition;
    });

    // Sort items
    filteredItems.sort((a, b) => {
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

    // Render items
    const container = document.getElementById('itemsContainer');
    container.innerHTML = '';

    if (filteredItems.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center">
                <p class="no-results">No items found matching your criteria.</p>
            </div>
        `;
        return;
    }

    filteredItems.forEach(item => {
        container.innerHTML += createProductCard(item);
    });
}

// Function to handle save button clicks
function toggleSave(itemId) {
    const saveBtn = document.querySelector(`[onclick="toggleSave('${itemId}')"]`);
    const icon = saveBtn.querySelector('i');
    
    if (icon.classList.contains('far')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        icon.style.color = '#ff4444';
        // Here you would typically save the item to user's favorites
    } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
        icon.style.color = '';
        // Here you would typically remove the item from user's favorites
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