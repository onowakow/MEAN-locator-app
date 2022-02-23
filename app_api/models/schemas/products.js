const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
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
  name: {
    type: String,
    required: true,
  },
  href: {
    type: String,
    required: true,
  },
  price: {
    required: true,
    type: Number,
    min: 0,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  stars: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  reviews: [reviewSchema],
});

mongoose.model('product', productSchema);

const productModel = mongoose.model('product');
module.exports = { productModel };
