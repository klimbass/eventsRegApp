import { useEffect, useState, useCallback } from "react";
import { useWebSocket } from "./useWebSocket";

export function useEventViewers(eventId) {
  const [viewerCount, setViewerCount] = useState(0);
  const { isConnected, sendMessage } = useWebSocket();

  //event viewing
  const notifyViewing = useCallback(() => {
    if (isConnected && eventId) {
      sendMessage({
        type: "VIEWING_EVENT",
        eventId: eventId,
      });
    }
  }, [isConnected, eventId, sendMessage]);

  // left event
  const notifyLeaving = useCallback(() => {
    if (isConnected && eventId) {
      sendMessage({
        type: "LEFT_EVENT",
        eventId: eventId,
      });
    }
  }, [isConnected, eventId, sendMessage]);

  useEffect(() => {
    const handleViewerUpdate = (message) => {
      if (
        message.type === "VIEWER_COUNT_UPDATE" &&
        message.eventId === eventId
      ) {
        setViewerCount(message.count);
      }
    };

    // global handler
    window.onWebSocketMessage = handleViewerUpdate;

    return () => {
      window.onWebSocketMessage = null;
    };
  }, [eventId]);

  useEffect(() => {
    if (eventId) {
      notifyViewing();

      return () => {
        notifyLeaving();
      };
    }
  }, [eventId, notifyViewing, notifyLeaving]);

  return {
    viewerCount,
    isConnected,
  };
}
