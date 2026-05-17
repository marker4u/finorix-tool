import React from 'react';

export default function Header({ connected }) {
  return (
    <header className="header">
      <div className="header-brand">
        <div className="header-logo" aria-hidden="true">A</div>
        <div>
          <div className="header-title">Arman AI Signal</div>
          <div className="header-subtitle">Pro Edition</div>
        </div>
      </div>
      <div className="header-status">
        <span
          className="status-dot"
          style={{ backgroundColor: connected ? '#00c853' : '#ff3d57' }}
          aria-hidden="true"
        />
        <span>{connected ? 'Live' : 'Disconnected'}</span>
      </div>
    </header>
  );
}
