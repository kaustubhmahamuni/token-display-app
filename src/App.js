import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TokenDisplay from './TokenDisplay';
import ManageTokens from './ManageTokens';
import { TokenProvider } from './TokenContext'; // Import TokenProvider
import './App.css';

const App = () => {
  // Auto-refresh functionality
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // Logic to refresh data
  //     window.location.reload(); // This will refresh the entire app
  //   }, 000); // Set the interval to 30 seconds (30000 milliseconds)

  //   return () => clearInterval(interval); // Cleanup on unmount
  // }, []);

  return (
    <TokenProvider>
      <Router>
        <Routes>
          <Route path="/" element={<TokenDisplay />} />
          <Route path="/manage" element={<ManageTokens />} />
        </Routes>
      </Router>
    </TokenProvider>
  );
};

export default App;
