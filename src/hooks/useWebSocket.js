import { useEffect, useRef, useState, useCallback } from "react";

export function useWebSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const [clientId, setClientId] = useState(null);
  const ws = useRef(null);

  const connect = useCallback(() => {
    const serverURL = import.meta.env.VITE_WS_URL || "ws://localhost:3000";
    ws.current = new WebSocket(serverURL);

    ws.current.onopen = () => {
      // console.log("Connected to WebSocket server");
      setIsConnected(true);
    };

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);

      switch (message.type) {
        case "WELCOME":
          setClientId(message.clientId);
          break;
        default:
          if (window.onWebSocketMessage) {
            window.onWebSocketMessage(message);
          }
      }
    };

    ws.current.onclose = () => {
      // console.log("WebSocket connection closed");
      setIsConnected(false);
      setClientId(null);

      setTimeout(() => {
        // console.log("Reconnecting...");
        connect();
      }, 3000);
    };

    ws.current.onerror = (error) => {
      console.log("WebSocket error:", error);
    };
  }, []);

  const sendMessage = useCallback((message) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
      console.log("Sent:", message);
    } else {
      console.log("WebSocket not connected");
    }
  }, []);

  useEffect(() => {
    connect();

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [connect]);

  return {
    isConnected,
    clientId,
    sendMessage,
  };
}
