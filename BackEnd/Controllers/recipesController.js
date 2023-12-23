const { getRecpies } = require('../Util/TastyApi')
const asyncHandler = require('express-async-handler')
const recipes = require('../Models/Recipes')

//@desc     Get all food
//@route    GET /api/food
//@access   Public
const getFood = asyncHandler(async (req, res) => {
  const { cookingTime, search } = req.query
  let query = { name: { $regex: search, $options: 'i' } }
  if (cookingTime) {
    query = {
      ...query,
      timeToCook: { $ne: null, $eq: parseInt(cookingTime) }, // Assuming cookingTime is a number
    }
  } else {
    query.timeToCook = { $ne: null }
  }

  recipes
    .find(query)
    .then((data) => {
      return res.status(200).json({ recepies: data })
    })
    .catch((err) => {
      console.log(err)
    })
})

module.exports = { getFood }
