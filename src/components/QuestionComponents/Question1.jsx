import React from 'react';
import mockData from '../../mockData';

const Slide1 = ({ onStartSession }) => {
  const question = mockData.find(q => q.questionIndex === 1);
  return (
    <div className="p-4 space-y-6">
      <div id="problemText" className="text-lg space-y-2">
        <p>
          Two radii <span id="oa" data-role="interactable" data-type="text">OA</span> and 
          <span id="ob" data-role="interactable" data-type="text">OB</span> form a 
          <span id="angle" data-role="interactable" data-type="text">60° angle</span> in a circle. 
          The radius length is <span id="radiusLength" data-role="interactable" data-type="text">5 cm</span>.
        </p>
        <p>a) Find the length of arc AB.</p>
        <p>b) What fraction of the circle’s circumference does arc AB represent?</p>
      </div>

      <div id="diagramCanvas" className="flex justify-center">
        <svg width="200" height="200" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="80" stroke="black" strokeWidth="2" fill="none" />
          <line id="lineOA" data-role="interactable" data-type="shape" x1="100" y1="100" x2="180" y2="100" stroke="blue" strokeWidth="2" />
          <line id="lineOB" data-role="interactable" data-type="shape" x1="100" y1="100" x2="140" y2="40" stroke="blue" strokeWidth="2" />
          <path id="arcab" data-label="arcab" data-role="interactable" data-type="shape" d="M180,100 A80,80 0 0,0 140,40" stroke="red" strokeWidth="2" fill="none" />
        </svg>
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

const Question1 = ({ onStartSession }) => (
  <div>
    <Slide1 onStartSession={onStartSession} />
  </div>
);

export default Question1;