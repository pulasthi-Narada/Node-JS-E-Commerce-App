const mongoose = require('mongoose');

const Carts = new mongoose.Schema({
  items: [],
});

module.exports = mongoose.model('Carts', Carts);
