const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const carRoutes = require('./routes/carRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const app = express();
// Connect to DB first
connectDB();
// Middleware
app.use(cors());
app.use(express.json());
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/bookings', bookingRoutes);
app.get('/', (req, res) => {
  res.send('Car Rental API is running');
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

