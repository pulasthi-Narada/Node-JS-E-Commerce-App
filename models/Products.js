const mongoose = require('mongoose');

const Products = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number ,
    required: true,
  },
});

module.exports = mongoose.model('Products', Products);
