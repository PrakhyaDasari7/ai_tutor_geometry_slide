import React from 'react';
import mockData from '../../mockData';

const Slide1 = ({ onStartSession }) => {
  const question = mockData.find(q => q.questionIndex === 1);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '80vh', justifyContent: 'center', padding: 24, gap: 24 }}>
      {/* Problem Panel on top */}
      <div id="problemText" style={{ background: 'white', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: 16, lineHeight: 1.3 }}>
        <p style={{ marginBottom: 4 }}>
          Two radii <span id="oa" data-role="interactable" data-type="text">OA</span> and 
          <span id="ob" data-role="interactable" data-type="text">OB</span> form a 
          <span id="angle" data-role="interactable" data-type="text">60° angle</span> in a circle. 
          The radius length is <span id="radiusLength" data-role="interactable" data-type="text">5 cm</span>.
        </p>
        <p style={{ marginBottom: 4 }}>a) Find the length of arc AB.</p>
        <p style={{ marginBottom: 0 }}>b) What fraction of the circle’s circumference does arc AB represent?</p>
      </div>
      {/* Diagram and Formula horizontally */}
      <div style={{ display: 'flex', flexDirection: 'row', gap: 32, alignItems: 'center', marginBottom: 16 }}>
        <div id="diagramCanvas" style={{ background: 'white', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="120" height="102" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="60" stroke="black" strokeWidth="2" fill="none" />
            <line id="lineOA" data-role="interactable" data-type="shape" x1="60" y1="60" x2="120" y2="60" stroke="black" strokeWidth="2" />
            <line id="lineOB" data-role="interactable" data-type="shape" x1="60" y1="60" x2="102" y2="20" stroke="black" strokeWidth="2" />
            <text x="70" y="58" fontSize="14" fill="black" fontWeight="bold">)θ°</text>
            <text x="55" y="70" fontSize="11" fill="black" fontWeight="bold">radius=r</text>
          </svg>
        </div>
        <input
          id="formulaBox"
          type="text"
          value="(θ°/360) × 2πr"
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
          aria-label="Arc length formula"
        />
      </div>
      {/* Workspace/Notes */}
      <div id="workspace" style={{ background: 'white', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: 4, maxWidth: 400, alignSelf: 'center', width: '100%' }}>
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

const Question1 = ({ onStartSession }) => (
  <div>
    <Slide1 onStartSession={onStartSession} />
  </div>
);

export default Question1;