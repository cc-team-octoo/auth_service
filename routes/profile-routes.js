const router = require('express').Router();
const User = require('../models/user-model');

const authCheck = (req, res, next) => {
    if(!req.user) {
        // if user is not logged in
        res.redirect('/auth/login');
    } else {
        // if logged in
        next();
    }
};

router.get('/', authCheck, async (req, res) => {
    const title = "Your profile";
    const user = await User.findById(req.user.id)
    res.render('pages/profile', {title: title});
    res.send(user)
});



module.exports = router;
