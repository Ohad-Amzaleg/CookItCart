const express = require('express');
const router = express.Router();
const { validateToken } = require('../Middleware/validateTokenHandler');
const { getEvents, updateSchedule, getNutrition, updateNutrition } = require('../Controllers/scheduleController');

router.route('/events').get(validateToken, getEvents);

router.route('/nutrition').get(validateToken, getNutrition);

router.route('/update').post(validateToken, updateSchedule);

// router.route("/update/nutrition").post(validateToken, updateNutrition);

module.exports = router;
