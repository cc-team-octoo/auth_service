const express = require("express");
const router = express.Router();
//const passport = require('passport');

router.get("/", (req, res) => {
    const title = "AUTH-APLICATION";
    res.render('pages/index', { title })
});


module.exports = router;
