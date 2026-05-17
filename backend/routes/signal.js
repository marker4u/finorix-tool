const express = require('express');
const router = express.Router();

// In-memory signal storage
const signals = [];

// Attach Socket.IO instance via middleware
let io = null;

function setIO(socketIO) {
  io = socketIO;
}

// GET /api/signals — return all stored signals
router.get('/signals', (req, res) => {
  res.json(signals);
});

// POST /api/signal — accept manual signals from UI or TradingView webhooks
router.post('/signal', (req, res) => {
  const body = req.body;

  // Normalize the incoming payload
  // TradingView sends: { "symbol": "...", "action": "buy/sell", "price": "..." }
  // UI sends: { "symbol": "...", "direction": "BUY/SELL", "price": "..." }
  const symbol = (body.symbol || '').toUpperCase().trim();
  const direction = (body.direction || body.action || '').toUpperCase().trim();
  const price = body.price ? parseFloat(body.price) : null;

  if (!symbol || !direction) {
    return res.status(400).json({ error: 'Missing required fields: symbol and direction/action' });
  }

  if (!['BUY', 'SELL'].includes(direction)) {
    return res.status(400).json({ error: 'Direction must be BUY or SELL' });
  }

  const signal = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
    symbol,
    direction,
    price,
    timestamp: new Date().toISOString(),
  };

  signals.unshift(signal); // newest first

  // Broadcast to all connected clients
  if (io) {
    io.emit('new_signal', signal);
  }

  res.status(201).json(signal);
});

module.exports = { router, setIO };
