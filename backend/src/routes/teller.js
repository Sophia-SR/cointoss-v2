const express = require('express');
const axios = require('axios');
const authenticate = require('../middleware/authenticate');
const Transaction = require('../models/Transaction');
const router = express.Router();

router.post('/exchange_token', authenticate, async (req, res) => {
  const { publicToken } = req.body;
  try {
    const response = await axios.post('https://api.teller.io/auth/token', {
      public_token: publicToken
    }, {
      headers: {
        Authorization: `Bearer ${process.env.TELLER_API_KEY}`
      }
    });

    const { access_token } = response.data;

    req.user.tellerAccessToken = access_token;
    await req.user.save();

    res.status(200).json({ accessToken: access_token });
  } catch (error) {
    console.error('Error exchanging token:', error);
    res.status(500).json({ message: 'Error exchanging token', error: error.message });
  }
});

router.get('/transactions', authenticate, async (req, res) => {
  try {
    const response = await axios.get('https://api.teller.io/accounts', {
      headers: {
        Authorization: `Bearer ${req.user.tellerAccessToken}`
      }
    });

    const transactions = response.data.map(t => ({
      date: t.date,
      description: t.description,
      amount: t.amount,
      category: t.category,
      type: t.amount < 0 ? 'expense' : 'income',
      userId: req.user.id,
    }));

    await Transaction.bulkCreate(transactions);

    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Error fetching transactions', error: error.message });
  }
});

module.exports = router;
