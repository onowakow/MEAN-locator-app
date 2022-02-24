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

const reviewsCreate = async (req, res) => {
  const productId = req.params.productid;
  if (!productId) return res.status(404).json({ message: 'Product not found' });
  const query = getProductQuery(productId, ['reviews']);
  const promise = getQueryPromise(query);
  const callback = (product) => addReview(req, res, product);
  const nullObjErr = productNotFoundMessage;

  executePromiseWithCallbackOnSuccess(res, promise, callback, nullObjErr);
};

const reviewsReadOne = (req, res) => {
  const productId = req.params.productid;
  const reviewId = req.params.reviewid;
  if (!productId) return res.status(404).json({ message: 'Product not found' });

  const getReviewFromProduct = (product) => {
    if (product.reviews && product.reviews.length > 0) {
      const review = product.reviews.id(reviewId);
      if (!review) return throwError(res, 404, 'Review not found');
      const response = {
        product: {
          name: product.name,
          _id: productId,
        },
        review,
      };
      return sendObject(res, response, 200);
    } else {
      return throwError(res, 404, 'No reviews found');
    }
  };

  const query = getProductQuery(productId, ['name reviews']);
  const promise = getQueryPromise(query);
  const callback = getReviewFromProduct;
  const nullObjErr = productNotFoundMessage;

  executePromiseWithCallbackOnSuccess(res, promise, callback, nullObjErr);

  /*
  getProductQuery(productId, ['name reviews']).exec((err, product) => {
    const productNotFoundError = getProductNotFoundError(err, product);
    if (productNotFoundError) return res.status(404).json(productNotFoundError);

    if (product.reviews && product.reviews.length > 0) {
      const review = product.reviews.id(req.params.reviewid);

      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }

      const response = {
        product: {
          name: product.name,
          _id: req.params.productid,
        },
        review,
      };

      return res.status(200).json(response);
    } else {
      return res.status(404).json({ message: 'No reviews found' });
    }
  });
  */
};

const reviewsUpdateOne = (req, res) => {};
const reviewsDeleteOne = (req, res) => {};

module.exports = {
  reviewsCreate,
  reviewsReadOne,
  reviewsUpdateOne,
  reviewsDeleteOne,
};
