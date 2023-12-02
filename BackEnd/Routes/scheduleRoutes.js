const express = require("express");
const router = express.Router();
const { validateToken } = require("../Middleware/validateTokenHandler");
const {
  getSchedule,
  updateSchedule,
} = require("../Controllers/scheduleController");

router.route("/").get(validateToken, getSchedule);

router.route("/update").post(validateToken, updateSchedule);

module.exports = router;
