// 3. Define your resource and schema 

const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  name: { type: String, required: true },
  carModel: { type: Number, required: true },
  carColor: { type: String, required: true },
  carNumber: { type: String, required: true, unique: true },
  Millage: { type: Number, required: true },
});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;