const getReviewObjectFromProduct = (product, reviewId) => {
  if (!product.reviews || product.reviews.length < 1) return undefined;
  // The mongoose docs are not great, but I have to believe this returns a reference.
  const review = product.reviews.id(reviewId);
  if (!review) return undefined;
  return review;
};

module.exports = { getReviewObjectFromProduct };
