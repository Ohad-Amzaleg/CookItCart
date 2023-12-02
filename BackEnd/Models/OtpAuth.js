const mongoose = require("mongoose");

const OTP = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now, expires: 600 },
  expiresAt: { type: Date, required: true, default: Date.now, expires: 600 },
});

const userOTPVerification = mongoose.model("userOTPVerification", OTP);

module.exports = userOTPVerification;
