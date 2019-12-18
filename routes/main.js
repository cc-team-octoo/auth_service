const express = require("express");
const router = express.Router();


router.get("/", (req, res) => {
    const title = "AUTH-APLICATION";
    res.render('pages/index', { title })
});

module.exports = router;