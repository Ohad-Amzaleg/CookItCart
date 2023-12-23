const express = require("express");
const router = express.Router();
const {validateUser,resendVerificationEmail} = require("../Controllers/authController");
const { validateToken } = require("../Middleware/validateTokenHandler");

router.use(validateToken);

router.route("/validate").post(validateUser);

router.route("/resend").post(resendVerificationEmail);

module.exports = router;