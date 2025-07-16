const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middlewares/authMiddleware');
const { createBooking, getAllBookings , getUserBookings} = require('../controllers/bookingController');
router.get('/my-bookings', protect, getUserBookings);
router.post('/', protect, createBooking);
router.get('/', protect, authorizeRoles("admin"), getAllBookings);
module.exports = router;
