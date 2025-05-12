import React, { useState, useEffect } from 'react';
import './InteractableSlide.css';
import QuestionSlide from './QuestionSlide';
import mockData from '../mockData';

const InteractableSlide = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setSocket(ws);

    ws.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Message from server:', data);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleStartSession = (dialog) => {
    if (socket) {
      socket.send(JSON.stringify({ type: 'dialog', dialog }));
    }
  };

  const slides = mockData.map((data, index) => (
    <QuestionSlide
      key={index}
      questionIndex={data.questionIndex}
      onStartSession={handleStartSession}
    />
  ));

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  return (
    <div className="interactable-slide">
      {slides[currentSlide]}
      <button onClick={handleNextSlide} className="next-slide-button">
        &gt;
      </button>
    </div>
  );
};

export default InteractableSlide;