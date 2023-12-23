const express = require('express')
const router = express.Router()
const { validateToken } = require('../Middleware/validateTokenHandler')
const {
  addUser,
  loginUser,
  getCurrent,
  updateUser,
  deleteUser,
  tester,
} = require('../Controllers/usersController')

router.route('/test').get(tester)

router.route('/register').post(addUser)

router.route('/login').post(loginUser)

router.route('/current').get(validateToken, getCurrent)

router.route('/delete/:id').delete(validateToken, deleteUser)

router.route('/update/:id').put(validateToken, updateUser)

module.exports = router
