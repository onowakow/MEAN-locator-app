// See Getting MEAN 6.3.2
const { productModel } = require("../../models/schemas/products");
const { getProductQuery } = require("../utilities/getProductQuery");
const { updateAverageRating } = require("../utilities/updateAverageRating");
const { addReview } = require("../utilities/addReview");

const reviewsCreate = (req, res) => {
  const productId = req.params.productid;

  if (!productId) return res.status(404).json({ message: "Product not found" });

  getProductQuery(productId, ["reviews"]).exec((err, product) => {
    if (err) return res.status(404).json(err);
    addReview(req, res, product);
  });
};

/*
const doAddReview = (req, res, product) => {
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

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
*/

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
  productModel,
};
