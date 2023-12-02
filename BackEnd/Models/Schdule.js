const mongoose = require("mongoose");

const schduleSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  events: { type: Array, required: true },
});

const schdule = mongoose.model("Schdule", schduleSchema);

module.exports = schdule;
