const mongoose = require('mongoose');
const { getProductQuery } = require('../utilities/getProductQuery');
const { addReview } = require('../utilities/addReview');
const {
  executePromiseWithCallbackOnSuccess,
} = require('../utilities/executePromiseWithCallbackOnSuccess');
const { getQueryPromise } = require('../utilities/getQueryPromise');
const {
  productNotFoundMessage,
  throwError,
} = require('../utilities/errors/throwError');
const { sendObject } = require('../utilities/sendObject');
const {
  getReviewObjectFromProduct,
} = require('../utilities/getReviewObjectFromProduct');
const { getProductObject } = require('../utilities/getProductObject');
const {
  calculateAverageRating,
} = require('../utilities/calculateAverageRating');

const reviewsCreate = async (req, res) => {
  const productId = req.params.productid;
  const { product, error } = await getProductObject(productId, [
    'name reviews',
  ]);
  if (!product) return throwError(res, 404, productNotFoundMessage);
  if (error) return throwError(res, 404, error);

  const review = {
    author: req.body.author,
    email: req.body.email,
    rating: req.body.rating,
    reviewText: req.body.reviewText,
    createdOn: req.body.date,
  };

  product.reviews.push(review);
  product.stars = calculateAverageRating(product);

  const promise = product.save();
  const callback = (product) => {
    const response = {
      product: {
        name: product.name,
        _id: product._id,
      },
      review: product.reviews.id(reviewId),
    };
    return sendObject(res, response, 201);
  };
  const nullObjErr = 'Product not found';
  // mainErr throws when promise fails.
  const mainErr = 400;
  executePromiseWithCallbackOnSuccess(
    res,
    promise,
    callback,
    nullObjErr,
    mainErr
  );

  /*
  const productId = req.params.productid;
  if (!productId) return res.status(404).json({ message: 'Product not found' });
  const query = getProductQuery(productId, ['reviews']);
  const promise = getQueryPromise(query);
  const callback = (product) => addReview(req, res, product);
  const nullObjErr = productNotFoundMessage;

  executePromiseWithCallbackOnSuccess(res, promise, callback, nullObjErr);
  */
};

const reviewsReadOne = async (req, res) => {
  const productId = req.params.productid;
  const reviewId = req.params.reviewid;
  const { product, error } = await getProductObject(productId, [
    'name reviews',
  ]);
  if (!product) return throwError(res, 404, productNotFoundMessage);
  if (error) return throwError(res, 404, error);

  const review = getReviewObjectFromProduct(product, reviewId);
  if (!review) return throwError(res, 404, 'Review not found');
  const response = {
    product: {
      name: product.name,
      _id: productId,
    },
    review,
  };
  sendObject(res, response, 200);
};

const reviewsUpdateOne = async (req, res) => {
  const productId = req.params.productid;
  const reviewId = req.params.reviewid;

  const { product, error } = await getProductObject(productId, [
    'name, reviews',
  ]);
  if (!product) return throwError(res, 404, productNotFoundMessage);
  if (error) return throwError(res, 404, error);

  const review = getReviewObjectFromProduct(product, reviewId);
  if (!review) return throwError(res, 404, 'Review not found');

  review.author = req.body.author;
  review.email = req.body.email;
  review.rating = req.body.rating;
  review.reviewText = req.body.reviewText;

  const promise = product.save();
  const callback = (product) => {
    const response = {
      product: {
        name: product.name,
        _id: product._id,
      },
      review: product.reviews.id(reviewId),
    };
    sendObject(res, response, 201);
  };
  const nullObjErr = 'Unable to create review';
  const mainErr = 400;

  executePromiseWithCallbackOnSuccess(
    res,
    promise,
    callback,
    nullObjErr,
    mainErr
  );
};

const reviewsDeleteOne = async (req, res) => {
  const productId = req.params.productid;
  const reviewId = req.params.reviewid;

  const { product, error } = await getProductObject(productId, [
    'name, reviews',
  ]);
  if (!product) return throwError(res, 404, productNotFoundMessage);
  if (error) return throwError(res, 404, error);

  let reviews = product.reviews;
  if (!reviews || reviews.length < 1)
    return throwError(res, 404, 'Reviews not found');

  let review = product.reviews.id(reviewId);
  if (!review) return throwError(res, 404, 'Review not found');

  product.reviews = reviews.filter((review) => {
    return String(review._id) !== reviewId;
  });

  const promise = product.save();
  const callback = () => res.status(204).json();
  const nullObjErr = 'Unable to delete review';
  const mainErr = 400;
  executePromiseWithCallbackOnSuccess(
    res,
    promise,
    callback,
    nullObjErr,
    mainErr
  );
};

module.exports = {
  reviewsCreate,
  reviewsReadOne,
  reviewsUpdateOne,
  reviewsDeleteOne,
};
