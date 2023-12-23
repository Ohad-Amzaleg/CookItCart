const mongoose = require("mongoose");

const schduleSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  events: { type: Array, required: true },
  weeklyNutrition: { type: mongoose.Schema.Types.Mixed, required: false },
});

const schdule = mongoose.model("Schdule", schduleSchema);

module.exports = schdule;
