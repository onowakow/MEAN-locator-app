const express = require('express');
const router = express.Router();
const ctrlProducts = require('../controllers/products/products');
const ctrlReviews = require('../controllers/reviews/reviews');

// products
router
  .route('/products')
  .get(ctrlProducts.productsList)
  .post(ctrlProducts.productsCreate);
router
  .route('/products/:productid')
  .get(ctrlProducts.productsReadOne)
  .put(ctrlProducts.productsUpdateOne)
  .delete(ctrlProducts.productsDeleteOne)
  .patch(ctrlProducts.productsPatchOne);
// reviews
router.route('/products/:productid/reviews').post(ctrlReviews.reviewsCreate);
router
  .route('/products/:productid/reviews/:reviewid')
  .get(ctrlReviews.reviewsReadOne)
  .put(ctrlReviews.reviewsUpdateOne)
  .delete(ctrlReviews.reviewsDeleteOne);

module.exports = router;
