const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../config/cloudinary'); // Make sure this file exists and is configured
const upload = multer({ storage });

const Resell = require('../models/resell'); // Make sure this file exists and exports the model

// Middleware to check if user is logged in
function isLoggedIn(req, res, next) {
    if (req.user) return next();
    res.status(401).send('Unauthorized');
}

router.get('/', (req, res) => {
    res.render('marketplace', { isAuthenticated: req.isAuthenticated, user: req.user || null });
});

router.get('/ourproduct', (req, res) => res.render('ourproduct'));
router.get('/bookrental', (req, res) => res.render('bookrental'));
router.get('/resell', (req, res) => res.render('resell'));

// Add resell item (anyone)
router.post('/resell', isLoggedIn, upload.array('images', 4), async (req, res) => {
    const { name, description, price, category, condition, contactNumber } = req.body;
    const imageUrls = req.files.map(f => f.path);
    await Resell.create({ name, description, price, category, condition, imageUrls, contactNumber, createdBy: req.user._id });
    res.redirect('/marketplace/resell');
});

module.exports = router;
