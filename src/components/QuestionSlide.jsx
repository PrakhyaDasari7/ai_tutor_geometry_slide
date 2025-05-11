import React from 'react';

const QuestionSlide = ({ question }) => {
  return (
    <>
      <button data-role="interactable" data-type="button" className="start-button">
        Start
      </button>

      <div data-role="interactable" data-type="panel" className="problem-panel">
        <h2>Problem Panel</h2>
        <p>{question}</p>
      </div>

      <div data-role="interactable" data-type="canvas" className="diagram-canvas">
        <h2>Diagram Canvas</h2>
        <p>Draw or interact with diagrams here.</p>
      </div>

      <div data-role="interactable" data-type="workspace" className="workspace-area">
        <h2>Workspace</h2>
        <textarea placeholder="Take notes here..."></textarea>
      </div>

      <button data-role="interactable" data-type="button" className="mic-button">
        🎤 Mic
      </button>
    </>
  );
};

export default QuestionSlide;