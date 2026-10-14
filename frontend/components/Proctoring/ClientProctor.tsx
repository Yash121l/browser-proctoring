"use client";
import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { pauseReplay, track } from '../../lib/analytics';

type EventType = 'TAB_SWITCH' | 'COPY' | 'PASTE' | 'NO_FACE';

export default function ClientProctor({ attemptId, backendUrl }: { attemptId: string; backendUrl: string }) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(`${backendUrl}/proctor`, { transports: ['websocket'] });
    socketRef.current = socket;
    const resumeReplay = pauseReplay();
    track('quiz_attempt_started', { attempt_id: attemptId });

    const send = (type: EventType) => {
      socket.emit('PROCTOR_EVENT', { attemptId, type, timestamp: Date.now() });
      track('proctor_violation_detected', { attempt_id: attemptId, violation_type: type });
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
      resumeReplay();
    };
  }, [attemptId, backendUrl]);

  return null;
}

