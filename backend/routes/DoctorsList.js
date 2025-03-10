// routes/profile.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Get all doctors
router.get('/doctors', async (req, res) => {
  try {
    // Fetch all fields except the password
    const doctors = await User.find({ role: 'Doctor' }).select('-password');
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching doctors' });
  }
});

module.exports = router;
