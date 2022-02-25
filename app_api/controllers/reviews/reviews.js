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

const reviewsCreate = async (req, res) => {
  const productId = req.params.productid;
  if (!productId) return res.status(404).json({ message: 'Product not found' });
  const query = getProductQuery(productId, ['reviews']);
  const promise = getQueryPromise(query);
  const callback = (product) => addReview(req, res, product);
  const nullObjErr = productNotFoundMessage;

  executePromiseWithCallbackOnSuccess(res, promise, callback, nullObjErr);
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
  // Get product
  // Gather request data
  // Modify product locally
  // Save product and return modified.
};
const reviewsDeleteOne = (req, res) => {};

module.exports = {
  reviewsCreate,
  reviewsReadOne,
  reviewsUpdateOne,
  reviewsDeleteOne,
};
