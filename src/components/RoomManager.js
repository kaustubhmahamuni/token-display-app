import React, { useContext, useState } from 'react';
import { TokenContext } from '../context/TokenContext';
import RoomDisplay from './RoomDisplay';

const RoomManager = () => {
  const { generateToken, callNextToken, rooms } = useContext(TokenContext);
  const [selectedRoom, setSelectedRoom] = useState('room1');

  const handleGenerateToken = () => {
    generateToken(selectedRoom);
  };

  const handleCallNextToken = () => {
    callNextToken(selectedRoom);
  };

  return (
    <div className="room-manager">
      <h2>Room Manager</h2>

      <label htmlFor="room-select">Select Room:</label>
      <select
        id="room-select"
        value={selectedRoom}
        onChange={(e) => setSelectedRoom(e.target.value)}
      >
        {Object.keys(rooms).map((room) => (
          <option key={room} value={room}>{`Room ${room.charAt(room.length - 1)}`}</option>
        ))}
      </select>

      <div className="buttons">
        <button onClick={handleGenerateToken}>Generate Token</button>
        <button onClick={handleCallNextToken}>Call Next Token</button>
      </div>

      {/* Display the selected room's token status */}
      <RoomDisplay room={selectedRoom} />
    </div>
  );
};

export default RoomManager;
