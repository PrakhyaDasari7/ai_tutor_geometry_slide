import React, { useState } from 'react';
import mockData from '../mockData';

const QuestionSlide = ({ questionIndex, onStartSession }) => {
  const [dialogIndex, setDialogIndex] = useState(0);

  const questionData = mockData.find((data) => data.questionIndex === questionIndex);

  const handleStartSession = () => {
    if (onStartSession && questionData) {
      const dialog = questionData.subQuestions[dialogIndex]?.tutoringDialogues;
      if (dialog) {
        onStartSession(dialog);
        setDialogIndex((prevIndex) => (prevIndex + 1) % questionData.subQuestions.length);
      }
    }
  };

  return (
    <>
      <button
        data-role="interactable"
        data-type="button"
        className="start-button"
        onClick={handleStartSession}
      >
        Start
      </button>

      <div data-role="interactable" data-type="panel" className="problem-panel" style={{ fontSize: '1.2em' }}>
        <h5>Problem Panel</h5>
        {questionData?.problemStatement || 'No question available'}
      </div>

      <div data-role="interactable" data-type="canvas" className="diagram-canvas" style={{ fontSize: '1.2em' }}>
        <h5>Diagram Canvas</h5>
        {questionData?.subQuestions[dialogIndex]?.diagramPath ? (
          <img
            src={questionData.subQuestions[dialogIndex].diagramPath}
            alt="Diagram"
            className="diagram-image"
          />
        ) : (
          <p>Draw or interact with diagrams here.</p>
        )}
      </div>

      <div data-role="interactable" data-type="workspace" className="workspace-area" style={{ fontSize: '1.2em' }}>
        <h5>Workspace</h5>
        <textarea placeholder="Take notes here..." style={{ fontSize: '1.2em' }}></textarea>
      </div>

      <button data-role="interactable" data-type="button" className="mic-button">
        🎤 Mic
      </button>
    </>
  );
};

export default QuestionSlide;