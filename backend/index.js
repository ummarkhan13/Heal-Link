// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const doctorRoutes = require('./routes/DoctorsList');
const appointmentRoutes = require('./routes/appointments');
const paymentRoutes = require('./routes/payments'); // Import payment routes

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req,res)=>{
  res.status(200).json("Hello World")
})

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', profileRoutes);
app.use('/api', doctorRoutes);
app.use('/api', appointmentRoutes);
app.use('/api', paymentRoutes); // Add payment routes

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((error) => console.error('DB Connection Error:', error));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
