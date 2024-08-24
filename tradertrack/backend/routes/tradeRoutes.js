const express = require('express');
const jwt = require('jsonwebtoken');
const Trade = require('../models/Daily.report');
const User = require('../models/User');
const mongoose = require('mongoose');


const router = express.Router();

// Middleware to verify token and get user
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;


  if (token) {
    const token = req.headers.authorization.split(' ')[1];
    console.log("Extracted Token:", token);

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded Token:", decoded);

     //const user = await User.findOne({ _id: "66c77f12b2bc1891e4e20a1b" });
      //console.log(user);


      const user = await User.findById(decoded.user.id);
      console.log("Fetched User:", user);

      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      req.user = user;
      next();
    } catch (err) {
      console.error("Error during token verification:", err);
      return res.status(401).json({ message: 'Invalid token' });
    }
  } else {
    return res.status(401).json({ message: 'Unauthorized, no token provided' });
  }
};

  
// Route to save a new trade for the logged-in user
router.post('/trades', verifyToken, async (req, res) => {
  try {
    const { tradingStrategy, tradingPlan, amountTraded, riskManagement, entryPoint, exitPoint, indicatorsUsed, timeFrame, screenshot, tradeDate } = req.body;

    const newTrade = new Trade({
      user: req.user._id,
      tradingStrategy,
      tradingPlan,
      amountTraded,
      riskManagement,
      entryPoint,
      exitPoint,
      indicatorsUsed,
      timeFrame,
      screenshot,
      tradeDate,
    });

    const savedTrade = await newTrade.save();
    res.status(201).json(savedTrade);
  } catch (err) {
    res.status(500).json({ message: 'Error saving trade', error: err });
  }
});

// Route to get all trades for the logged-in user
router.get('/trades', verifyToken, async (req, res) => {
  try {
    const trades = await Trade.find({ user: req.user._id });
    res.json(trades);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching trades', error: err });
  }
});

module.exports = router;
