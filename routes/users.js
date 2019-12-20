const express = require("express");
const router = express.Router();
const Joi = require("joi");
const auth = require('../middleware/auth');

const User = require('../models/user-model');


router.put("/:id", auth, async (req, res) => {
    const schema = { name: Joi.string().min(5).max(50).required() };
    const result = Joi.validate(req.body, schema);
    if (result.error) {
        return res.status(400).send(result.error.details[0].message)
    };
    const user = await User.findByIdAndUpdate(req.params.id, 
        { name: req.body.name }, 
        { new: true }
    );
    if (!user) return res.status(404).send("Cannot find user");
    res.redirect("/admin");
});

router.delete('/:id', auth, async (req, res) => {
    const user = await User.findByIdAndRemove(req.params.id);
    if (!user) return res.status(404).send("Cannot find user");
    res.redirect("/admin");
});

module.exports = router;
