const { getProductQuery } = require('../utilities/getProductQuery');
const { addReview } = require('../utilities/addReview');
const {
  executePromiseWithCallbackOnSuccess,
} = require('../utilities/executePromiseWithCallbackOnSuccess');
const { getQueryPromise } = require('../utilities/getQueryPromise');
const { productNotFoundMessage } = require('../utilities/errors/throwError');

const reviewsCreate = async (req, res) => {
  const productId = req.params.productid;
  const query = getProductQuery(productId, ['reviews']);
  const promise = getQueryPromise(query);
  const callback = (product) => addReview(req, res, product);
  const nullObjErr = productNotFoundMessage;

  executePromiseWithCallbackOnSuccess(res, promise, callback, nullObjErr);
};

const reviewsReadOne = (req, res) => {
  const productId = req.params.productid;

  if (!productId) return res.status(404).json({ message: 'Product not found' });

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
};

const reviewsUpdateOne = (req, res) => {};
const reviewsDeleteOne = (req, res) => {};

module.exports = {
  reviewsCreate,
  reviewsReadOne,
  reviewsUpdateOne,
  reviewsDeleteOne,
};
