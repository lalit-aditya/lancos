const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true }, // Store image URL
  description: { type: String, required: true },
  pricing: { type: Number, required: true },
});

const Service = mongoose.model("Service", serviceSchema);
module.exports = Service;
