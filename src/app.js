const express = require('express')
const app = express()

const mongoose = require('mongoose');

// Set the default templating engine to ejs
app.set('view engine', 'ejs');

// Ustawienia dla plików statycznych (np. css)
app.use(express.static(__dirname + '/public'));

mongoose.connect('mongodb+srv://cc-team-octoo:kJHJ8%21iJJhj@cluster0-fxhbq.azure.mongodb.net/test?retryWrites=true&w=majority')                
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));


app.get('/', (req, res) => res.send('Hello World!'))

app.get('/logowanie', (req, res) => {
    const title = "Logowanie";
    res.render('pages/login', {title: title});
});

app.get('/rejestracja', (req, res) => {
    const title = "Rejestracja";
    res.render('pages/signup', {title: title});
});

//PORT listening
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`auth_service app listening on port ${port}...`))
