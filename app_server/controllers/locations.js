const homeList = (req, res) => {
  res.render("locations-list", { title: "home" });
};

const locationInfo = (req, res) => {
  res.render("index", { title: "location info" });
};

const addReview = (req, res) => {
  res.render("index", { title: "add review" });
};

module.exports = {
  homeList,
  locationInfo,
  addReview,
};
