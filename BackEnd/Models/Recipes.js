const mongoose = require('mongoose')

const recipesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  servings: { type: Number, required: true },
  description: { type: String, required: true },
  ingredients: { type: Array, required: true },
  instructions: { type: Array, required: true },
  video: { type: String, required: true },
  category: { type: String, required: true },
  rating: { type: Schema.Types.Mixed, required: true },
  nutrition: { type: Schema.Types.Mixed, required: true },
  timeToCook: { type: String, required: true },
})

const Recipes = mongoose.model('Recipes', recipesSchema)
