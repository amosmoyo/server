const GoogleStrategy = require("passport-google-oauth20").Strategy;

const passport = require("passport");

const User = require("../models/User");

passport.serializeUser((user, cb) => {
    cb(null, user.id)
})

passport.deserializeUser((id, cb) => {
  User.findOne({_id: id}).then((user) => {
      cb(null, user)
  })
})

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.client_url,
      proxy: true
    },
    (accessToken, refreshToken, profile, cb) => {
      User.findOne({ googleId: profile.id })
        .then((existingUser) => {
          if (existingUser) {
            cb(null, existingUser);
          } else {
            new User({ googleId: profile.id })
              .save()
              .then((newUser) => cb(null, newUser));
          }
        })
        .catch((err) => console.log(err));
    }
  )
);
