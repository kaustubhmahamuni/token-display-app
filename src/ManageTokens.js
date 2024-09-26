import React, { useContext } from 'react';
import { TokenContext } from './TokenContext'; // Import TokenContext
// import './manage.css';


const ManageTokens = () => {
  const { rooms, setRooms } = useContext(TokenContext); // Access the shared state

  const addToQueue = (roomIndex) => {
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

  const resetTokensForRoom = (roomIndex) => {
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

  const resetAllTokens = () => {
    if (window.confirm('Are you sure you want to reset all tokens?')) {
      const initialRooms = [
        { name: 'Room 1', queue: [], tokenCounter: 1, servingToken: null },
        { name: 'Room 2', queue: [], tokenCounter: 1, servingToken: null },
        { name: 'Room 3', queue: [], tokenCounter: 1, servingToken: null },
        { name: 'Room 4', queue: [], tokenCounter: 1, servingToken: null },
        { name: 'Room 5', queue: [], tokenCounter: 1, servingToken: null },
        { name: 'Room 6', queue: [], tokenCounter: 1, servingToken: null },
        { name: 'Room 7', queue: [], tokenCounter: 1, servingToken: null },
        { name: 'Room 8', queue: [], tokenCounter: 1, servingToken: null },
        { name: 'Room 9', queue: [], tokenCounter: 1, servingToken: null },
        { name: 'Room 10', queue: [], tokenCounter: 1, servingToken: null },
        { name: 'Room 11', queue: [], tokenCounter: 1, servingToken: null },
        { name: 'Room 12', queue: [], tokenCounter: 1, servingToken: null },
        { name: 'Room 13', queue: [], tokenCounter: 1, servingToken: null },
        { name: 'Room 14', queue: [], tokenCounter: 1, servingToken: null },
        { name: 'Room 15', queue: [], tokenCounter: 1, servingToken: null },
      ];
      setRooms(initialRooms);
      localStorage.removeItem('rooms'); // Clear localStorage to reset all rooms
      alert('All tokens have been reset!');
    }
  };

  return (
    <div>
      {/* <h1>Manage Tokens</h1> */}
      <div className="container">
        {rooms.map((room, index) => (
          <div key={index} className="room">
            <h2>{room.name}</h2>
            <p>Currently Serving: {room.servingToken || 'No token being served'}</p>
            <p>Token: {room.queue.length > 0 ? room.queue[room.queue.length - 1] : 'No tokens generated'}</p>
            <div className="button-container">
              <button onClick={() => addToQueue(index)}>Generate Token</button>
              <button onClick={() => serveNextPatient(index)}>Next Patient</button>
            </div>
            <button onClick={() => resetTokensForRoom(index)} style={{ backgroundColor: '#ffcc00', marginTop: '10px' }}>
              Reset Room Tokens
            </button>
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button onClick={resetAllTokens} style={{ backgroundColor: '#ff4d4d' }}>
          Reset All Tokens
        </button>
      </div>
    </div>
  );
};

export default ManageTokens;
