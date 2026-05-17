import React, { useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL || '';

export default function SignalForm() {
  const [symbol, setSymbol] = useState('');
  const [direction, setDirection] = useState('BUY');
  const [price, setPrice] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!symbol.trim()) return;

    setSubmitting(true);
    try {
      await fetch(`${API_URL}/api/signal`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symbol: symbol.trim(),
          direction,
          price: price ? parseFloat(price) : null,
        }),
      });
      setSymbol('');
      setPrice('');
    } catch (err) {
      console.error('Failed to send signal:', err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="signal-form-card">
      <div className="signal-form-title">Send New Signal</div>
      <form className="signal-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="symbol">Symbol</label>
          <input
            id="symbol"
            className="form-input"
            type="text"
            placeholder="e.g. BTCUSDT"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="direction">Direction</label>
          <select
            id="direction"
            className="form-select"
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
          >
            <option value="BUY">BUY</option>
            <option value="SELL">SELL</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="price">Price (optional)</label>
          <input
            id="price"
            className="form-input"
            type="number"
            step="any"
            placeholder="e.g. 67500"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button className="btn-submit" type="submit" disabled={submitting || !symbol.trim()}>
          {submitting ? 'Sending...' : 'Send Signal'}
        </button>
      </form>
    </div>
  );
}
