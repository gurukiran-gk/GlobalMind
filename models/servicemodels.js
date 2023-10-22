const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  date :{type : Date , default : Date.now},
  title: { type: String, required: true,},
  description: {type : String },
  price: {type: String,required: true,},
  no_of_clints : {type: String, required: true, default : 0 },
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
