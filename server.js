import { WebSocketServer } from 'ws';
import mockData from './src/mockData.js';
import gTTS from 'gtts';
import fs from 'fs';
import path from 'path';

const wss = new WebSocketServer({ port: 8080 });

// Helper to get dialogues for a question from dialog data
function getDialoguesFromDialog(dialog) {
  // Try to match by questionIndex (and optionally subQuestion index if provided)
  if (!dialog) return [];
  const q = mockData.find(q => q.questionIndex === dialog.questionIndex);
  if (!q) return [];
  // If a subQuestion index is provided, use it, else use the first subQuestion
  let sub;
  if (dialog.subQuestionIndex) {
    sub = q.subQuestions.find(sq => sq.index === dialog.subQuestionIndex);
  } else {
    sub = q.subQuestions[0];
  }
  if (!sub) return [];
  return sub.tutoringDialogues;
}

wss.on('connection', (ws) => {
  console.log('Client connected');
  // Track dialogue index per connection
  ws.dialogueIndex = 0;
  ws.dialogues = [];

  async function sendNextDialogue() {
    if (ws.dialogueIndex < ws.dialogues.length) {
      const dialogue = ws.dialogues[ws.dialogueIndex];
      const text = dialogue.text;
      // Use gtts to generate audio
      const gtts = new gTTS(text, 'en');
      const tmpFile = path.join('/tmp', `tts_${Date.now()}_${Math.random()}.mp3`);
      gtts.save(tmpFile, (err) => {
        if (err) {
          console.error('TTS error:', err);
          return;
        }
        fs.readFile(tmpFile, (err, data) => {
          if (err) {
            console.error('Read audio file error:', err);
            return;
          }
          const base64 = data.toString('base64');
          ws.send(JSON.stringify({
            mode: 'AUDIO',
            payload: {
              chunk: base64,
              isLast: true
            }
          }));
          fs.unlink(tmpFile, () => {}); // Clean up temp file
        });
      });
    }
  }

  ws.on('message', (message) => {
    let msg;
    try { msg = JSON.parse(message); } catch { msg = {}; }
    if (msg.type === 'START_SESSION') {
      ws.dialogueIndex = 0;
      ws.dialogues = getDialoguesFromDialog(msg.dialog);
      sendNextDialogue();
    } else if (msg.type === 'SPEECH') {
      ws.dialogueIndex++;
      sendNextDialogue();
    } else {
      ws.send(JSON.stringify({ message: message }));
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is running on ws://localhost:8080');