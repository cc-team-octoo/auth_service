const express = require("express");
const router = express.Router();
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("config");
const User = require('../models/user-model');

router.get('/', (req, res) => {
    const title = "Log in";
    res.render('pages/login', { title });
});

router.post('/', async (req, res) => {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        password: Joi.string().min(6).max(100).required(),
    }
    const result = Joi.validate(req.body, schema);
    if (result.error) {
        return res.status(400).send(result.error.details[0].message)
    };
    let user = await User.findOne({
        name: req.body.name
    })
    if (!user) {
        return res.status(400).send("invalid user Nameeee or password")
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) {
        return res.status(400).send("invalid user Name or passworddddd")
    }

    //generate token
    const token = jwt.sign({
        _id: user.id,
        name: user.name
    }, config.get("jwtPrivateKey"));

    //send token in cookies
    res.cookie('token', token, {
        expires: new Date(Date.now() + 300000),
        secure: false, // set to true if your using https
        httpOnly: true,
    }).redirect('/admin')
});

module.exports = router;
