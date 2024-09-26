import React, { useState, useEffect } from 'react';
import TokenDisplay from './TokenDisplay';
import './App.css';

const App = () => {
  const initialRooms = [
    { name: 'Room 1', queue: [], tokenCounter: 1, servingToken: null, totalTokensGenerated: 0 },
    { name: 'Room 2', queue: [], tokenCounter: 1, servingToken: null, totalTokensGenerated: 0 },
    { name: 'Room 3', queue: [], tokenCounter: 1, servingToken: null, totalTokensGenerated: 0 },
  ];

  const [rooms, setRooms] = useState(() => {
    const savedRooms = localStorage.getItem('rooms');
    return savedRooms ? JSON.parse(savedRooms) : initialRooms;
  });

  const [lastResetDate, setLastResetDate] = useState(() => {
    return localStorage.getItem('lastResetDate') || new Date().toISOString().split('T')[0]; // Default to today
  });

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (today !== lastResetDate) {
      resetTokens();
      setLastResetDate(today);
      localStorage.setItem('lastResetDate', today);
    }
    localStorage.setItem('rooms', JSON.stringify(rooms));
  }, [rooms, lastResetDate]);

  const addToQueue = (roomIndex) => {
    const newToken = rooms[roomIndex].tokenCounter;
    const newQueue = [...rooms[roomIndex].queue, newToken];

    setRooms((prevRooms) =>
      prevRooms.map((room, index) =>
        index === roomIndex
          ? {
              ...room,
              queue: newQueue,
              tokenCounter: room.tokenCounter + 1,
              totalTokensGenerated: room.totalTokensGenerated + 1,
            }
          : room
      )
    );
  };

  const serveNextPatient = (roomIndex) => {
    const currentQueue = rooms[roomIndex].queue;

    if (currentQueue.length > 0) {
      const [nextToken, ...remainingQueue] = currentQueue;

      setRooms((prevRooms) =>
        prevRooms.map((room, index) =>
          index === roomIndex
            ? { ...room, queue: remainingQueue, servingToken: nextToken }
            : room
        )
      );
    } else {
      alert(`No patients in queue for ${rooms[roomIndex].name}`);
    }
  };

  // Function to reset all rooms manually
  const resetTokens = () => {
    const resetRooms = initialRooms.map(room => ({
      ...room,
      queue: [],
      tokenCounter: 1,
      servingToken: null,
      totalTokensGenerated: 0,
    }));
    setRooms(resetRooms);
  };

  return (
    <div>
      <h1>Medical Token Display System</h1>
      {/* Reset button added here */}
      <button onClick={resetTokens} style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#ff4d4d', color: '#fff', border: 'none', borderRadius: '5px' }}>
        Reset All Tokens
      </button>
      <div className="container">
        {rooms.map((room, index) => (
          <div key={index} className="room">
            <h2>{room.name}</h2>
            <TokenDisplay
              queue={room.queue}
              servingToken={room.servingToken}
              totalTokensGenerated={room.totalTokensGenerated}
            />
            <button onClick={() => addToQueue(index)}>Generate Token</button>
            <button onClick={() => serveNextPatient(index)}>Serve Next Patient</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
