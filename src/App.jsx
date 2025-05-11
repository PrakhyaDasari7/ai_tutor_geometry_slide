import React, { useState } from 'react';
import InteractableSlide from './components/InteractableSlide';
import QuestionSlide from './components/QuestionSlide';

const App = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    <QuestionSlide key={0} question="What is the area of a triangle?" />, // First question slide
    <QuestionSlide key={1} question="What is the Pythagorean theorem?" />, // Second question slide
  ];

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  return (
    <InteractableSlide>
      {slides[currentSlide]}
      <button onClick={handleNextSlide} className="next-slide-button">
        &gt;
      </button>
    </InteractableSlide>
  );
};

export default App;
