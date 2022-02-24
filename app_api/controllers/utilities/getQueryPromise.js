const getQueryPromise = (query) => {
  return query.exec();
};

module.exports = { getQueryPromise };
