import React from 'react';

function formatTime(isoString) {
  const date = new Date(isoString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function formatPrice(price) {
  if (price === null || price === undefined) return '--';
  return price.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  });
}

export default function SignalList({ signals }) {
  return (
    <div className="signal-list-card">
      <div className="signal-list-header">
        <div className="signal-list-title">Live Signals</div>
        <div className="signal-count">{signals.length}</div>
      </div>
      {signals.length === 0 ? (
        <div className="signal-list-empty">
          No signals yet. Send one above or connect a TradingView webhook.
        </div>
      ) : (
        <div role="list">
          {signals.map((signal, index) => (
            <div
              key={signal.id}
              className={`signal-item${index === 0 ? ' signal-new' : ''}`}
              role="listitem"
            >
              <div className="signal-left">
                <span className={`signal-direction-badge ${signal.direction.toLowerCase()}`}>
                  {signal.direction}
                </span>
                <span className="signal-symbol">{signal.symbol}</span>
              </div>
              <div className="signal-right">
                <span className="signal-price">{formatPrice(signal.price)}</span>
                <span className="signal-time">{formatTime(signal.timestamp)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
