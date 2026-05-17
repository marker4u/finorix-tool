import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from './components/Header';
import SignalForm from './components/SignalForm';
import SignalList from './components/SignalList';

const API_URL = process.env.REACT_APP_API_URL || '';
const POLL_INTERVAL = 3000; // poll every 3 seconds

export default function App() {
  const [signals, setSignals] = useState([]);
  const [connected, setConnected] = useState(false);
  const lastCountRef = useRef(0);

  const fetchSignals = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/signals`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setSignals(data);
      lastCountRef.current = data.length;
      setConnected(true);
    } catch {
      setConnected(false);
    }
  }, []);

  useEffect(() => {
    // Initial fetch
    fetchSignals();

    // Poll for new signals
    const interval = setInterval(fetchSignals, POLL_INTERVAL);

    return () => clearInterval(interval);
  }, [fetchSignals]);

  return (
    <div className="app">
      <Header connected={connected} />
      <main className="main-content">
        <SignalForm onSignalSent={fetchSignals} />
        <SignalList signals={signals} />
      </main>
    </div>
  );
}
