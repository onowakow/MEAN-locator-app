const { getProductQuery } = require("./getProductQuery");

const updateAverageRating = (id) => {
  getProductQuery(id, ["reviews"]).exec((err, product) => {
    if (!err) {
      doSetAverageRating(product);
    } else {
      console.error("Error updating average rating:", err);
    }
  });
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
