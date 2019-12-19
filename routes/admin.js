const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require('../models/user-model');

router.get('/', auth, async (req, res) => {
    const title = "Admin Page";
    const userName = req.user.name;
    const userList = await User.find();
    res.render('pages/admin', { title, userList, userName })
});

module.exports = router;
