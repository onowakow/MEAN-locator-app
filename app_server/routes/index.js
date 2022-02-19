const express = require("express");

const router = express.Router();
const ctrlLocations = require("../controllers/locations");
const ctrlOthers = require("../controllers/others");

/* Location pages */
router.get("/", ctrlLocations.homeList);
router.get("/location", ctrlLocations.locationInfo);
router.get("/location/review/new", ctrlLocations.addReview);

/* About pages */
router.get("/about", ctrlOthers.about);

module.exports = router;
