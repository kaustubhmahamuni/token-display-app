import React, { useContext } from 'react';
import { TokenContext } from '../context/TokenContext';

const RoomDisplay = ({ room }) => {
  const { rooms } = useContext(TokenContext);
  const { currentToken, tokens } = rooms[room];

  return (
    <div className="room-display">
      <h2>{`Room ${room.charAt(room.length - 1)}`}</h2>
      <h3>{`Now Serving: ${currentToken || "No tokens being served"}`}</h3>
      
      {/* Token Box */}
      <div className="token-box">
        <h4>Waiting Tokens:</h4>
        {tokens.length > 0 ? (
          tokens.map((token, index) => (
            <p key={index}>{`Token ${token}`}</p>
          ))
        ) : (
          <p>No waiting tokens</p>
        )}
      </div>
    </div>
  );
};

export default RoomDisplay;
