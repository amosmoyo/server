const express = require("express");

const passport = require("passport");

const router = express.Router();

const {register, activateEmail} = require('../controllers/authController')

router.route("/google").get(
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router
  .route("/google/callback")
  .get(passport.authenticate("google"), (req, res) => {
    res.redirect("/account");
  });

router.route("/profile").get((req, res) => {
  res.json(req.user);
});

router.route("/login").post(
    // passport.authenticate('local', { failureRedirect: '/' }),
    // function(req, res) {
    //     console.log(req.user)
    //   res.redirect('/account');
    // }
(req, res, next) => {
  try {
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;

      if (!user) {
          return res.status(401).json({
              message: 'Invalid credentialss'
          })
      } else {
        req.logIn(user, (err) => {
          if (err) throw err;

          res.json({message: "Successfully Authenticated"});

          // res.redirect('/account')
        });
      }
    })(req, res, next);
  } catch (error) {
      return res.status(500).json({
          message: error.message
      })
  }
});

router.route('/register').post(register)

router.route("/activation").post(activateEmail);

router.route("/logout").get((req, res) => {
  req.logOut();
  res.json({ message: "You have logout" });
});

module.exports = router;
