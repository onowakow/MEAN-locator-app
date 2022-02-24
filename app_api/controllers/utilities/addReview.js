const { updateAverageRating } = require('./updateAverageRating');
const {
  executePromiseWithCallbackOnSuccess,
} = require('./executePromiseWithCallbackOnSuccess');
const { sendObject } = require('./sendObject');
const { productNotFoundMessage } = require('./errors/throwError');

const addReview = (req, res, product) => {
  const review = {
    author: req.body.author,
    email: req.body.email,
    rating: req.body.rating,
    reviewText: req.body.reviewText,
    createdOn: req.body.date,
  };

  product.reviews.push(review);

  const promise = product.save();
  const callback = (product) => {
    updateAverageRating(product._id);
    const thisReview = product.reviews.slice(-1).pop();
    sendObject(res, thisReview, 201);
  };
  const nullObjErr = productNotFoundMessage;
  // For error in main promise.
  const errCode = 400;

  executePromiseWithCallbackOnSuccess(
    res,
    promise,
    callback,
    nullObjErr,
    errCode
  );
};

module.exports = {
  addReview,
};
