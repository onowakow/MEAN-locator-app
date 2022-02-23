const mongoose = require('mongoose');
const productModel = mongoose.model('product');
const { getProductQuery } = require('../utilities/getProductQuery');
const { throwError } = require('../utilities/errors/throwError');
const { sendObject } = require('../utilities/sendObject');

const productNotFoundMessage = 'Product not found';
const getQueryPromise = (query) => {
  return query.exec();
};
const executePromiseWithCallbackOnSuccess = async (
  res,
  promise,
  callback,
  nullObjErr
) => {
  try {
    const data = await promise;
    data
      ? callback(data) // Success
      : throwError(res, 404, { message: nullObjErr });
  } catch (err) {
    throwError(res, 404, err);
  }
};

// API functions
const productsList = (req, res) => {
  const query = productModel.find();
  const promise = getQueryPromise(query);
  const callback = (productList) => sendObject(res, productList);
  const nullObjErr = 'Product list not found';

  executePromiseWithCallbackOnSuccess(res, promise, callback, nullObjErr);
};

const productsCreate = (req, res) => {
  const newProduct = {
    name: req.body.name,
    href: req.body.href,
    price: req.body.price,
    inStock: req.body.inStock,
  };
  const promise = productModel.create(newProduct);
  const callback = (product) => sendObject(res, product);
  const nullObjErr = 'Failed to create product';

  executePromiseWithCallbackOnSuccess(res, promise, callback, nullObjErr);
};

const productsReadOne = (req, res) => {
  const productId = req.params.productid;
  const query = getProductQuery(productId);
  const promise = getQueryPromise(query);
  const nullObjErr = productNotFoundMessage;
  const callback = (product) => sendObject(res, product);

  executePromiseWithCallbackOnSuccess(res, promise, callback, nullObjErr);
};

const productsUpdateOne = (req, res) => {
  const editProduct = async (req, res, product) => {
    product.name = req.body.name;
    product.href = req.body.href;
    product.price = req.body.price;

    const promise = product.save();
    const callback = (product) => sendObject(res, product);
    const nullObjErr = 'Unable to create product';

    executePromiseWithCallbackOnSuccess(res, promise, callback, nullObjErr);
  };

  const productId = req.params.productid;
  const query = getProductQuery(productId, ['-reviews', '-ratings']);
  const promise = getQueryPromise(query);
  const nullObjErr = productNotFoundMessage;
  const callback = (product) => {
    editProduct(req, res, product);
  };

  executePromiseWithCallbackOnSuccess(res, promise, callback, nullObjErr);
};

const productsDeleteOne = (req, res) => {
  const productId = req.params.productid;
  const query = productModel.findByIdAndDelete(productId);
  const promise = getQueryPromise(query);
  const nullObjErr = productNotFoundMessage;
  const callback = () => res.status(204).json();

  executePromiseWithCallbackOnSuccess(res, promise, callback, nullObjErr);
};

const productsPatchOne = (req, res) => {
  const patches = JSON.parse(JSON.stringify(req.body));
  const productId = req.params.productid;
  // Need to configure validators at later date. https://mongoosejs.com/docs/validation.html#update-validators
  const updateOptions = { runValidators: true };
  const query = productModel
    .findByIdAndUpdate(productId, patches, updateOptions)
    .setOptions({ returnDocument: 'after' });
  const promise = getQueryPromise(query);
  const nullObjErr = productNotFoundMessage;
  const callback = (product) => sendObject(res, product);

  executePromiseWithCallbackOnSuccess(res, promise, callback, nullObjErr);
};

module.exports = {
  productsList,
  productsCreate,
  productsReadOne,
  productsUpdateOne,
  productsDeleteOne,
  productsPatchOne,
};
