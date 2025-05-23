import React from 'react';
import mockData from '../../mockData';

const Slide1 = ({ onStartSession }) => {
  const question = mockData.find(q => q.questionIndex === 3);
  return (
    <div className="p-4 space-y-6">
      <div id="problemText" className="text-lg space-y-2">
        <p>
          A triangle has sides of lengths <span id="sideA" data-role="interactable" data-type="text">3 cm</span>, 
          <span id="sideB" data-role="interactable" data-type="text">4 cm</span>, and 
          <span id="sideC" data-role="interactable" data-type="text">5 cm</span>.
        </p>
        <p>a) Determine if the triangle is a right triangle.</p>
        <p>b) Find the area of the triangle.</p>
      </div>

      <div id="diagramCanvas" className="flex justify-center items-center gap-6">
        <svg width="200" height="120" viewBox="0 0 200 120">
          <rect id="triangle-shape" data-role="interactable" data-label="triangle" x="30" y="80" width="140" height="2" fill="black" />
          <polygon id="triangle" data-role="interactable" data-label="triangle" points="30,80 170,80 100,20" stroke="black" strokeWidth="2" fill="none" />
          <text id="sideA" data-role="interactable" x="60" y="95" fontSize="12">3 cm</text>
          <text id="sideB" data-role="interactable" x="140" y="95" fontSize="12">4 cm</text>
          <text id="sideC" data-role="interactable" x="105" y="40" fontSize="12">5 cm</text>
        </svg>
        <input
          id="formulaBox"
          type="text"
          value="a² + b² = c²"
          readOnly
          style={{
            width: '200px',
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
          aria-label="Triangle area formula"
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

const Question3 = ({ onStartSession }) => (
  <div>
    <Slide1 onStartSession={onStartSession} />
  </div>
);

export default Question3;