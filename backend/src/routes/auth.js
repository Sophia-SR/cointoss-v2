const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const users = require('../data/users'); // Import the shared users array

const router = express.Router();

// Middleware to authenticate the user based on JWT token
const authenticate = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    req.user = users.find(user => user.id === decoded.userId);
    if (!req.user) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Signup route
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { id: users.length + 1, name, email, password: hashedPassword };
    users.push(user);
    console.log('User signed up:', user); // Log the new user details
    res.status(201).json(user);
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Failed to sign up. Please try again.' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  console.log('Login attempt for user:', user); // Log the user details

  if (!user) {
    console.log('User not found');
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const isValid = await bcrypt.compare(password, user.password);
  console.log('Password is valid:', isValid); // Log the result of password comparison

  if (!isValid) {
    console.log('Invalid password');
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'your_jwt_secret');
  res.json({ token });
});

module.exports = router;