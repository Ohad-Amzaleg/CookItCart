const express = require('express');
const router = express.Router();
const { getFood } = require('../Controllers/recipesController');
const { validateToken } = require('../Middleware/validateTokenHandler');

router.route('/').get(validateToken, getFood);

module.exports = router;
