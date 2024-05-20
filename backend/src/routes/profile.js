const express = require('express');
const bcrypt = require('bcryptjs');
const authenticate = require('../middleware/authenticate');
const User = require('../models/User');

const router = express.Router();

// Profile route to get the current user's profile
router.get('/', authenticate, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ name: user.name, email: user.email });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Failed to fetch profile. Please try again.' });
  }
});

// Update the current user's profile
router.put('/', authenticate, async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.name = name;
    user.email = email;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }
    await user.save();
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Error updating profile' });
  }
});

module.exports = router;
