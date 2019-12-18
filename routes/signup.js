const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require('../models/user-model');


router.get('/', (req, res) => {
    const title = "Sign up";
    res.render('pages/signup', { title });
});

router.post('/', async (req, res) => {
    console.log(req.body)
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        password: Joi.string().min(6).max(100).required(),
        password_confirm: Joi.string().min(6).max(100).required(),
    }
    const result = Joi.validate(req.body, schema);
    if (result.error) {
        return res.status(400).send(result.error.details[0].message)
    };
    if (req.body.password !== req.body.password_confirm) {
        return res.status(400).send("Password must be the same.")
    }
    let user = await User.findOne({
        name: req.body.name
    })
    if (user) {
        return res.status(400).send("User name taken please choose another")
    }
    user = new User({
        name: req.body.name,
        password: req.body.password,
    });
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    user = await user.save()
    const token = jwt.sign({
        _id: user.id
    }, config.get("jwtPrivateKey"));
    res.header("x-auth-token", token).send(user)
    console.log(res)
});

module.exports = router;
