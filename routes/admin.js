const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require('../models/user-model');

router.get('/', auth, async (req, res) => {
    const title = "Admin Page";
    const userName = req.user.name;
    const userId = req.user.id;
    const userList = await User.find();
    console.log(userName, userId)
    res.render('pages/admin', { title, userList, userName, userId })
});

module.exports = router;
