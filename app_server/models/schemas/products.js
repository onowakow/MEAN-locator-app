const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  author: String,
  email: String,
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  reviewText: String,
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

const productSchema = new mongoose.Schema({
  name: String,
  href: String,
  price: {
    type: Number,
    min: 0,
  },
  inStock: Boolean,
  stars: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  reviews: [reviewSchema],
});

mongoose.model("product", productSchema);
