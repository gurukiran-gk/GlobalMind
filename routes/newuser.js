const express = require("express");
const Router = express.Router();
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const User = require("../models/usermodels");
const { check, validationResult } = require('express-validator');


app.use(bodyParser.urlencoded({ extended: true }));
const repass = "*Please Check Your Password and Re-entered Password"

const emailValidationMiddleware = [
  check('email').isEmail().withMessage('*Invalid email format'),
  check('email').custom(async (value) => {
    const user = await User.findOne({ email: value });
    if (user) {
      throw new Error('*Email already in use');
    }
    return true;
  }),
];

Router.post('/signup',emailValidationMiddleware, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg).join(', ');
    res.redirect(`/signup.html?error=${encodeURIComponent(errorMessages)}`);

  }
  else
  {
    const { name, email, password, phone, rpassword } = req.body;

    try {
      if (password === rpassword)
      {
      const newUser = new User({ name, email, password, phone });
      await newUser.save();

      const loginPagePath = path.join(__dirname, '../public/login.html');
      res.sendFile(loginPagePath);
      }
      else{
        res.redirect(`/signup.html?error=${encodeURIComponent(repass)}`);
      }
    } 
    catch (err) {
      console.error("Error during registration:", err);
      res.render('signup', { error: 'Registration failed' });
    }
  }
});

module.exports = Router;



