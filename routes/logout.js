const router = require('express').Router();

// auth logout
router.get('/', (req, res) => {
    // handle with passport
    req.logout();
    res.redirect('/');
});

module.exports = router;
