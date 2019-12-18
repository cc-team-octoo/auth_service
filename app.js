const express = require("express");
const app = express();
const mongoose = require('mongoose');
const Joi = require("joi")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const bodyParser = require('body-parser');
const auth = require("./middleware/auth")
require('dotenv/config');
const User = require('./models/user-model')
// Set the default templating engine to ejs
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: false
}));
// Ustawienia dla plików statycznych (np. css)
app.use(express.static(__dirname + '/public'));

mongoose.connect(process.env.DB_CONNECTION, {
        useNewUrlParser: true
    }, )
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

app.get("/", (req, res) => {
    const title = "AUTH-APLICATION";
    res.render('pages/index', {
        title: title
    })
});

app.get('/login', (req, res) => {
    const title = "Log in";
    res.render('pages/login', {
        title: title
    });
});

app.get('/signup', (req, res) => {
    const title = "Sign up";
    res.render('pages/signup', {
        title: title
    });
});
app.get('/admin', auth, async (req, res) => {
    const title = "Sign up";
    const user = await User.findById(req.user.id).select("-password")
    const userList = await User.find();
    res.render('pages/admin', {
        title: title,
        userList: userList
    })
    res.send(userList)
});


app.post('/signup', async (req, res) => {
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

app.post('/login', async (req, res) => {
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

    const token = jwt.sign({
        _id: user.id
    }, config.get("jwtPrivateKey"));
    res.header("x-auth-token", token)
    const title = "Sign up";
    const userName = user.name;
    const userList = await User.find();
    res.render('pages/admin', {
        title: title,
        userList: userList,
        userName: userName || "Admin",
    }).send(token)

});

app.put("/user/:id", auth, (req, res) => {
    const condition = {
        id: req.params.id
    };

    User.update(condition, req.body)
        .then(doc => {
            if (!doc) {
                return res.status(404).end();
            }
            return res.status(200).json(doc);
        })
        .catch(err => next(err));
});

app.delete('user/:id', auth, async (req, res) => {
    const user = await User.findByIdAndRemove(req.params.id)
    if (!user) return res.status(404).send("Cannot find user")
    resres.send(user)
});
//PORT listening
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`auth_service app listening on port ${port}...`))