const Repository = require('./repository');
const Products = require('../models/Products');

class ProductsRepository extends Repository {}

module.exports = new ProductsRepository(Products);
