const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const UserModel = require('./backend/models/user.js');
const { connectDB } = require('./backend/config/db.js');
const marketplaceRoutes = require('./backend/routes/marketplace.js');
const libraryRoutes = require('./backend/routes/library.js');
const freshersGuideRoutes = require('./backend/routes/freshersGuide.js');
const authRoutes = require('./backend/routes/auth.js');

// Load environment variables
dotenv.config();
const PORT = process.env.PORT || 3000;
const secret = process.env.JWT_SECRET;
connectDB();

app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// JWT middleware
app.use(async (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await UserModel.findById(decoded.id);
            req.isAuthenticated = true;
        } catch (e) {
            req.user = null;
            req.isAuthenticated = false; 
        }
    } else {
        req.user = null;
        req.isAuthenticated = false; 
    }
    next();
});

// Middleware to check authentication
const isAuthenticated = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('/login');
    }
    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    } catch (err) {
        return res.redirect('/login');
    }
}

app.use('/', authRoutes);
app.get('/', (req, res) => {
    res.render('home', { isAuthenticated: req.isAuthenticated, user: req.user || null });
});

// Protected routes
app.use('/marketplace', isAuthenticated, marketplaceRoutes);
app.use('/library', isAuthenticated, libraryRoutes);
app.use('/freshersguide', isAuthenticated, freshersGuideRoutes);

// error handling
app.use((req, res) => {
    res.status(404).render('error', { err: { message: 'Page not found' } });
});

// Error handling middleware
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Something went wrong!';
    res.status(statusCode).render('error', { err });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


