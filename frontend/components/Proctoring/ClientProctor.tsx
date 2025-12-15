"use client";
import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

type EventType = 'TAB_SWITCH' | 'COPY' | 'PASTE' | 'NO_FACE';

export default function ClientProctor({ attemptId, backendUrl }: { attemptId: string; backendUrl: string }) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(`${backendUrl}/proctor`, { transports: ['websocket'] });
    socketRef.current = socket;

    const send = (type: EventType) => {
      socket.emit('PROCTOR_EVENT', { attemptId, type, timestamp: Date.now() });
    };

    const onVisibility = () => {
      if (document.hidden) send('TAB_SWITCH');
    };
    const onBlur = () => send('TAB_SWITCH');
    const onCopy = () => send('COPY');
    const onPaste = () => send('PASTE');

    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('blur', onBlur);
    window.addEventListener('copy', onCopy);
    window.addEventListener('paste', onPaste);

    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('blur', onBlur);
      window.removeEventListener('copy', onCopy);
      window.removeEventListener('paste', onPaste);
      socket.close();
    };
  }, [attemptId, backendUrl]);

  return null;
}

