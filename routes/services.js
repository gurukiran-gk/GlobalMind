const express = require('express');
const app = express();
const Router = express.Router();
const Service = require("../models/servicemodels")
const path = require('path');

app.set('views', path.join(__dirname, '../public'));

Router.get('/admin1', async (req, res) => {
  try {
    const services = await Service.find();
    const cleanedServices = services.map((service) => ({
      id : service._id,
      title: service.title,
      description: service.description,
      price: service.price,
      no_of_clints: service.no_of_clints,
      date: service.date,
    }));
    res.render('admin1', { services: cleanedServices , layout: 'admin1' });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).send('An error occurred');
  }
});

Router.get('/dashboard', async (req, res) => {
  try {
    const services = await Service.find();
    const cleanedServices = services.map((service) => ({
      id : service._id,
      title: service.title,
      description: service.description,
      price: service.price,
      no_of_clints: service.no_of_clints,
      date: service.date,
    }));
    res.render('dashboard', { services: cleanedServices , layout: 'dashboard' });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).send('An error occurred');
  }
});

module.exports = Router;
