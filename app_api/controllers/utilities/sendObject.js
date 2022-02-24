const sendObject = (res, object, customCode) => {
  const htmlCode = customCode ? customCode : 200;
  return res.status(200).json(object);
};

module.exports = {
  sendObject,
};
