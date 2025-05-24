# DESIGN.md

## 1. WebSocket Handling & Buffering

- **WebSocket Layer**  
  - The WebSocket connection is managed in a dedicated hook (`src/components/useWebSocket.js`).
  - This hook handles connecting, reconnecting, and parsing messages from the backend (`server.js` for the mock server).
  - Incoming messages are dispatched to the global state manager (React Context) for consistent UI updates.

- **Buffering**  
  - Messages from the backend are processed in order and dispatched as events to the store.
  - The UI updates in sync with the dialogue progression, ensuring smooth transitions and audio playback.

## 2. State Management / Event Bus

- **Centralized State**  
  - State is managed using React’s Context API in `src/store.jsx`.
  - The state includes the current slide, subpart, dialogue index, and user interactions.
  - The app is wrapped in `StoreProvider` in `src/main.jsx`.

- **Event Bus**  
  - WebSocket and user events are dispatched to the store.
  - Components (e.g., in `src/components/`) subscribe to relevant state slices and update accordingly.

## 3. React-Driven UI & Audio

- **React-Driven UI**  
  - All UI updates are handled through React state and props.
  - No direct DOM manipulation outside React, except for special cases (e.g., focusing an input).
  - Components like `App.jsx`, `InteractableSlide.jsx`, and `QuestionSlide.jsx` render based on state.

- **Dialogue Progression & Audio**  
  - Dialogue advances step-by-step: each click on the mic button advances to the next dialogue.
  - After all dialogues in a subpart, the next subpart is loaded and its dialogues are played.
  - Audio for each dialogue is played using backend WebSocket messages.

## 4. Plugging in a New Question Slide

- **Slide Loader**  
  - Question slides are implemented as React components in `src/components/QuestionComponents/` (e.g., `Question1.jsx`, `Question2.jsx`).
  - To add a new question, add a new component and update the slide list in the store or manifest.
  - (Optional) Standalone HTML slides can be placed in `public/slides/` and loaded via `dangerouslySetInnerHTML` or an iframe, but the current design uses React components for questions.

## 5. Mocked Backend

- **Mocked Backend**  
  - `server.js` acts as a mock WebSocket server, emitting a scripted dialog to connected clients for demo/testing.
  - The frontend connects to this server and displays the dialog using the React components.

## 6. Mock Data

- **Mock Data**  
  - All questions, subparts, and dialogues are defined in `src/mockData.js`.
  - To add or update dialogues, edit the relevant entries in this file.

---
