const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const app = express();
const Router = express.Router();
const Service = require("../models/servicemodels")
const path = require('path');


mongoose.connect("mongodb+srv://root:root12345678@globalmind.3krcaq3.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.engine('handlebars', exphbs({ defaultLayout: 'admin1' }));
app.engine(
  'handlebars',
  exphbs({
    extname: '.handlebars', // Set the file extension for Handlebars templates
    defaultLayout: 'admin1', // Specify the default layout
    layoutsDir: path.join(__dirname, 'views/'), // Path to the layouts directory
  })
);
app.set('views', path.join(__dirname, '../public'));

Router.get('/admin1', async (req, res) => {
  try {
    const services = await Service.find();
    res.render('admin1', { services });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).send('An error occurred');
  }
});

module.exports = Router;
