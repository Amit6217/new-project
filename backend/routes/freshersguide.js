const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('freshersGuide', {  isAuthenticated: req.isAuthenticated, user: req.user || null });
});



module.exports = router;