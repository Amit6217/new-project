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
dotenv.config();
const PORT = process.env.PORT || 3000;
const secret = process.env.JWT_SECRET;
connectDB();

app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/marketplace', (req, res) => {
    res.render('marketplace');
});

app.get('/library', (req, res) => {
    res.render('library');
});


app.get('/freshersguide', (req, res) => {
    res.render('freshersguide');
});

app.get('/clubs', (req, res) => {
    res.render('clubs');
});

app.get('/ourproduct', (req, res) => {
    res.render('ourproduct');
});

app.get('/bookrental', (req, res) => {
    res.render('bookrental');
});

app.get('/resell', (req, res) => {
    res.render('resell');
});

app.get('/login', (req, res) => {
    res.render('login', { error: null });
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.render('login', { error: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.render('login', { error: 'Invalid password' });
        }
        const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1d' });
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/');
    } catch (err) {
        res.render('login', { error: 'Error during login. Try again.' });
    }
});

app.get('/signup', (req, res) => {
    res.render('signup', { error: null, success: null });
});

app.post('/signup', async (req, res) => {
    const { email, username, password, department, year } = req.body;
    try {
        let user = await UserModel.findOne({ $or: [{ email }, { username }] });
        if (user) {
            return res.render('signup', { error: 'User already exists', success: null });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user = new UserModel({
            email,
            username,
            password: hashedPassword,
            department,
            year
        });
        await user.save();
        res.render('signup', { error: null, success: 'Registration successful! Please login.' });
        res.redirect('/login');
    } catch (err) {
        res.render('signup', { error: 'Error during signup. Try again.', success: null });
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


