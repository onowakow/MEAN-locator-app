const { productModel } = require("../../../models/schemas/products");

const reviewsCreate = (req, res) => {
  const productId = req.params.productid;
  if (productId) {
    productModel
      .findById(productId)
      .select("reviews")
      .exec((err, product) => {
        if (err) return res.status(400).json(err);

        /*********NEED TO PLUG IN DOADDREVIEW**************/
        doAddReview(req, res, product);
      });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

module.exports = {
  reviewsCreate,
};
