import React, { useState, useEffect } from 'react';

const TokenDisplay = () => {
  const [rooms, ] = useState(() => {
    const savedRooms = localStorage.getItem('rooms');
    return savedRooms ? JSON.parse(savedRooms) : [
      { name: 'Room 1', servingToken: 0 },
      { name: 'Room 2', servingToken: 0 },
      { name: 'Room 3', servingToken: 0 },
      { name: 'Room 4', servingToken: 0 }, // New Room
      { name: 'Room 5', servingToken: 0 }, // New Room
      { name: 'Room 6', servingToken: 0 }, // New Room
      { name: 'Room 7', servingToken: 0 }, // New Room
      { name: 'Room 8', servingToken: 0 }, // New Room
      { name: 'Room 9', servingToken: 0 }, // New Room
      { name: 'Room 10', servingToken: 0 }, // New Room
      { name: 'Room 11', servingToken: 0 }, // New Room
      { name: 'Room 12', servingToken: 0 }, // New Room
      { name: 'Room 13', servingToken: 0 }, // New Room
      { name: 'Room 14', servingToken: 0 }, // New Room
      { name: 'Room 15', servingToken: 0 }, // New Room
    ];
  });

  useEffect(() => {
    localStorage.setItem('rooms', JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Logic to refresh data
      window.location.reload(); // This will refresh the entire app
    }, 1000); // Set the interval to 1 second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div>
      {/* <h1>Currently Serving Tokens</h1> */}
      <div className="container">
        {rooms.map((room, index) => (
          <div key={index} className="room">
            <h2>{room.name}</h2>
            <div className="serving-token">
              {room.servingToken !== null ? `Token: ${room.servingToken}` : 'No token being served'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TokenDisplay;
