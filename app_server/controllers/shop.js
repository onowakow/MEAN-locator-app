const welcome = (req, res) => {
  res.render("welcome", { title: "Welcome" });
};

const shop = (req, res) => {
  res.render("shop", { title: "Order flowers" });
};

const cart = (req, res) => {
  res.render("index", { title: "Your cart" });
};

module.exports = {
  welcome,
  shop,
  cart,
};
