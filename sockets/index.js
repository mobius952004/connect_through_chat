 // sockets/index.js
import chatSocketHandler from './chat.socket.js';

export default function registerSocketHandlers(io) {

//   io.use((socket, next) => {
//   const token = socket.handshake.auth?.accessToken;
//   try {
//     const payload = jwt.verify(token, ACCESS_SECRET);
//     socket.userId = payload.sub;
//     next();
//   } catch {
//     next(new Error("Unauthorized"));
//   }
// });



  io.on('connection', (socket) => {
    console.log('New socket connection:', socket.id);

    // Register chat-related socket events
    chatSocketHandler(io, socket);

    socket.on('disconnect', () => {
      console.log('Socket disconnected:', socket.id);
    });
  });
}
