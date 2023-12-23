const { sign, verify } = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const users = require('../Models/User')
const { userExist } = require('../Util/util')

const createTokens = (user) => {
  const accessToken = sign(
    { username: user.username, email: user.email },
    process.env.SECRET_TOKEN,
    {
      expiresIn: '2h',
    }
  )
  return accessToken
}

const validateToken = asyncHandler(async (req, res, next) => {
  const userToken = req.user ? req.user.token : null
  const accessToken = req.cookies['access-token'] || userToken

  if (!accessToken) {
    return
    // res.status(401);
    // throw new Error('User is unauthorized');
  }

  verify(accessToken, process.env.SECRET_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'User is unauthorized' })
    }
    userExist(decoded.email, users)
      .then((user) => {
        req.user = user
        req.token = accessToken
        next()
      })
      .catch((err) => {
        console.log(err)
      })
  })
})

module.exports = { createTokens, validateToken }
