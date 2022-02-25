const getReviewObjectFromProduct = (product, reviewId) => {
  if (!product.reviews || product.reviews.length < 1) return undefined;
  const review = product.reviews.id(reviewId);
  if (!review) return undefined;
  return review;
};

module.exports = { getReviewObjectFromProduct };
