import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import TokenDisplay from './TokenDisplay';
import ManageTokens from './ManageTokens';
import { TokenProvider } from './TokenContext'; 
import './App.css';

const App = () => {
  return (
    <TokenProvider>
      <Router>
        <Routes>
          <Route path="/" element={<TokenDisplay />} />
          <Route path="#/manage" element={<ManageTokens />} />
        </Routes>
      </Router>
    </TokenProvider>
  );
};

export default App;
