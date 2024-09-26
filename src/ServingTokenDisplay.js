import React from 'react';

const ServingTokenDisplay = ({ servingToken }) => {
  return (
    <div className="serving-token-display">
      {servingToken ? (
        <div><strong>Currently Serving Token:</strong> {servingToken}</div>
      ) : (
        <div>No Token Currently Being Served</div>
      )}
    </div>
  );
};

export default ServingTokenDisplay;
