const cart = require('../Models/Cart')
const asyncHandler = require('express-async-handler')

//@desc Get user Cart
//@route GET /api/cart
//@access Private
const getCart = asyncHandler(async (req, res) => {
  const currCart = await cart.findOne({ email: req.user.email })
  res.status(200).json({ cart: currCart })
})

//@desc Update user Cart
//@route POST /api/cart/update
//@access Private
const updateCart = asyncHandler(async (req, res) => {
  const newItems = req.body.items
  if (!newItems) {
    res.status(400).json({ error: 'No cart found' })
  }

  const currentCart = await cart.findOne({ email: req.user.email })

  if (currentCart) {
    currentCart.items = newItems
    currentCart.save()
    res.status(200).json({ cart: currentCart })
  } else {
    const newCart = new cart({
      email: req.user.email,
      items: newItems,
    })
    newCart.save()
    res.status(200).json({ cart: newCart })
  }
})

module.exports = { getCart, updateCart }
