const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'marketplace',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

const resellSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    category: String,
    condition: String,
    imageUrls: [String],
    contactNumber: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resell', resellSchema);
module.exports = { cloudinary, storage };

const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const upload = multer({ storage });

const OurProduct = require('../models/our-products');
const BookRental = require('../models/book-rental');
const Resell = require('../models/resell');
const User = require('../models/user');

// Middleware to check admin
function isAdmin(req, res, next) {
    if (req.user && req.user.role === 'admin') return next();
    return res.status(403).send('Forbidden');
}

// Middleware to check logged in
function isLoggedIn(req, res, next) {
    if (req.user) return next();
    return res.status(401).send('Unauthorized');
}

// --- OUR PRODUCTS ---
// List all products
router.get('/ourproduct', async (req, res) => {
    const products = await OurProduct.find();
    res.render('ourproduct', { products, isAdmin: req.user && req.user.role === 'admin' });
});

// Admin: Add product
router.post('/ourproduct', isAdmin, upload.single('image'), async (req, res) => {
    const { name, description, price } = req.body;
    const imageUrl = req.file.path;
    await OurProduct.create({ name, description, price, imageUrl, createdBy: req.user._id });
    res.redirect('/marketplace/ourproduct');
});

// Admin: Remove product
router.post('/ourproduct/:id/delete', isAdmin, async (req, res) => {
    await OurProduct.findByIdAndDelete(req.params.id);
    res.redirect('/marketplace/ourproduct');
});

// --- BOOK RENTALS ---
// List all rentals
router.get('/bookrental', async (req, res) => {
    const books = await BookRental.find();
    res.render('bookrental', { books, userId: req.user ? req.user._id : null, isAdmin: req.user && req.user.role === 'admin' });
});

// Add rental (anyone)
router.post('/bookrental', isLoggedIn, upload.single('image'), async (req, res) => {
    const { name, author, description, price, category, contactNumber } = req.body;
    const imageUrl = req.file.path;
    await BookRental.create({ name, author, description, price, category, imageUrl, contactNumber, createdBy: req.user._id });
    res.redirect('/marketplace/bookrental');
});

// Remove rental (owner or admin)
router.post('/bookrental/:id/delete', isLoggedIn, async (req, res) => {
    const book = await BookRental.findById(req.params.id);
    if (book.createdBy.equals(req.user._id) || req.user.role === 'admin') {
        await book.deleteOne();
        return res.redirect('/marketplace/bookrental');
    }
    res.status(403).send('Forbidden');
});

// --- RESELL ---
// List all resell items
router.get('/resell', async (req, res) => {
    const items = await Resell.find();
    res.render('resell', { items, userId: req.user ? req.user._id : null, isAdmin: req.user && req.user.role === 'admin' });
});

// Add resell item (anyone)
router.post('/resell', isLoggedIn, upload.array('images', 4), async (req, res) => {
    const { name, description, price, category, condition, contactNumber } = req.body;
    const imageUrls = req.files.map(f => f.path);
    await Resell.create({ name, description, price, category, condition, imageUrls, contactNumber, createdBy: req.user._id });
    res.redirect('/marketplace/resell');
});

// Remove resell item (owner or admin)
router.post('/resell/:id/delete', isLoggedIn, async (req, res) => {
    const item = await Resell.findById(req.params.id);
    if (item.createdBy.equals(req.user._id) || req.user.role === 'admin') {
        await item.deleteOne();
        return res.redirect('/marketplace/resell');
    }
    res.status(403).send('Forbidden');
});

module.exports = router;

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