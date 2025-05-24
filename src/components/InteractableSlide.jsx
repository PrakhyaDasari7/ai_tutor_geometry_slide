import React, { useEffect, useRef } from 'react';
import './InteractableSlide.css';
import Question1 from './QuestionComponents/Question1';
import Question2 from './QuestionComponents/Question2';
import Question3 from './QuestionComponents/Question3';
import Question4 from './QuestionComponents/Question4';
import useWebSocket from './useWebSocket';
import useSpeechRecognition from './useSpeechRecognition';
import { handleTutorAction } from './tutorActions';
import { useStore, actionTypes } from '../store';
import mockData from '../mockData';

const InteractableSlide = () => {
  // Use global state for currentSlide and dialog
  const { state, dispatch } = useStore();
  const currentSlide = state.currentSlide ?? 0; // fallback to 0 if null
  const containerRef = useRef(null);

  // WebSocket logic moved to custom hook
  const handleSocketMessage = (event) => {
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
      
      // Existing tutor_action handler
      if (msg.type === 'tutor_action' && msg.action) {
        handleTutorAction(msg.action, containerRef.current);
      }
      // Example: handle dialog message from backend
      if (msg.type === 'dialog' && msg.payload) {
        dispatch({ type: actionTypes.ADD_DIALOG, payload: msg.payload });
      }
      // Example: handle slide change from backend
      if (msg.type === 'set_slide' && msg.payload) {
        dispatch({ type: actionTypes.SET_SLIDE, payload: msg.payload });
      }
    } catch (e) {
      console.error('Failed to process tutor action or audio:', e);
    }
  };

  const { socket, sendMessage } = useWebSocket('ws://localhost:8080', handleSocketMessage);

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
      sendMessage({ type: 'interactables', data: interactables });
      console.log('Sent interactables to backend:', interactables);
    } else {
      console.log('Detected interactables:', interactables);
    }
  }, [currentSlide, socket, sendMessage]);

  // Speech recognition logic via custom hook
  const onTranscript = (transcript) => {
    console.log('User speech:', transcript);
    setTimeout(() => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        sendMessage({ type: 'SPEECH', transcript });
      }
    }, 400);
  };
  const {
    isRecording,
    startRecording,
    stopRecording,
    recognitionRef
  } = useSpeechRecognition(onTranscript);

  // Attach mic button handler after slide render
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const micBtn = container.querySelector('#btnMic');
    if (!micBtn) return;
    let isMounted = true;
    const handleMicClick = () => {
      if (!recognitionRef.current) return;
      if (!isRecording) {
        startRecording();
        micBtn.textContent = '⏹️ Stop';
      } else {
        stopRecording();
        micBtn.textContent = '🎤 Record';
        // Play next dialogue when stopped
        if (socket && socket.readyState === WebSocket.OPEN) {
          sendMessage({ type: 'SPEECH', transcript: '' });
        }
        // Check if all dialogues for current subpart are done
        const question = mockData.find(q => q.questionIndex === currentSlide + 1);
        const subpartIndex = state.currentSubpart || 0;
        const subQuestions = question?.subQuestions || [];
        const currentSub = subQuestions[subpartIndex];
        const totalDialogues = currentSub?.tutoringDialogues?.length || 0;
        if (state.dialog.length >= totalDialogues) {
          // Move to next subpart if available
          if (subpartIndex + 1 < subQuestions.length) {
            // Prepare next subpart index and dialogues
            const nextSubpartIndex = subpartIndex + 1;
            const nextDialogues = subQuestions[nextSubpartIndex].tutoringDialogues.map(d => d.text);
            // Update subpart index first
            dispatch({ type: actionTypes.SET_SUBPART, payload: nextSubpartIndex });
            // Wait for subpart index to update, then set dialog and trigger audio
            setTimeout(() => {
              dispatch({ type: actionTypes.SET_DIALOGS, payload: [nextDialogues[0]] });
              // Wait for dialog state to update, then send SPEECH message to backend to trigger audio
              setTimeout(() => {
                if (socket && socket.readyState === WebSocket.OPEN) {
                  sendMessage({ type: 'SPEECH', transcript: '' });
                }
              }, 100);
            }, 100);
          }
        }
      }
    };
    micBtn.addEventListener('click', handleMicClick);
    return () => {
      isMounted = false;
      micBtn.removeEventListener('click', handleMicClick);
    };
  }, [currentSlide, socket, isRecording, startRecording, stopRecording, recognitionRef, state.dialog, state.currentSubpart, dispatch]);

  const handleStartSession = (dialog) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      sendMessage({ type: 'START_SESSION', dialog });
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
          // Use showTutorCursor util
          import('./tutorActions').then(({ showTutorCursor }) => {
            showTutorCursor(mainTarget);
          });
        }
        // If the first dialogue mentions formula, move pointer to formula after a short delay
        if (/formula/i.test(firstDialogue)) {
          setTimeout(() => {
            const formulaBox = container.querySelector('#formulaBox');
            if (formulaBox) {
              import('./tutorActions').then(({ showTutorCursor }) => {
                showTutorCursor(formulaBox);
              });
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
    const nextSlide = (currentSlide + 1) % slides.length;
    dispatch({ type: actionTypes.SET_SLIDE, payload: nextSlide });
  };

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