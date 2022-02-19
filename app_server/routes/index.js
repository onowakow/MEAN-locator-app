const express = require("express");

const router = express.Router();
const ctrlShop = require("../controllers/shop");
const ctrlOthers = require("../controllers/others");

/* Location pages */
router.get("/", ctrlShop.welcome);
router.get("/shop", ctrlShop.shop);
router.get("/shop/cart", ctrlShop.cart);

/* About pages */
router.get("/about", ctrlOthers.about);

module.exports = router;
