const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middlewares/authMiddleware');
const {
  getCars,
  createCar,
  deleteCar,
} = require('../controllers/carsController');

router.get('/', getCars); // Public: get all cars or by city filter

// Protected routes for admin only
router.post('/', protect, authorizeRoles("admin"), createCar);
router.delete('/:id', protect, authorizeRoles("admin"), deleteCar);

module.exports = router;
