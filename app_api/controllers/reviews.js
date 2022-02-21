// See Getting MEAN 6.3.2
const mongoose = require("mongoose");
const productModel = mongoose.model("product");

const reviewsCreate = (req, res) => {
  const productId = req.params.productid;
  if (productId) {
    productModel
      .findById(productId)
      .select("reviews")
      .exec((err, product) => {
        if (err) return res.status(400).json(err);
        doAddReview(req, res, product);
      });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

const doAddReview = (req, res, product) => {
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const reviewArray = product.reviews;
  const review = {
    author: req.body.author,
    email: req.body.email,
    rating: req.body.rating,
    reviewText: req.body.review,
    createdOn: req.body.date,
  };
  reviewArray.push(review);

  product.save((err, product) => {
    if (err) {
      return res.status(400).json(err);
    }

    updateAverageRating(product._id);
    const thisReview = product.reviews.slice(-1).pop();
    res.status(201).json(thisReview);
  });
};

const doSetAverageRating = (product) => {
  if (product.reviews && product.reviews.length > 0) {
    const count = product.reviews.length;
    const sumRating = reviewsArray.reduce((sum, review, index) => {
      return (sum = sum + review.rating);
    }, 0);
    const average = sumRating / count;
    product.stars = Math.round(average);
    product.save((err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Average rating updated to ${product.stars}`);
      }
    });
  }
};

const updateAverageRating = (id) => {
  productModel
    .findById(id)
    .select("reviews")
    .exec((err, product) => {
      if (!err) {
        doSetAverageRating(product);
      }
    });
};

const reviewsReadOne = (req, res) => {
  productModel
    .findById(req.params.productid)
    .select("name reviews")
    .exec((err, product) => {
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      if (err) {
        return res.status(404).json(err);
      }

      if (product.reviews && product.reviews.length > 0) {
        const review = product.reviews.id(req.params.reviewid);

        if (!review) {
          return res.status(404).json({ message: "Review not found" });
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
        return res.status(404).json({ message: "No reviews found" });
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
