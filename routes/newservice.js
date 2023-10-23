const express = require('express');
const Router = express.Router();
const app = express();
const User = require('../models/servicemodels'); 
const bodyParser = require("body-parser");
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));

Router.post('/newservice', async (req, res) => {
    
try{
    const { title, description, price } = req.body;
    const newservice = new User({ title, description, price });
    await newservice.save();
    res.redirect('/admin1' );
} 
catch (err) 
{
    console.error("Error during adding new service:", err);
    res.render('/admin1', { error: 'adding new service failed' });   
}
});
  
module.exports = Router;
  
  
  
  