const User = require("../models/User");

const bcrypt = require("bcryptjs");

const Token = require("../models/token");

const sendEmail = require("../utils/sendEmail");

const crypto = require("crypto");

const jwt = require("jsonwebtoken");

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

    // const saveUser = await newUser.save();

    // let token = await new Token({
    //     userId: saveUser._id,
    //     token: crypto.randomBytes(32).toString("hex"),
    // }).save();

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

const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "5m",
  });
};
