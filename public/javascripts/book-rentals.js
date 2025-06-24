// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Render initial books
    renderFilteredBooks();

    // Add event listeners for filters
    document.getElementById('searchInput').addEventListener('input', renderFilteredBooks);
    document.getElementById('sortSelect').addEventListener('change', renderFilteredBooks);
    document.getElementById('categorySelect').addEventListener('change', renderFilteredBooks);
});

// Function to filter and sort books
function renderFilteredBooks() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const sortValue = document.getElementById('sortSelect').value;
    const categoryValue = document.getElementById('categorySelect').value;

    // Filter books
    let filteredBooks = products.bookRentals.filter(book => {
        const matchesSearch = book.name.toLowerCase().includes(searchTerm) ||
                            book.description.toLowerCase().includes(searchTerm);
        const matchesCategory = categoryValue === 'all' || book.category === categoryValue;
        return matchesSearch && matchesCategory;
    });

    // Sort books
    filteredBooks.sort((a, b) => {
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

    // Render books
    const container = document.getElementById('booksContainer');
    container.innerHTML = '';

    if (filteredBooks.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center">
                <p class="no-results">No books found matching your criteria.</p>
            </div>
        `;
        return;
    }

    filteredBooks.forEach(book => {
        container.innerHTML += createProductCard(book);
    });
}

// Function to handle save button clicks
function toggleSave(bookId) {
    const saveBtn = document.querySelector(`[onclick="toggleSave('${bookId}')"]`);
    const icon = saveBtn.querySelector('i');
    
    if (icon.classList.contains('far')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        icon.style.color = '#ff4444';
        // Here you would typically save the book to user's favorites
    } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
        icon.style.color = '';
        // Here you would typically remove the book from user's favorites
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

// Function to handle rent form submission
// function submitRentForm() {
//     const form = document.getElementById('rentBookForm');
//     if (!form.checkValidity()) {
//         form.reportValidity();
//         return;
//     }

//     const newBook = {
//         id: 'br' + (products.bookRentals.length + 1),
//         name: document.getElementById('bookName').value,
//         author: document.getElementById('bookAuthor').value,
//         description: document.getElementById('bookDescription').value,
//         price: parseFloat(document.getElementById('bookPrice').value),
//         category: document.getElementById('bookCategory').value,
//         image: 'https://via.placeholder.com/300x200', // Placeholder image
//         seller: 'Current User', // This would be replaced with actual user info
//         rentalPeriod: '1 month' // Default rental period
//     };

//     // Add the new book to the products array
//     products.bookRentals.push(newBook);

//     // Close the modal
//     const modal = bootstrap.Modal.getInstance(document.getElementById('rentBookModal'));
//     modal.hide();

//     // Reset the form
//     form.reset();

//     // Refresh the books display
//     renderFilteredBooks();

//     // Show success message
//     alert('Book listed successfully!');
// } 