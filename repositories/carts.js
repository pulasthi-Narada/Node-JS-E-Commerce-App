const Repository = require('./repository');
const Carts = require('../models/Carts');

class CartsRepository extends Repository {}

module.exports = new CartsRepository(Carts);
