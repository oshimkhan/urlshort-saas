import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useAuthStore } from '../store/auth';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:4000';

export function useSocket(onClickEvent) {
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) return;

    const socket = io(SOCKET_URL, { transports: ['websocket'] });

    socket.on('connect', () => {
      console.log('Socket connected');
      socket.emit('join', user.id);
    });

    socket.on('click', (data) => {
      console.log('Click event:', data);
      if (onClickEvent) onClickEvent(data);
    });

    return () => {
      socket.disconnect();
    };
  }, [user, onClickEvent]);
}
