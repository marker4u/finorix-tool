const { signals } = require('./_store');

module.exports = function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = req.body || {};

  // Normalize: TradingView sends "action", UI sends "direction"
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

  return res.status(201).json(signal);
};
