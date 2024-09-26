import React, { createContext, useState } from 'react';

// Create TokenContext
export const TokenContext = createContext();

// TokenProvider component to wrap around the app
export const TokenProvider = ({ children }) => {
  const [rooms, setRooms] = useState({
    room1: { tokens: [], currentToken: null },
    room2: { tokens: [], currentToken: null },
  });

  const generateToken = (room) => {
    const newToken = rooms[room].tokens.length + 1; // Generate new token number
    setRooms((prevRooms) => ({
      ...prevRooms,
      [room]: {
        ...prevRooms[room],
        tokens: [...prevRooms[room].tokens, newToken],
      },
    }));
  };

  const callNextToken = (room) => {
    if (rooms[room].tokens.length > 0) {
      const [nextToken, ...remainingTokens] = rooms[room].tokens;
      setRooms((prevRooms) => ({
        ...prevRooms,
        [room]: {
          ...prevRooms[room],
          currentToken: nextToken,
          tokens: remainingTokens,
        },
      }));
    }
  };

  return (
    <TokenContext.Provider value={{ rooms, generateToken, callNextToken }}>
      {children}
    </TokenContext.Provider>
  );
};
