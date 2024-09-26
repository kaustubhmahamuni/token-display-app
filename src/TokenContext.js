import React, { createContext, useState, useEffect } from 'react';

// Create the context
const TokenContext = createContext();

// Token provider component
const TokenProvider = ({ children }) => {
  const initialRooms = Array.from({ length: 15 }, (_, i) => ({
    name: `Room ${i + 1}`,
    queue: [],
    tokenCounter: 1,
    servingToken: null,
  }));

  const [rooms, setRooms] = useState(() => {
    const savedRooms = localStorage.getItem('rooms');
    return savedRooms ? JSON.parse(savedRooms) : initialRooms;
  });

  useEffect(() => {
    localStorage.setItem('rooms', JSON.stringify(rooms));
  }, [rooms]);

  return (
    <TokenContext.Provider value={{ rooms, setRooms }}>
      {children}
    </TokenContext.Provider>
  );
};

// Export both the context and provider
export { TokenContext, TokenProvider };
