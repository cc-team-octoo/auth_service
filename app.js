const express = require("express");
const app = express();
const mongoose = require('mongoose');
// require('dotenv/config');

// Set the default templating engine to ejs
app.set('view engine', 'ejs');

// Ustawienia dla plików statycznych (np. css)
app.use(express.static(__dirname + '/public'));

// mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, )                
//     .then(() => console.log('Connected to MongoDB...'))
//     .catch(err => console.error('Could not connect to MongoDB...', err));

app.get("/", (req, res) => {
    const title = "AUTH-APLICATION";
    res.render('pages/index', {title: title})
});

app.get('/login', (req, res) => {
    const title = "Log in";
    res.render('pages/login', {title: title});
});

app.get('/signup', (req, res) => {
    const title = "Sign up";
    res.render('pages/signup', {title: title});
});

//PORT listening
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`auth_service app listening on port ${port}...`))
