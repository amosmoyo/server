const GoogleStrategy = require("passport-google-oauth20").Strategy;

// local stragegy
const LocalStrategy = require('passport-local').Strategy;

const passport = require("passport");

const User = require("../models/User");

const bcrypt = require('bcryptjs')

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
      callbackURL: process.env.redirect_url,
      proxy: true
    },
    async (accessToken, refreshToken, profile, cb) => {
      const {
        sub:id,
        name, 
        picture: avatar, 
        email,
      } = profile._json

      const password = email + process.env.OOGLE_SECRET;

      const passHash = await bcrypt.hash(password, 12)

      const user = await User.findOne({googleId:id});

      if(user) {
        cb(null, user)
      } else {
        const newUser = new User({googleId:id, name, email, avatar, password: passHash});

        const saveUser =  await newUser.save();

        cb(null, saveUser)
      }
      // User.findOne({ googleId: profile.id })
      //   .then((existingUser) => {
      //     if (existingUser) {
      //       cb(null, existingUser);
      //     } else {
      //       new User({ googleId: profile.id })
      //         .save()
      //         .then((newUser) => cb(null, newUser));
      //     }
      //   })
      //   .catch((err) => console.log(err));
    }
  )
);


passport.use(
  new LocalStrategy(
    {usernameField: 'email'},

    async (username, password, done) => {

      const user = await User.findOne({email: username}).select('+password')

      if(!user) {
        return done(null, false)
      }

      const passwordOk = await bcrypt.compare(password, user.password)

      if(!passwordOk) {
        return done(null, false)
      } 

      done(null, user);
    }
  )
)
