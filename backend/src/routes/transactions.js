const express = require('express');
const authenticate = require('../middleware/authenticate');
const Transaction = require('../models/Transaction'); 
const axios = require('axios');

const router = express.Router();

// Fetch transactions from Teller API and save them to the database
router.get('/fetch', authenticate, async (req, res) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    const userId = decoded.userId;

    // Fetch transactions from Teller API
    const tellerToken = 'YOUR_TELLER_ACCESS_TOKEN'; // Replace with the logic to get the Teller token
    const response = await axios.get('https://api.teller.io/accounts', {
      headers: {
        Authorization: `Bearer ${tellerToken}`,
      },
    });

    const transactions = response.data;
    // Save transactions to the database
    for (const txn of transactions) {
      await Transaction.create({
        userId,
        date: txn.date,
        description: txn.description,
        amount: txn.amount,
        type: txn.type,
        category: txn.category,
      });
    }

    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Failed to fetch transactions. Please try again.' });
  }
});

// Get all transactions for the authenticated user
router.get('/', authenticate, async (req, res) => {
  try {
    const transactions = await Transaction.findAll({ where: { userId: req.user.id } });
    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Failed to fetch transactions. Please try again.' });
  }
});

module.exports = router;
