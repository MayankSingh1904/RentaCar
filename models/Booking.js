const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // <-- Add user reference
  email: { type: String, required: true },
  phone: { type: String, required: true },
  car: {
    name: String,
    model: String,
    mileage: String,
    transmission: String,
    price: Number,
    img: String,
  },
  type: { type: String, required: true },  // premium, family, everyday
  city: { type: String, required: true },
  pickupBranch: { type: String, required: true },
  pickupDate: { type: Date, required: true },
  returnDate: { type: Date, required: true },
  days: { type: Number, required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: "Confirmed" },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
