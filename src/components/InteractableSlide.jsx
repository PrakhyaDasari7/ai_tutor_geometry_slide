import React from 'react';
import './InteractableSlide.css';

const InteractableSlide = ({ children }) => {
  return (
    <div className="interactable-slide">
      {children}
    </div>
  );
};

export default InteractableSlide;