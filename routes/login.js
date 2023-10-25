const express = require('express');
const Router = express.Router();
const app = express();
const User = require('../models/usermodels'); 
const bodyParser = require("body-parser");
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));

Router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try 
  {
    const user = await User.findOne({ email });

    if (!user) {
        return res.redirect(`/login.html?error=${encodeURIComponent('*User not found')}`);
    }

    
    if (password !== user.password ) {
        return res.redirect(`/login.html?error=${encodeURIComponent('*Incorrect password')}`);
    }

    user.isActive = true; 
    await user.save();
    
    if (email === 'admin@email.com' && password ==='admin')
  {
    return res.redirect('/admin1' );
  } 
  else 
  {
    return res.redirect('/dashboard' );
  }
  } 
  catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Login failed' });
  }
});

module.exports = Router;
