const express = require("express");

const passport = require("passport");

const multer = require('multer');

const router = express.Router();

const path = require('path')

const {register, activateEmail, forgetpassword, resetPassword, login, uploadFile, updateUser} = require('../controllers/authController');

const {avatarUploadMiddleware} = require('../middleware/fileupload')

const ensureAuthenticated = async (req, res, next) => {
  if (req.isAuthenticated() ) {
    return next()
  } else { 
      res.status(401).json({
        message: 'Not authenticated'
      })
  }
}

// upload files
// const storage = multer.diskStorage({
//   destination: function(req, file,cb){
//     cb(null, 'profile/')
//   },
//   filename: function(req, file, cb) {
//     cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
//   }
// })

// const checkFiletype = (file, cb) => {
//   const types = /jpg|jpeg|webp|png/
//   const extname = types.test(path.extname(file.originalname).toLowerCase());
//   const mimeType = types.test(file.mimetype);

//   if(extname && mimeType) {
//       return cb(null, true)
//   } else {
//       cb({message: 'unsupported file format'}, false);
//   }
// }

// const upload = multer({
//   storage,
//   fileFilter: function(req, file, cb) {
//       checkFiletype(file, cb)
//   },
//   limits: {fileSize: 1024 * 1024 * 3}
// })

// passport oriented route
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

router.route("/login").post(login);

router.route('/register').post(register)

router.route("/activation").post(activateEmail);

router.route("/forgot_password").post(forgetpassword);

router.route("/resetpassword").post(resetPassword);

router.route('/upload').patch(ensureAuthenticated, avatarUploadMiddleware, uploadFile);

router.route('/updateuser').patch(ensureAuthenticated, updateUser)

router.route("/logout").get((req, res) => {
  req.logOut();
  res.json({ message: "You have logout" });
});

module.exports = router;
