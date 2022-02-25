const calculateAverageRating = (product) => {
  if (!product.reviews && product.reviews.length < 1) return undefined;

  const count = product.reviews.length;
  const sumRating = product.reviews.reduce((sum, review) => {
    return (sum = sum + review.rating);
  }, 0);
  const average = sumRating / count;
  const rating = average.toPrecision(3);
  return rating;
};

module.exports = { calculateAverageRating };
