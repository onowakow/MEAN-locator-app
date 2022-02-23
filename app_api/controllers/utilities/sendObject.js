const sendObject = (res, object) => {
  return res.status(200).json(object);
};

module.exports = {
  sendObject,
};
