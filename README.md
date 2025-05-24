# AI Tutor Geometry Slide Demo

This project is a React + Vite application that demonstrates an AI-powered tutor board for geometry questions. It features step-by-step dialog progression, audio playback, and a mock WebSocket backend for interactive tutoring.

## Features

### Frontend
- **React + Vite**: Fast, modern development environment.
- **Centralized State Management**: Uses React Context API (`src/store.jsx`) for global state (current slide, subpart, dialogue, etc.).
- **Step-by-Step Dialogue**: Each click on the mic button advances the dialogue; after all dialogues in a subpart, the next subpart loads automatically.
- **Audio Playback**: Each dialogue triggers audio playback via backend WebSocket messages.
- **WebSocket Integration**: Real-time dialog and audio events from the backend using a custom hook (`src/components/useWebSocket.js`).
- **Question Slides**: Questions are implemented as React components in `src/components/QuestionComponents/` (e.g., `Question1.jsx`).
- **Mock Data**: All questions, subparts, and dialogues are defined in `src/mockData.js` for easy editing and extension.
- **Modern UI**: Responsive and interactive interface for demo and testing.

### Backend (Mock Server)
- **Mocked WebSocket Server**: `server.js` simulates backend dialog and audio events for frontend development and testing.
- **Scripted Dialog**: Emits scripted dialog and audio events to connected clients.

## Getting Started

### Prerequisites
- Node.js (v18 or later recommended)

### Installation
1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd ai_tutor_geometry_slide
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

### Running the Mock Backend
Start the mock WebSocket server (in a separate terminal):
```sh
node server.js
```

### Running the Frontend
Start the Vite development server:
```sh
npm run dev
```
The app will be available at the URL shown in your terminal (typically http://localhost:5173).

## Usage
- The app will connect to the mock backend and display the first question.
- Click the mic button to advance through the dialogue.
- After all dialogues in a subpart, the next subpart will load automatically.
- Audio will play for each dialogue as triggered by the backend.

## Adding or Editing Questions
- Edit `src/mockData.js` to add or update questions, subparts, and dialogues.
- To add a new question slide, create a new React component in `src/components/QuestionComponents/` and update the slide list in the store or manifest.

## Project Structure
- `src/store.jsx` — Centralized state management (React Context)
- `src/components/InteractableSlide.jsx` — Main logic for dialogue, audio, and subpart progression
- `src/components/useWebSocket.js` — WebSocket hook for backend communication
- `src/mockData.js` — Mock data for questions and dialogues
- `server.js` — Mock WebSocket backend


