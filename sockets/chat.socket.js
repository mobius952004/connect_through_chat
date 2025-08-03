// sockets/chat.socket.js
import { verifyAccessToken } from '../shared/utils/jwt.utils.js';
import { SOCKET_EVENTS } from '../middleware/socket,events.js';

const getRoomId = (id1, id2) => {
  return [id1, id2].sort().join('_');
};

export default function chatSocketHandler(io, socket) {
  let userId;

  // Authenticate using JWT
  try {
    const token = socket.handshake.auth?.token;
    const payload = verifyAccessToken(token);
    userId = payload._id;
    socket.user = payload;
  } catch (err) {
    console.error(' Socket auth failed');
    return socket.disconnect();
  }

  // Join 1-on-1 room
  socket.on(SOCKET_EVENTS.JOIN_ROOM, ({ withUserId }) => {
    const roomId = getRoomId(userId, withUserId);
    socket.join(roomId);
    console.log(` ${userId} joined room ${roomId}`);
  });

  // Send private message
  socket.on(SOCKET_EVENTS.SEND_PRIVATE_MESSAGE, ({ toUserId, message }) => {
    const roomId = getRoomId(userId, toUserId);
    const msg = {
      from: userId,
      message,
      timestamp: Date.now(),
    };

    io.to(roomId).emit(SOCKET_EVENTS.RECEIVE_MESSAGE, msg);
    console.log(`Message sent from ${userId} to ${toUserId} in room ${roomId}`);
  });
}
