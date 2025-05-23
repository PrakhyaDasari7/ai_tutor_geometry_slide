# DESIGN.md

## 1. WebSocket Handling & Buffering

- **WebSocket Layer**  
  - The WebSocket connection will be managed in a dedicated module (e.g., `src/websocket.js`).
  - This module will handle connecting, reconnecting, and parsing messages from the backend (see `server.js` for the mock server).
  - Incoming messages will be buffered in an array if the UI is not ready or if batching is needed, ensuring smooth UI updates.

- **Buffering**  
  - Messages from the backend are queued and processed in order.
  - The buffer is flushed to the state manager when the UI is ready or at regular intervals.

## 2. State Management / Event Bus

- **Centralized State**  
  - State is managed using React’s Context API or a lightweight state manager (e.g., Zustand).
  - The state includes the current slide, dialog, and user interactions.
  - The state logic can be placed in a new file such as `src/store.js`.

- **Event Bus**  
  - WebSocket and user events are dispatched to the state manager.
  - Components (e.g., in `src/components/`) subscribe to relevant state slices and update accordingly.

## 3. DOM vs React Updates

- **React-Driven UI**  
  - All UI updates are handled through React state and props.
  - No direct DOM manipulation outside React, except for special cases (e.g., focusing an input).
  - Components like `App.jsx`, `InteractableSlide.jsx`, and `QuestionSlide.jsx` render based on state.

- **Performance**  
  - Buffering ensures React is not overwhelmed by rapid updates from the backend.

## 4. Plugging in a New Question Slide (HTML Swap)

- **Slide Loader**  
  - Each question slide can be a standalone HTML file placed in `public/slides/`.
  - The React app can load and inject these HTML files into a container using `dangerouslySetInnerHTML` or an iframe.
  - To add a new question, simply add a new HTML file and update the slide manifest/config.
  - Alternatively, React components for questions are in `src/components/QuestionComponents/` (e.g., `Question1.jsx`, `Question2.jsx`). New slides can be plugged in by adding new components and updating the slide list.

## Minimum Viable Demo

- **Mocked Backend**  
  - `server.js` acts as a mock WebSocket server, emitting a scripted dialog to connected clients for demo/testing.
  - The frontend connects to this server and displays the dialog using the React components.

---
