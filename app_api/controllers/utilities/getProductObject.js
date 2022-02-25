const { getProductQuery } = require('./getProductQuery');
const { getQueryPromise } = require('./getQueryPromise');
const { productNotFoundMessage } = require('./errors/throwError');

// Queries database and returns javascript object
// Add optional select
const getProductObject = async (id, optionalFieldSelect) => {
  const query = getProductQuery(
    id,
    optionalFieldSelect ? optionalFieldSelect : null
  );
  const promise = getQueryPromise(query);

  const returnObj = {
    product: undefined,
    error: undefined,
  };

  try {
    const product = await promise;
    if (product) returnObj.product = product;
    if (!product) returnObj.error = productNotFoundMessage;
  } catch (err) {
    returnObj.error = err;
  } finally {
    return returnObj;
  }
};

module.exports = { getProductObject };
