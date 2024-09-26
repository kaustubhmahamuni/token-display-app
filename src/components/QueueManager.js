import React, { useContext, useState } from 'react';
import { TokenContext } from '../context/TokenContext';

const QueueManager = () => {
  const { generateToken, callNextToken } = useContext(TokenContext);
  const [selectedRoom, setSelectedRoom] = useState('room1');

  const handleGenerateToken = () => {
    generateToken(selectedRoom);
  };

  const handleCallNextToken = () => {
    callNextToken(selectedRoom);
  };

  return (
    <div className="queue-manager">
      <h2>Queue Manager</h2>
      
      <label htmlFor="room-select">Select Room:</label>
      <select
        id="room-select"
        value={selectedRoom}
        onChange={(e) => setSelectedRoom(e.target.value)}
      >
        <option value="room1">Room 1</option>
        <option value="room2">Room 2</option>
        {/* Add more rooms as needed */}
      </select>

      <div className="buttons">
        <button onClick={handleGenerateToken}>Generate Token</button>
        <button onClick={handleCallNextToken}>Call Next Token</button>
      </div>
    </div>
  );
};

export default QueueManager;
