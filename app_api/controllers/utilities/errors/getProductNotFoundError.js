// Checks for falsy product and truthy err.

const getProductNotFoundError = (err, product) => {
  if (!product) {
    return { message: 'Product not found' };
  } else if (err) {
    return err;
  } else {
    return null;
  }
};

module.exports = { getProductNotFoundError };
