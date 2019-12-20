const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require('../models/user-model');


router.get('/', auth, async (req, res) => {
    const token = req.cookies.token || '';
    const title = "Admin Page";
    const userName = req.user.name;
    const userId = req.user.id;
    const userList = await User.find();

    res.cookie('token', token, {
        expires: new Date(Date.now() + 300000),
        secure: false, // set to true if your using https
        httpOnly: true,
    }).render('pages/admin', { title, userList, userName, userId })
});

module.exports = router;
