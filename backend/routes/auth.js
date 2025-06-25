const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const { body, validationResult } = require('express-validator');
const userModel = require('../models/user.js');
dotenv.config();
const secret = process.env.JWT_SECRET;
router.use(cookieParser());

// Registration validation
const validateRegistration = [
    body('email')
        .trim().notEmpty().withMessage('Email is required')
        .matches(/^[a-zA-Z0-9._%+-]+@mnit\.ac\.in$/)
        .withMessage('Must be a valid MNIT email address'),
    body('username')
        .trim().notEmpty().withMessage('Username is required')
        .isLength({ min: 3, max: 30 })
        .withMessage('Username must be between 3 and 30 characters'),
    body('password')
        .trim().notEmpty().withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    body('department')
        .trim().notEmpty().withMessage('Department is required')
        .isIn(['CSE', 'ECE', 'ME', 'CE', 'EE', 'IT', 'Others'])
        .withMessage('Invalid department'),
    body('year')
        .notEmpty().withMessage('Year is required')
        .isInt({ min: 2015, max: 2025 })
        .withMessage('Year must be between 2015 and 2025'),
];

// GET signup
router.get('/signup', (req, res) => {
    res.render('signup', { error: null, success: null });
});

// POST signup
router.post('/signup', validateRegistration, async (req, res) => {
    const { email, username, password, department, year } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('signup', { error: errors.array().map(err => err.msg).join(', '), success: null });
    }
    try {
        let user = await userModel.findOne({ $or: [{ email }, { username }] });
        if (user) {
            return res.render('signup', { error: 'Email or username already registered', success: null });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user = new userModel({
            email,
            username,
            password: hashedPassword,
            department,
            year
        });
        await user.save();
        return res.render('signup', { error: null, success: 'Registration successful! Please login.' });
    } catch (err) {
        return res.render('signup', { error: 'Error during signup. Try again.', success: null });
    }
});

// GET login
router.get('/login', (req, res) => res.render('login', { error: null, success: null }));

// POST login
router.post('/login', async (req, res) => {
    const { email, password, admin } = req.body;
    try {
        let user;
        if (admin) {
            user = await userModel.findOne({ email, role: 'admin' });
        } else {
            user = await userModel.findOne({ email });
        }
        if (!user) {
            console.log('User not found:', email);
            return res.render('login', { error: 'User not found', success: null });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Invalid password for:', email);
            return res.render('login', { error: 'Invalid password', success: null });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, secret, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        return res.redirect('/');
    } catch (err) {
        console.error('Login error:', err);
        return res.render('login', { error: 'Error during login. Try again.', success: null });
    }
});

// Logout
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

module.exports = router;