const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  city: { type: String, required: true },         // e.g., Delhi, Jaipur
  type: { type: String, required: true },         // premium, family, everyday
  name: { type: String, required: true },
  model: { type: String, required: true },
  mileage: { type: String, required: true },
  transmission: { type: String, required: true },
  price: { type: Number, required: true },        // store as number (e.g. 7000)
  img: { type: String, default: "/images/default-car.jpg" },
}, { timestamps: true });

module.exports = mongoose.model('Car', carSchema);
