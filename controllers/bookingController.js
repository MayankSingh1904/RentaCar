const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
  try {
    const userId = req.user?.id;
    const userName = req.user?.name || "";

    const {
      email,
      phone,
      car,
      type,
      city,
      pickupBranch,
      pickupDate,
      returnDate,
      days,
      amount,
    } = req.body;

    // Validate required fields
    if (
      !userId ||
      !email ||
      !phone ||
      !car ||
      !type ||
      !city ||
      !pickupBranch ||
      !pickupDate ||
      !returnDate ||
      !days ||
      !amount
    ) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    // Extra validation for car object keys
    if (
      !car.name ||
      !car.model ||
      !car.mileage ||
      !car.transmission ||
      !car.price ||
      !car.img
    ) {
      return res.status(400).json({ message: "Car details incomplete" });
    }

    // Create booking
    const booking = new Booking({
      user: userId,
      userName,
      email,
      phone,
      car,
      type,
      city,
      pickupBranch,
      pickupDate: new Date(pickupDate),
      returnDate: new Date(returnDate),
      days,
      amount,
    });

    await booking.save();
    return res.status(201).json({ message: "Booking created successfully", booking });
  } catch (error) {
    console.error("Booking creation error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    // Populate user details from User collection
    const bookings = await Booking.find().populate('user', 'name email');
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.getUserBookings = async (req, res) => {
  try {
    const email = req.user?.email;
    if (!email) {
      return res.status(400).json({ message: 'Email missing from token' });
    }

    const bookings = await Booking.find({ email }).sort({ pickupDate: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    res.status(500).json({ message: 'Server error' });
  }
};