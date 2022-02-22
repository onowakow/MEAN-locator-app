const { updateAverageRating } = require('./updateAverageRating');

const addReview = (req, res, product) => {
  const review = {
    author: req.body.author,
    email: req.body.email,
    rating: req.body.rating,
    reviewText: req.body.reviewText,
    createdOn: req.body.date,
  };

  product.reviews.push(review);

  product.save((err, product) => {
    if (err) {
      return res.status(400).json(err);
    }

    updateAverageRating(product._id);
    const thisReview = product.reviews.slice(-1).pop();
    res.status(201).json(thisReview);
  });
};

module.exports = {
  addReview,
};
