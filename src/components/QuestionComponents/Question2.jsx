import React from 'react';
import mockData from '../../mockData';


const Slide1 = ({ onStartSession }) => {
  // Get the correct mockData for this question
  const question = mockData.find(q => q.questionIndex === 2);
  return (
    <div className="p-4 space-y-6">
      <div id="problemText" className="text-lg space-y-2">
        <p>
          A rectangle has a length of <span data-type="text">10 cm</span> and a width of 
          <span data-type="text">6 cm</span>.
        </p>
        <p>a) Find the area of the rectangle.</p>
        <p>b) Find the perimeter of the rectangle.</p>
      </div>

      <div id="diagramCanvas" className="flex justify-center items-center gap-6">
        <svg width="200" height="120" viewBox="0 0 200 120">
          <rect id="rectangle" data-role="interactable" data-label="rectangle" x="20" y="20" width="160" height="80" stroke="black" strokeWidth="2" fill="none" />
          <text x="100" y="15" textAnchor="middle" fontSize="12">Rectangle</text>
          <text id="length" data-role="interactable" x="100" y="110" textAnchor="middle" fontSize="12">Length: 10 cm</text>
          <text id="width" data-role="interactable" x="185" y="60" textAnchor="end" fontSize="12">Width: 6 cm</text>
        </svg>
        <input
          id="formulaBox"
          type="text"
          value="Area = length × width"
          readOnly
          style={{
            width: '180px',
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
          aria-label="Rectangle area formula"
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

const Question2 = ({ onStartSession }) => (
  <div>
    <Slide1 onStartSession={onStartSession} />
  </div>
);

export default Question2;