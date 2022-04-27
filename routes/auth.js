const express = require('express');

const passport = require('passport');

const router = express.Router();

router.route('/google').get( passport.authenticate('google', {
    scope:['profile', 'email']
}))

router.route('/google/callback').get(passport.authenticate('google'))

router.route('/profile').get((req, res) => {
    console.log(req.session)
    res.json(req.user)
})

router.route('/logout').get((req, res) => {
    req.logOut();

    res.json({message: 'You have logout'});
})

module.exports = router