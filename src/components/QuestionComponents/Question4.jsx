import React from 'react';
import mockData from '../../mockData';

const Slide1 = ({ onStartSession }) => {
  const question = mockData.find(q => q.questionIndex === 4);
  return (
    <div className="p-4 space-y-6">
      <div id="problemText" className="text-lg space-y-2">
        <p>
          A square has a side length of <span id="sideLength" data-role="interactable" data-type="text">side=8 cm</span>.
        </p>
        <p>a) Find the area of the square.</p>
        <p>b) Find the perimeter of the square.</p>
      </div>

      <div id="diagramCanvas" className="flex justify-center items-center gap-6">
        <svg width="120" height="120" viewBox="0 0 120 120">
          <rect id="square" data-role="interactable" data-label="square" x="10" y="10" width="100" height="100" stroke="black" strokeWidth="2" fill="none" />
          <text id="sideLabel" data-role="interactable" data-label="sideLength" x="60" y="100" textAnchor="middle" fontSize="14" fill="black">8 cm</text>
        </svg>
        <input
          id="formulaBox"
          type="text"
          value="Area = side × side"
          readOnly
          style={{
            width: '170px',
            fontSize: '1.1em',
            background: '#f3f3f3',
            border: '1px solid #ccc',
            borderRadius: '6px',
            padding: '8px',
            color: '#222',
            textAlign: 'center',
            pointerEvents: 'none',
            fontFamily: 'monospace',
          }}
          aria-label="Square area formula"
        />
      </div>

      <div id="workspace" className="mt-4">
        <label htmlFor="notes" className="block text-sm font-medium">Notes:</label>
        <textarea id="notes" className="mt-1 w-full p-2 border rounded" rows="3" placeholder="Type your working or response here..." />
      </div>

      <div className="mt-4">
        <button id="btnMic" className="px-4 py-2 bg-purple-600 text-white rounded">🎤 Record</button>
      </div>

      <div className="mt-4">
        <button id="btnStart" className="px-4 py-2 bg-green-600 text-white rounded" onClick={() => onStartSession(question)}>Start</button>
      </div>
    </div>
  );
};

const Question4 = ({ onStartSession }) => (
  <div>
    <Slide1 onStartSession={onStartSession} />
  </div>
);

export default Question4;