const fs = require("fs");

const User = require("../models/User");

const bcrypt = require("bcryptjs");

const Token = require("../models/token");

const passport = require("passport");

const sendEmail = require("../utils/sendEmail");

const crypto = require("crypto");

const jwt = require("jsonwebtoken");

const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// @desc Register user
// @access Public
// @route /api/v1/auth/register
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "email or password is missing",
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "The user exist, login!" });
    }

    const hashpass = await bcrypt.hash(password, 12);

    const newUser = { name, email, password: hashpass };

    const activation_token = createActivationToken(newUser);

    const url = `${process.env.client_url}/user/auth/activation/${activation_token}`;

    sendEmail(email, url, "Verify your email address");

    res.json({
      message:
        "You have successfully register, go to Email and verify your address",
      status: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// @desc Activation email
// @access Public
// @route /api/v1/auth/activation
exports.activateEmail = async (req, res, next) => {
  try {
    const { activation_token } = req.body;

    const user = jwt.verify(
      activation_token,
      process.env.ACTIVATION_TOKEN_SECRET
    );

    const { email, name, password } = user;

    const check = await User.findOne({ email });

    if (check == null || check == undefined || !check) {
      const exist = await User.findOne({ email });

      if (exist) {
        return res.json({
          message: "You account has been activated, LOGIN! to access dashboard",
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });

        await newUser.save();

        res.json({
          message: "You account has been activated, LOGIN! to access dashboard",
        });
      }
    } else {
      return res.status(400).json({
        message: "The user all ready exist, LOGIN!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// @desc Login
// @access Public
// @route /api/v1/auth/login
exports.login = async (req, res, next) => {
  try {
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;

      if (!user) {
        return res.status(401).json({
          message: "Invalid credentialss",
        });
      } else {
        req.logIn(user, (err) => {
          if (err) throw err;

          res.json({ message: "Successfully Authenticated" });

          // res.redirect('/account')
        });
      }
    })(req, res, next);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// @desc Forget password
// @access Public
// @route /api/v1/auth/forgot_password
exports.forgetpassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "The user does not exist, signup",
      });
    }

    const access_token = createAccessToken({ id: user._id });

    const url = `${process.env.client_url}/user/reset/${access_token}`;

    sendEmail(email, url, "Reset your password");

    res.json({
      status: true,
      message:
        "Please check your email, a link has been sent to reset your password",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// @desc Reset password
// @access Publice
// @route /api/v1/auth/resetpassword
exports.resetPassword = async (req, res, next) => {
  try {
    const { password, token } = req.body;

    const passwordHash = await bcrypt.hash(password, 12);

    const user = jwt.verify(token, process.env.ACCESS_TOKEN);

    await User.findOneAndUpdate(
      { _id: user.id },
      {
        password: passwordHash,
      }
    );

    res.json({ message: "Password successfully changed, Login!" });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.uploadFile = async (req, res, next) => {
  try {
    const { file } = req.files;

    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      {
        folder: "emaily/profile",
        width: 150,
        height: 150,
        crop: "fill",
      },
      async (err, result) => {
        if (err) {
          console.log(err);
          throw err;
        }

        removeTmp(file.tempFilePath);

        const {email} = req.user;

        const user = await User.findOneAndUpdate({email}, {$set: {avatar: result.secure_url} }, {new: true})

        res.json({
          user
        });
      }
    );
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// @desc Update user
// @access Private
// @route /api/v1/auth/updateuser
exports.updateUser = async (req, res) => {
  try {
    const {name} = req.body;

    const {email} = req.user;

    if(!email) {
      return res.status(401).json({
        message: "Not authenticated"
      })
    }

    const user = await User.findOneAndUpdate({email}, {$set: {name:name} }, {new: true})

    res.json({
      user
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

// Activation token
const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "5m",
  });
};

// Create an access token
const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN, {
    expiresIn: "15m",
  });
};

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
