import React from 'react';
import mockData from '../../mockData';

const Slide1 = ({ onStartSession }) => {
  const question = mockData.find(q => q.questionIndex === 4);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '80vh', justifyContent: 'center', padding: 24, gap: 24 }}>
      {/* Problem Panel on top */}
      <div id="problemText" style={{ background: 'white', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: 16 }}>
        <p>
          A square has a side length of <span id="sideLength" data-role="interactable" data-type="text">side=8 cm</span>.
        </p>
        <p>a) Find the area of the square.</p>
        <p>b) Find the perimeter of the square.</p>
      </div>
      {/* Diagram and Formula horizontally */}
      <div style={{ display: 'flex', flexDirection: 'row', gap: 32, alignItems: 'center', marginBottom: 16 }}>
        <div id="diagramCanvas" style={{ background: 'white', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="120" height="102" viewBox="0 0 120 120">
            <rect id="square" data-role="interactable" data-label="square" x="10" y="10" width="100" height="100" stroke="black" strokeWidth="2" fill="none" />
            <text id="sideLabel" data-role="interactable" data-label="sideLength" x="60" y="100" textAnchor="middle" fontSize="14" fill="black">side = 8 cm</text>
          </svg>
        </div>
        <input
          id="formulaBox"
          type="text"
          value="Area = side × side"
          readOnly
          style={{
            width: '200px',
            fontSize: '1.1em',
            background: '#f3f3f3',
            border: '1px solid #ccc',
            borderRadius: '6px',
            padding: '16px',
            color: '#222',
            textAlign: 'center',
            pointerEvents: 'none',
            fontFamily: 'monospace',
            marginLeft: 0
          }}
          aria-label="Square area formula"
        />
      </div>
      {/* Workspace/Notes */}
      <div id="workspace" style={{ background: 'white', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: 16, maxWidth: 400, alignSelf: 'center', width: '100%' }}>
        <label htmlFor="notes" className="block text-sm font-medium">Notes:</label>
        <textarea id="notes" className="mt-1 w-full p-2 border rounded" rows="5" placeholder="Type your working or response here..." style={{ fontSize: '1.1em', borderRadius: 8, border: '1px solid #e5e7eb', padding: 12, resize: 'vertical', marginTop: 8, width: '90%' }} />
      </div>
      {/* Bottom row: Record and Start buttons spaced apart */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
        <button id="btnMic" className="px-4 py-2 bg-purple-600 text-white rounded" style={{ fontSize: '1.1em', borderRadius: 8, minWidth: 120 }}>🎤 Record</button>
        <button id="btnStart" className="px-4 py-2 bg-green-600 text-white rounded" style={{ fontSize: '1.1em', borderRadius: 8, minWidth: 120 }} onClick={() => onStartSession(question)}>Start</button>
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