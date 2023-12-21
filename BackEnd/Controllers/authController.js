const asyncHandler = require('express-async-handler')

//Users Model
const users = require('../Models/User')

//OTP Model
const userOTPVerification = require('../Models/OtpAuth')

//NodeMailer for sending emails
const nodemailer = require('nodemailer')

//Util for validating the user credentials
const {
  userExist,
  sendVerificationEmail,
  validateUserOTP,
} = require('../Util/util')

//@desc authenticate user
//@route POST /api/auth/validation
//@access Private
const validateUser = asyncHandler(async (req, res) => {
  const email = req.user.email
  const { code } = req.body

  if (!code) return res.status(400).json({ code: 1, error: 'No code Sent' })

  const valid = await validateUserOTP(email, code, users, userOTPVerification)

  if (!valid) return res.status(400).json({ code: 1, error: 'Invalid OTP' })

  //Update the verified status
  await users.updateOne({ email: email }, { $set: { verified: true } })
  res
    .status(200)
    .json({ message: 'User verified successfully', verified: true })
})

//@desc resend verification email
//@route POST /api/auth/resend
//@access Private
const resendVerificationEmail = asyncHandler(async (req, res) => {
  const user = req.user

  //check if user has been sent an OTP
  const userOTP = await userExist(user.email, userOTPVerification)

  if (!userOTP) {
    return res.status(404).json({ code: 1, error: 'No user found' })
  }

  //Delete the previous OTP
  if (userOTP) {
    await userOTPVerification.deleteMany({ email: user.email })
  }

  const mailTransporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  })

  //Send verified email to the user
  sendVerificationEmail(user.email, mailTransporter, userOTPVerification)
  res.status(200).json({ message: 'Email sent successfully' })
})

module.exports = { validateUser, resendVerificationEmail }
