const express = require("express");
const router = express.Router();
const { validateToken } = require("../Middleware/validateTokenHandler");
const { getCart, updateCart } = require("../Controllers/cartController");

router.route("/").get(validateToken, getCart);

router.route("/update").post(validateToken, updateCart);

module.exports = router;
