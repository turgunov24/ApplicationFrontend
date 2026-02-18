import type { ReactNode } from 'react';

import {
  useRef,
  useMemo,
  useState,
  useEffect,
  useContext,
  useCallback,
  createContext,
} from 'react';

import { useAuthStore } from 'src/auth/store';

// ----------------------------------------------------------------------

interface WebSocketMessage {
  type: string;
  payload?: unknown;
}

type WebSocketContextType = {
  socket: WebSocket | null;
  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
  send: (data: unknown) => void;
};

const WebSocketContext = createContext<WebSocketContextType | null>(null);

// ----------------------------------------------------------------------

type WebSocketProviderProps = {
  children: ReactNode;
};

export function WebSocketProvider({ children }: WebSocketProviderProps) {
  const [isConnected, setIsConnected] = useState(false);
  const { accessToken } = useAuthStore();

  // Use refs to persist across re-renders and avoid stale closures
  const socketRef = useRef<WebSocket | null>(null);
  const isConnectingRef = useRef(false);
  const shouldConnectRef = useRef(false);
  const accessTokenRef = useRef(accessToken);

  // Keep accessToken ref in sync
  useEffect(() => {
    accessTokenRef.current = accessToken;
  }, [accessToken]);

  // Handle incoming WebSocket messages
  const handleMessage = useCallback(async (event: MessageEvent) => {
    try {
      const data = JSON.parse(event.data) as WebSocketMessage;
      console.log('WebSocket message received:', data);

      switch (data.type) {
        case 'AUTH_SUCCESS':
          console.log('WebSocket authentication successful');
          break;

        case 'AUTH_ERROR':
          console.error('WebSocket authentication failed:', data.payload);
          break;

        default:
          console.log('Unknown message type:', data.type);
      }
    } catch {
      console.log('Non-JSON WebSocket message:', event.data);
    }
  }, []);

  const connect = useCallback(() => {
    // Mark that we should be connected
    shouldConnectRef.current = true;

    // Prevent multiple simultaneous connection attempts
    if (isConnectingRef.current) {
      console.log('WebSocket already connecting...');
      return;
    }

    if (socketRef.current?.readyState === WebSocket.OPEN) {
      console.log('WebSocket already connected');
      return;
    }

    // Close any existing connection first
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }

    isConnectingRef.current = true;

    const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:3006';

    console.log('Connecting to WebSocket:', wsUrl);
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log('WebSocket connected successfully');
      isConnectingRef.current = false;
      socketRef.current = ws;
      setIsConnected(true);

      // Send authentication message with access token
      if (accessTokenRef.current) {
        ws.send(JSON.stringify({ type: 'AUTH', payload: accessTokenRef.current }));
      }
    };

    ws.onmessage = handleMessage;

    ws.onclose = (event) => {
      // 1000 = Normal closure, 1001 = Going away (page navigation) - these are expected
      if (event.code !== 1000 && event.code !== 1001) {
        console.log('WebSocket disconnected, code:', event.code, 'reason:', event.reason);
      }
      isConnectingRef.current = false;
      socketRef.current = null;
      setIsConnected(false);

      // Auto-reconnect if we should still be connected (not for normal closures)
      if (shouldConnectRef.current && accessTokenRef.current && event.code !== 1000) {
        setTimeout(() => {
          if (shouldConnectRef.current && accessTokenRef.current) {
            connect();
          }
        }, 2000);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      isConnectingRef.current = false;
    };

    socketRef.current = ws;
  }, [handleMessage]);

  const disconnect = useCallback(() => {
    console.log('Disconnecting WebSocket...');
    shouldConnectRef.current = false;
    isConnectingRef.current = false;

    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }
    setIsConnected(false);
  }, []);

  const send = useCallback((data: unknown) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(data));
    } else {
      console.warn('WebSocket is not connected, cannot send message');
    }
  }, []);

  // Auto-connect when accessToken exists (with delay to wait for navigation)
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    if (accessToken) {
      // Delay connection to wait for navigation to complete
      timeoutId = setTimeout(() => {
        console.log('Token exists, connecting WebSocket...');
        connect();
      }, 1000); // 1 second delay
    } else {
      console.log('No token, disconnecting WebSocket...');
      disconnect();
    }

    // Cleanup - cancel pending connection if component unmounts
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [accessToken, connect, disconnect]);

  const value = useMemo(
    () => ({
      socket: socketRef.current,
      isConnected,
      connect,
      disconnect,
      send,
    }),
    [isConnected, connect, disconnect, send]
  );

  return <WebSocketContext.Provider value={value}>{children}</WebSocketContext.Provider>;
}

// ----------------------------------------------------------------------

export function useWebSocket() {
  const context = useContext(WebSocketContext);

  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }

  return context;
}
