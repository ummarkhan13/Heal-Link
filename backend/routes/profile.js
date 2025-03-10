// routes/profile.js
const express = require('express');
const User = require('../models/user');
const verifyToken = require('../middlewares/auth');


const router = express.Router();

// Get User Profile
router.get('/profile', verifyToken, async (req, res) => {

  try {
    // Fetch the user details from the database using the user ID from the JWT
    const user = await User.findById(req.user.id).select('-password'); // Exclude the password field from the response

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user profile', error: error.message });
  }
});


router.put('/Editprofile', async (req, res) => {
  try {
    const { _id, ...updateData } = req.body;
    const updatedUser = await User.findByIdAndUpdate(_id, updateData, {
      new: true,
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update profile', error });
  }
});


module.exports = router;

