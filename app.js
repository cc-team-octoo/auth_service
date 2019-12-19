const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const auth = require('./middleware/auth');
const passportSetup = require('./config/passport-setup');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('dotenv/config');

const User = require('./models/user-model')

const main = require('./routes/main');
const login = require('./routes/login');
const logout = require('./routes/logout')
const signup = require('./routes/signup');
const admin = require('./routes/admin');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');


// set the default templating engine to ejs
app.set('view engine', 'ejs');

//set up body parser to read request's body
app.use(bodyParser.urlencoded({
    extended: false
}));

// set up for static files like css
app.use(express.static(__dirname + '/public'));

// cookie
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

//database connection
mongoose.connect(process.env.DB_CONNECTION, {
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useCreateIndex: true
    }, )
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

//use routes
app.use('/', main);
app.use('/login', login);
app.use('/logout', logout);
app.use('/signup', signup);
app.use('/admin', admin);
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);


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
    res.send(user)
});

//PORT listening
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`auth_service app listening on port ${port}...`))
