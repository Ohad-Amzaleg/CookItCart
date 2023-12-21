const { getRecpies } = require('../Util/TastyApi')
const asyncHandler = require('express-async-handler')

//@desc     Get all food
//@route    GET /api/food
//@access   Public
const getFood = asyncHandler(async (req, res) => {
  const { cookingTime, search } = req.query
  getRecpies(search)
    .then((data) => {
      return res.status(200).json({ recepies: data })
    })
    .catch((err) => {
      console.log(err)
    })
})

module.exports = { getFood }
