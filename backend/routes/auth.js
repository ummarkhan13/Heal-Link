// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const user = require('../models/user');
const verifyToken = require('../middlewares/auth');

const router = express.Router();




// Registration Route
router.post('/register', async (req, res) => {

  console.log("hello everone");
  const { email, password, ...rest } = req.body;
console.log(email,password);

  try {
    const existingUser = await user.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email is already used' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, ...rest });
    await newUser.save();
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error',error });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



// Protected Route Example
router.get('/protected', verifyToken, (req, res) => {
  res.status(200).json({ message: 'Welcome to the protected route!', user: req.user });
});



router.get('/', async (req, res) => {
  try {
    // Fetch user details from the database
    const userDetails = await user.find();
    
    // Send the user details as a response
    res.status(200).json(userDetails);
  } catch (error) {
    // Handle errors and send a meaningful response
    console.error('Error fetching user details:', error.message);
    res.status(500).json({ message: 'Failed to fetch user details', error: error.message });
  }
});


// Home Route (Protected)
router.get('/home', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid Token' });
    res.status(200).json({ message: 'Welcome to the home page!' });
  });
});

module.exports = router;
