const express = require('express');
const app = express();
const passport = require('passport');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');

const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const keys = require('./config/keys');

mongoose.connect(keys.mongodb.uri, () => {
    console.log('connected to Mongodb')
});

app.use(cookieSession({
    maxAge: 24 *60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

app.get('/', (req,res) => {
    res.render('home', {user: req.user}); 
});

app.listen(3000, () => {
    console.log('Welcome To My Server');
});