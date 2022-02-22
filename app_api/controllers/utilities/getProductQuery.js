const { productModel } = require("../../models/schemas/products");

// Returns an unexecuted product query.
// Arg[1] optional: select array of fields
function getProductQuery(productId, selectedFieldsArray) {
  if (selectedFieldsArray && selectedFieldsArray.length > 0) {
    const query = productModel
      .findById(productId)
      .select(selectedFieldsArray.join(" "));
    return query;
  } else {
    const query = productModel.findById(productId);
    return query;
  }
}

module.exports = { getProductQuery };
