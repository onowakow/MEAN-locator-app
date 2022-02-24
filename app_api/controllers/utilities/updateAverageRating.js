const { getProductQuery } = require('./getProductQuery');
const {
  executePromiseWithCallbackOnSuccess,
} = require('./executePromiseWithCallbackOnSuccess');
const { productNotFoundMessage } = require('./errors/throwError');

const updateAverageRating = (res, id) => {
  const promise = getProductQuery(id, ['reviews']);
  const callback = doSetAverageRating(product);
  const nullObjErr = productNotFoundMessage;
  // Internal server error.
  const mainErrCode = 500;

  executePromiseWithCallbackOnSuccess(
    res,
    promise,
    callback,
    nullObjErr,
    mainErrCode
  );
};

const doSetAverageRating = (product) => {
  if (product.reviews && product.reviews.length > 0) {
    const count = product.reviews.length;
    const sumRating = product.reviews.reduce((sum, review, index) => {
      return (sum = sum + review.rating);
    }, 0);
    const average = sumRating / count;
    product.stars = average.toPrecision(3);
    product.save((err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Average rating updated to ${product.stars}`);
      }
    });
  }
};

module.exports = {
  updateAverageRating,
};
