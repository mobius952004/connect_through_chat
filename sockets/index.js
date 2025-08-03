 // sockets/index.js
import chatSocketHandler from './chat.socket.js';

export default function registerSocketHandlers(io) {
  io.on('connection', (socket) => {
    console.log('New socket connection:', socket.id);

    // Register chat-related socket events
    chatSocketHandler(io, socket);

    socket.on('disconnect', () => {
      console.log('Socket disconnected:', socket.id);
    });
  });
}
