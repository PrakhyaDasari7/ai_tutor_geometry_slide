import React, { useEffect, useRef, useState } from 'react';
import './InteractableSlide.css';
import Question1 from './QuestionComponents/Question1';
import Question2 from './QuestionComponents/Question2';
import Question3 from './QuestionComponents/Question3';
import Question4 from './QuestionComponents/Question4';
import mockData from '../mockData';

const InteractableSlide = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [socket, setSocket] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setSocket(ws);
    ws.onopen = () => {
      console.log('WebSocket connection established');
    };
    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };
    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const interactables = Array.from(
      container.querySelectorAll('[data-interactable], [id]')
    ).map((el) => {
      const rect = el.getBoundingClientRect();
      const dataAttrs = {};
      for (const attr of el.attributes) {
        if (attr.name.startsWith('data-')) {
          dataAttrs[attr.name] = attr.value;
        }
      }
      return {
        id: el.id || null,
        boundingBox: {
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height
        },
        elementType: el.tagName.toLowerCase(),
        ...dataAttrs
      };
    });
    // Emit interactables to backend if socket is open
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: 'interactables', data: interactables }));
      console.log('Sent interactables to backend:', interactables);
    } else {
      console.log('Detected interactables:', interactables);
    }
  }, [currentSlide, socket]);

  useEffect(() => {
    if (!socket) return;
    socket.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        // Handle new AUDIO chunk format from backend
        if (msg.mode === 'AUDIO' && msg.payload && msg.payload.chunk) {
          const audioData = msg.payload.chunk;
          const audioBytes = Uint8Array.from(atob(audioData), c => c.charCodeAt(0));
          const blob = new Blob([audioBytes], { type: 'audio/mp3' });
          const url = URL.createObjectURL(blob);
          const audio = new Audio(url);
          audio.play();
          audio.onended = () => URL.revokeObjectURL(url);
        }
        // Handle AUDIO event from backend
       // if (msg.type === 'AUDIO' && msg.text) {
        //  const utterance = new window.SpeechSynthesisUtterance(msg.text);
         // window.speechSynthesis.speak(utterance);
       // }
        // Existing tutor_action handler
        if (msg.type === 'tutor_action' && msg.action) {
          const container = containerRef.current;
          if (!container) return;
          let svg = container.querySelector('#diagramCanvas svg');
          let target = null;
          // Robustly match formula keyword/id for pointer
          if (msg.action.type === 'POINT' && msg.action.id && msg.action.id.toLowerCase().includes('formula')) {
            target = container.querySelector('#formulaBox');
          } else if (msg.action.type === 'POINT' && svg) {
            target = msg.action.id ? svg.querySelector(`#${msg.action.id}`) : null;
          } else if (msg.action.id) {
            target = container.querySelector(`#${msg.action.id}`);
          }
          if (target) {
            if (msg.action.type === 'highlight') {
              target.style.transition = 'background 0.3s';
              target.style.background = msg.action.color || 'yellow';
            } else if (msg.action.type === 'removeHighlight') {
              target.style.background = '';
            } else if (msg.action.type === 'setText' && msg.action.text !== undefined) {
              target.textContent = msg.action.text;
            } else if (msg.action.type === 'audio' && msg.action.text) {
              const utterance = new window.SpeechSynthesisUtterance(msg.action.text);
              window.speechSynthesis.speak(utterance);
            } else if (msg.action.type === 'POINT') {
              // Move tutor cursor overlay to the centre of the element's bounding box
              let cursor = document.getElementById('tutor-cursor-overlay');
              if (!cursor) {
                cursor = document.createElement('div');
                cursor.id = 'tutor-cursor-overlay';
                cursor.style.position = 'fixed'; // Use fixed so it overlays viewport
                cursor.style.width = '32px';
                cursor.style.height = '32px';
                cursor.style.background = 'rgba(0,0,0,0.7)';
                cursor.style.borderRadius = '50%';
                cursor.style.zIndex = 9999;
                cursor.style.pointerEvents = 'none';
                cursor.style.display = 'flex';
                cursor.style.alignItems = 'center';
                cursor.style.justifyContent = 'center';
                cursor.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
                cursor.innerHTML = '<span style="color:white;font-size:22px;">👆</span>';
                document.body.appendChild(cursor);
              }
              const rect = target.getBoundingClientRect();
              cursor.style.left = `${rect.left + rect.width / 2 - 16}px`;
              cursor.style.top = `${rect.top + rect.height / 2 - 16}px`;
              cursor.style.display = 'flex';
            }
          }
        }
      } catch (e) {
        console.error('Failed to process tutor action or audio:', e);
      }
    };
    return () => {
      socket.onmessage = null;
    };
  }, [socket, currentSlide]);

  const handleStartSession = (dialog) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: 'START_SESSION', dialog }));
      console.log('Sent START_SESSION to backend:', dialog);
      // Try to point to the diagram part mentioned in the first dialogue
      const container = containerRef.current;
      if (container && dialog && dialog.subQuestions && dialog.subQuestions[0] && dialog.subQuestions[0].tutoringDialogues) {
        const firstDialogue = dialog.subQuestions[0].tutoringDialogues[0]?.text || '';
        // Determine which diagram element to point to for each question
        let mainTarget = null;
        const svg = container.querySelector('#diagramCanvas svg');
        if (svg) {
          if (svg.querySelector('#arcab')) {
            mainTarget = svg.querySelector('#arcab'); // Question 1
          } else if (svg.querySelector('#rectangle')) {
            mainTarget = svg.querySelector('#rectangle'); // Question 2
          } else if (svg.querySelector('#triangle')) {
            mainTarget = svg.querySelector('#triangle'); // Question 3
          } else if (svg.querySelector('#square')) {
            mainTarget = svg.querySelector('#square'); // Question 4
          }
        }
        if (mainTarget) {
          let cursor = document.getElementById('tutor-cursor-overlay');
          if (!cursor) {
            cursor = document.createElement('div');
            cursor.id = 'tutor-cursor-overlay';
            cursor.style.position = 'fixed';
            cursor.style.width = '32px';
            cursor.style.height = '32px';
            cursor.style.background = 'rgba(0,0,0,0.7)';
            cursor.style.borderRadius = '50%';
            cursor.style.zIndex = 9999;
            cursor.style.pointerEvents = 'none';
            cursor.style.display = 'flex';
            cursor.style.alignItems = 'center';
            cursor.style.justifyContent = 'center';
            cursor.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
            cursor.innerHTML = '<span style="color:white;font-size:22px;">👆</span>';
            document.body.appendChild(cursor);
          }
          const rect = mainTarget.getBoundingClientRect();
          cursor.style.left = `${rect.left + rect.width / 2 - 16}px`;
          cursor.style.top = `${rect.top + rect.height / 2 - 16}px`;
          cursor.style.display = 'flex';
        }
        // If the first dialogue mentions formula, move pointer to formula after a short delay
        if (/formula/i.test(firstDialogue)) {
          setTimeout(() => {
            const formulaBox = container.querySelector('#formulaBox');
            if (formulaBox) {
              let cursor = document.getElementById('tutor-cursor-overlay');
              if (!cursor) {
                cursor = document.createElement('div');
                cursor.id = 'tutor-cursor-overlay';
                cursor.style.position = 'fixed';
                cursor.style.width = '32px';
                cursor.style.height = '32px';
                cursor.style.background = 'rgba(0,0,0,0.7)';
                cursor.style.borderRadius = '50%';
                cursor.style.zIndex = 9999;
                cursor.style.pointerEvents = 'none';
                cursor.style.display = 'flex';
                cursor.style.alignItems = 'center';
                cursor.style.justifyContent = 'center';
                cursor.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
                cursor.innerHTML = '<span style="color:white;font-size:22px;">👆</span>';
                document.body.appendChild(cursor);
              }
              const rect = formulaBox.getBoundingClientRect();
              cursor.style.left = `${rect.left + rect.width / 2 - 16}px`;
              cursor.style.top = `${rect.top + rect.height / 2 - 16}px`;
              cursor.style.display = 'flex';
            }
          }, 1200); // 1.2s delay for effect
        }
      }
    } else {
      console.warn('WebSocket not open');
    }
  };

  const slides = [
    <Question1 key={0} onStartSession={handleStartSession} />, 
    <Question2 key={1} onStartSession={handleStartSession} />, 
    <Question3 key={2} onStartSession={handleStartSession} />, 
    <Question4 key={3} onStartSession={handleStartSession} />
  ];

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  // Speech recognition setup
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = 'en-US';
  }, []);

  // Attach mic button handler after slide render
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const micBtn = container.querySelector('#btnMic');
    if (!micBtn) return;
    let isMounted = true;
    let transcript = '';
    const handleMicClick = () => {
      if (!recognitionRef.current) return;
      if (!isRecording) {
        // Start recording
        setIsRecording(true);
        recognitionRef.current.start();
        micBtn.textContent = '⏹️ Stop';
        recognitionRef.current.onresult = (event) => {
          transcript = event.results[0][0].transcript;
          if (isMounted) {
            console.log('User speech:', transcript);
          }
        };
        recognitionRef.current.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
        };
      } else {
        // Stop recording
        setIsRecording(false);
        recognitionRef.current.stop();
        micBtn.textContent = '🎤 Record';
        // After a short delay, send SPEECH to backend to play next dialogue
        setTimeout(() => {
          if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ type: 'SPEECH', transcript }));
          }
        }, 400);
      }
    };
    micBtn.addEventListener('click', handleMicClick);
    return () => {
      isMounted = false;
      micBtn.removeEventListener('click', handleMicClick);
    };
  }, [currentSlide, socket, isRecording]);

  return (
    <div className="interactable-slide" ref={containerRef}>
      {slides[currentSlide]}
      <button onClick={handleNextSlide} className="next-slide-button">
        &gt;
      </button>
    </div>
  );
};

export default InteractableSlide;