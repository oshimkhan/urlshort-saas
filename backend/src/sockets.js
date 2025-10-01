import { Server } from 'socket.io';

let io;

export function initSockets(server) {
  io = new Server(server, {
    cors: { origin: process.env.FRONTEND_URL || '*', credentials: true }
  });

  io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id);

    socket.on('join', (userId) => {
      socket.join(`user:${userId}`);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected:', socket.id);
    });
  });
}

export function emitClickEvent(userId, data) {
  if (io) {
    io.to(`user:${userId}`).emit('click', data);
  }
}
