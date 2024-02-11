import React from 'react';


const Loading = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-message">
        <h2>Loading...</h2>
        <div className="loader"></div>
      </div>
    </div>
  );
};

export default Loading;