const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require('../models/user-model');

router.get('/', auth, async (req, res) => {
    const title = "Admin Page";
    const userName = await User.findById(req.user.id).select("-password")
    const userList = await User.find();
    res.render('pages/admin', { title, userList, userName })
    res.send(userList)
});

module.exports = router;
