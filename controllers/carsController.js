const Car = require('../models/Car');
// GET /api/cars?city=CityName
exports.getCars = async (req, res) => {
  try {
    const city = req.query.city;
    const filter = city ? { city } : {};
    const cars = await Car.find(filter);
    res.json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ message: "Server error" });
  }
};
// POST /api/cars
exports.createCar = async (req, res) => {
  try {
    const { city, type, name, model, mileage, transmission, price, img } = req.body;
    if (!city || !type || !name || !model || !mileage || !transmission || !price) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const newCar = new Car({
      city,
      type,
      name,
      model,
      mileage,
      transmission,
      price,
      img: img || "", // optional
    });
    const savedCar = await newCar.save();
    res.status(201).json(savedCar);
  } catch (error) {
    console.error("Error creating car:", error);
    res.status(500).json({ message: "Server error" });
  }
};
// DELETE /api/cars/:id
exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.json({ message: "Car deleted" });
  } catch (error) {
    console.error("Error deleting car:", error);
    res.status(500).json({ message: "Server error" });
  }
};
