import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Custom hook for WebSocket connection and message handling.
 * @param {string} url - WebSocket server URL
 * @param {(event: MessageEvent) => void} onMessage - Message handler
 * @returns {object} { socket, sendMessage }
 */
export default function useWebSocket(url, onMessage) {
  const [socket, setSocket] = useState(null);
  const onMessageRef = useRef(onMessage);

  useEffect(() => {
    onMessageRef.current = onMessage;
  }, [onMessage]);

  useEffect(() => {
    const ws = new window.WebSocket(url);
    setSocket(ws);
    ws.onopen = () => {
      console.log('WebSocket connection established');
    };
    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };
    ws.onmessage = (event) => {
      if (onMessageRef.current) {
        onMessageRef.current(event);
      }
    };
    return () => {
      ws.close();
    };
  }, [url]);

  // Send message helper
  const sendMessage = useCallback(
    (data) => {
      if (socket && socket.readyState === window.WebSocket.OPEN) {
        socket.send(typeof data === 'string' ? data : JSON.stringify(data));
      }
    },
    [socket]
  );

  return { socket, sendMessage };
}
