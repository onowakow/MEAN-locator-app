const productNotFoundMessage = 'Product not found';

const throwError = (res, errorCode, error) => {
  return res.status(errorCode).json({ errorMessage: `${error}` });
};

module.exports = { throwError, productNotFoundMessage };
