import React from 'react';

const TokenDisplay = ({ currentToken }) => {
  return (
    <div style={{ fontSize: '24px', margin: '10px', padding: '20px', border: '1px solid #ccc' }}>
      {currentToken ? `Current Token: ${currentToken}` : 'No Token Issued'}
    </div>
  );
};

export default TokenDisplay;
