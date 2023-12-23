//Users Model
const users = require('../Models/User')

//Bcrypt for hashing the password
const bcrypt = require('bcrypt')

//OTP Model
const userOTPVerification = require('../Models/OtpAuth')

//JWT for authentication
const { createTokens } = require('../Middleware/validateTokenHandler')

//NodeMailer for sending emails
const nodemailer = require('nodemailer')

const asyncHandler = require('express-async-handler')

//Util for validating the user credentials
const {
  validateUserName,
  validateEmail,
  validatePassword,
  validateUser,
  userExist,
  sendVerificationEmail,
} = require('../Util/util')

//@desc Get user by id
//@route GET /api/users/current
//@access Private
const getCurrent = asyncHandler(async (req, res) => {
  const email = req.user.email
  const token = req.token ? req.token : ''
  const user = await userExist(email, users)
  if (user) {
    return res.status(200).json({ user: user, token: token })
  }
  res.status(400).json({ error: 'No user found' })
})

//@desc Login user
//@route GET /api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: 'Invalid credentials' })
  }

  const { email, password } = req.body.user
  const user = await userExist(email, users)

  if (!user) {
    return res.status(400).json({ code: 0, error: 'No user found' })
  }

  if (!(await validateUser({ email: email, password: password }, users))) {
    return res.status(400).json({ code: 1, error: 'Invalid credentials' })
  }

  //Create Token for the current user
  const accesToken = createTokens(user)
  //Set the token in the cookie
  res.cookie('access-token', accesToken, {
    maxAge: 60 * 60 * 24 * 30 * 1000,
    path: '/',
    domain: 'cookitcart.site',
  })

  //Send the user data to the client
  res.status(200).json({ user: user, token: accesToken })
})

//@desc Add new user
//@route POST /api/users
//@access Public
const addUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Invalid credentials' })
  }

  //Check if user exists
  const user = new users({
    username: username,
    email: email,
    password: password,
    verified: false,
  })

  if (await userExist(email, users)) {
    return res.status(400).json({ code: 0, error: 'User already exists' })
  }

  //Validate the user credentials
  if (
    !validateUserName(username) ||
    !validateEmail(email) ||
    !validatePassword(password)
  ) {
    return res.status(400).json({ error: 'Invalid credentials' })
  }

  bcrypt.hash(password, 10).then(async (hash) => {
    user.password = hash
    try {
      //Save the user in the database
      await user.save()
      res.status(200).json({ message: 'Registered Successfully' })

      const mailTransporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      })

      //Send verified email to the user
      sendVerificationEmail(email, mailTransporter, userOTPVerification)
      return res.status(200).json({ message: 'Registered Successfully' })
    } catch (err) {
      console.log(err)
    }
  })
})

//@desc Update user info
//@route PUT /api/users
//@access Public
const updateUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body

  if (username && !validateUserName(username)) {
    return res.status(400).json({ error: 'Invalid username' })
  }

  if (email && !validateEmail(email)) {
    return res.status(400).json({ error: 'Invalid email' })
  }

  if (password && !validatePassword(password)) {
    return res.status(400).json({ error: 'Invalid password' })
  }

  const user = await userExist(req.params.email, users)

  if (!user) {
    return res.status(400).json({ error: 'No user found' })
  }

  if (username) {
    user.username = username
  }

  if (email) {
    user.email = email
  }

  if (password) {
    user.password = password
  }

  user.save()
  return res.status(200).json({ user: user })
})

//@desc Delete user
//@route DELETE /api/users
//@access Public

const deleteUser = asyncHandler(async (req, res) => {
  const user = await userExist(req.params.email, users)

  if (!user) {
    return res.status(400).json({ error: 'No user found' })
  }

  user.delete()
  return res.status(200).json({ message: 'User deleted successfully' })
})

const tester = asyncHandler(async (req, res) => {
  res.status(200).send('Test Pass successfully')
})

module.exports = {
  getCurrent,
  loginUser,
  addUser,
  updateUser,
  deleteUser,
  tester,
}
