const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        // options for the google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL:'/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        // passport callback functiong
        User.findOne({googleId: profile.id}).then((currentUser) => {
            if(currentUser)
            {
                // already exist
                console.log('is already exist', currentUser);
                done(null, currentUser);
            }
            else
            {
                // this is a new user
                new User({
                    googleId: profile.id,
                    username: profile.displayName,
                    email: profile.emails[0].value,
                    picture: profile.photos[0].value
                }).save()
                .then((newUser) => {
                    console.log('New user save', newUser);
                    done(null, newUser);
                });
            }

        })


    })
);