import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Header from './components/Header';
import SignalForm from './components/SignalForm';
import SignalList from './components/SignalList';

const SOCKET_URL = process.env.REACT_APP_API_URL || '';

export default function App() {
  const [signals, setSignals] = useState([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Fetch existing signals on mount
    fetch(`${SOCKET_URL}/api/signals`)
      .then((res) => res.json())
      .then((data) => setSignals(data))
      .catch((err) => console.error('Failed to fetch signals:', err));

    // Connect to Socket.IO for live updates
    const socket = io(SOCKET_URL, { transports: ['websocket', 'polling'] });

    socket.on('connect', () => setConnected(true));
    socket.on('disconnect', () => setConnected(false));

    socket.on('new_signal', (signal) => {
      setSignals((prev) => [signal, ...prev]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="app">
      <Header connected={connected} />
      <main className="main-content">
        <SignalForm />
        <SignalList signals={signals} />
      </main>
    </div>
  );
}
