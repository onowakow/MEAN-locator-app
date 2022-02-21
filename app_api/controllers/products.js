const mongoose = require("mongoose");
const productModel = mongoose.model("product");

const productsList = (req, res) => {
  res.status(200).json({ status: "success" });
};
const productsCreate = (req, res) => {
  productModel.create(
    {
      name: req.body.name,
      href: req.body.href,
      price: req.body.price,
      inStock: req.body.inStock,
    },
    (err, product) => {
      if (err) return res.status(400).json(err);
      res.status(201).json(product);
    }
  );
};
const productsReadOne = (req, res) => {
  productModel.findById(req.params.productid).exec((err, product) => {
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (err) {
      return res.status(404).json(err);
    }
    res.status(200).json(product);
  });
};
const productsUpdateOne = (req, res) => {};
const productsDeleteOne = (req, res) => {};

module.exports = {
  productsList,
  productsCreate,
  productsReadOne,
  productsUpdateOne,
  productsDeleteOne,
};
