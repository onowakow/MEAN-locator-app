const mongoose = require('mongoose');
const productModel = mongoose.model('product');
const { getProductQuery } = require('../utilities/getProductQuery');
const { sendObject } = require('../utilities/sendObject');
const {
  executePromiseWithCallbackOnSuccess,
} = require('../utilities/executePromiseWithCallbackOnSuccess');
const { getQueryPromise } = require('../utilities/getQueryPromise');
const {
  productNotFoundMessage,
  throwError,
} = require('../utilities/errors/throwError');
const { getProductObject } = require('../utilities/getProductObject');

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

const productsReadOne = async (req, res) => {
  const productId = req.params.productid;
  const { product, error } = await getProductObject(productId);

  if (product) return sendObject(res, product);
  if (error) return throwError(res, 404, { message: error });
  return throwError(res, 500, { message: 'Internal server error.' });
};

const productsUpdateOne = async (req, res) => {
  const productId = req.params.productid;
  const { product, error } = await getProductObject(productId);

  if (!product && !error)
    throwError(res, 500, {
      message: 'Server failed to get object and throw error',
    });
  if (!product)
    return throwError(res, 404, { message: productNotFoundMessage });
  if (error) return throwError(res, 404, { message: error });

  // Edit product
  product.name = req.body.name;
  product.href = req.body.href;
  product.price = req.body.price;

  const promise = product.save();
  const callback = (product) => sendObject(res, product);
  const nullObjErr = 'Unable to create product';

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

/* Patch not very RESTful. User can patch non-existent fields, like 'nam' 
  instead of 'name.' This results in no modification but a success
  code */
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
