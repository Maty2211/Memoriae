import React from 'react';
import './BackgroundCarousel.css';

const BackgroundCarousel = ({ imageUrl }) => {
  return (
    <div 
      className="background-carousel" 
      style={{ backgroundImage: `url(${imageUrl})` }}
    />
  );
};

export default BackgroundCarousel;