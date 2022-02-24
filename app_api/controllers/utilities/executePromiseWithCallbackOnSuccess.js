const { throwError } = require('./errors/throwError');

const executePromiseWithCallbackOnSuccess = async (
  res,
  promise,
  callback,
  nullObjErr,
  optionalMainErrorCode
) => {
  const errCode = optionalMainErrorCode ? optionalMainErrorCode : 404;

  try {
    const data = await promise;
    data
      ? callback(data) // Success
      : throwError(res, 404, { message: nullObjErr });
  } catch (err) {
    throwError(res, errCode, err);
  }
};

module.exports = {
  executePromiseWithCallbackOnSuccess,
};
