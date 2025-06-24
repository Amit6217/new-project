const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');
const { connectDB } = require('./backend/config/db.js');

dotenv.config();
const PORT = process.env.PORT || 3000;
connectDB();



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















app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


