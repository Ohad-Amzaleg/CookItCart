const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  items: { type: Array, required: true },
})

const cart = mongoose.model('Cart', cartSchema)

module.exports = cart
