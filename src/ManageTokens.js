import React, { useContext } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get the roomId from the URL
import { TokenContext } from './TokenContext'; // Import TokenContext

const ManageTokens = () => {
  const { rooms, setRooms } = useContext(TokenContext); // Access the shared state
  const { roomId } = useParams(); // Get the room index from the URL
  const roomIndex = parseInt(roomId, 10) - 1; // Convert the roomId to a zero-based index

  const addToQueue = () => {
    const newToken = rooms[roomIndex].tokenCounter;
    const newQueue = [...rooms[roomIndex].queue, newToken];

    setRooms((prevRooms) =>
      prevRooms.map((room, index) =>
        index === roomIndex
          ? { ...room, queue: newQueue, tokenCounter: room.tokenCounter + 1 }
          : room
      )
    );
  };

  const serveNextPatient = () => {
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

  const resetTokensForRoom = () => {
    if (window.confirm(`Are you sure you want to reset tokens for ${rooms[roomIndex].name}?`)) {
      const newRooms = [...rooms];
      newRooms[roomIndex] = {
        ...newRooms[roomIndex],
        queue: [],
        tokenCounter: 1,
        servingToken: null,
      };
      setRooms(newRooms);
      localStorage.setItem('rooms', JSON.stringify(newRooms)); // Update localStorage
      alert(`Tokens for ${rooms[roomIndex].name} have been reset!`);
    }
  };

  return (
    <div>
      <h2>Manage {rooms[roomIndex].name}</h2>
      <p>Currently Serving: {rooms[roomIndex].servingToken || 'No token being served'}</p>
      <p>Token: {rooms[roomIndex].queue.length > 0 ? rooms[roomIndex].queue[rooms[roomIndex].queue.length - 1] : 'No tokens generated'}</p>
      <div className="button-container">
        <button onClick={addToQueue}>Generate Token</button>
        <button onClick={serveNextPatient}>Next Patient</button>
      </div>
      <button onClick={resetTokensForRoom} style={{ backgroundColor: '#ffcc00', marginTop: '10px' }}>
        Reset Room Tokens
      </button>
    </div>
  );
};

export default ManageTokens;
