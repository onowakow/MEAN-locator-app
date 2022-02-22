const mongoose = require('mongoose');
const productModel = mongoose.model('product');
const { getProductQuery } = require('../utilities/getProductQuery');
const {
  getProductNotFoundError,
} = require('../utilities/errors/getProductNotFoundError');

const productsList = (req, res) => {
  res.status(200).json({ status: 'success' });
};

const productsCreate = (req, res) => {
  productModel.create(
    {
      name: req.body.name,
      href: req.body.href,
      price: req.body.price,
      inStock: req.body.inStock,
    },
    (err, product) => {
      if (err) return res.status(400).json(err);
      res.status(201).json(product);
    }
  );
};

const productsReadOne = (req, res) => {
  const productId = req.params.productid;

  getProductQuery(productId).exec((err, product) => {
    const productNotFoundError = getProductNotFoundError(err, product);
    if (productNotFoundError) return res.status(404).json(productNotFoundError);

    res.status(200).json(product);
  });
};

const productsUpdateOne = (req, res) => {
  const productId = req.params.productid;

  getProductQuery(productId).exec((err, product) => {
    const productNotFoundError = getProductNotFoundError(err, product);
    if (productNotFoundError) return res.status(404).json(productNotFoundError);
  });
};
const productsDeleteOne = (req, res) => {};

module.exports = {
  productsList,
  productsCreate,
  productsReadOne,
  productsUpdateOne,
  productsDeleteOne,
};
