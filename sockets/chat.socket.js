// sockets/chat.socket.js
import jwtServices from '../shared/utils/jwt.utils.js';
import { SOCKET_EVENTS } from '../middleware/socket.events.js';

const getRoomId = ({userId, withUserId}) => {
  return [userId, withUserId].sort().join('_');
};

export default function chatSocketHandler(io, socket) {
  let userId;

  // Authenticate using JWT
  try {
    const token = socket.handshake.auth?.accessToken;
    const payload = jwtServices.verifyAccess(token);
      // console.log(payload)

    userId = payload.sub;
    socket.user = payload;
  } catch (err) {
    // console.error(' Socket auth failed');
    return socket.disconnect();
  }
  // console.log(userId)

  
  
  // Join 1-on-1 room
  
  socket.on(SOCKET_EVENTS.JOIN_ROOM, ({ withUserId }) => {
    if (!userId || !withUserId) return;
    const roomId = getRoomId({userId:userId,withUserId: withUserId});
    socket.join(roomId);
    console.log(` ${userId} joined room ${roomId}`);
  });

  // Send private message
  //can add feedback function to confirm mesage delivery

  
  socket.on(SOCKET_EVENTS.SEND_PRIVATE_MESSAGE, ({ toUserId, newmessage }) => {
    if (!userId || !toUserId) return;
    
    const roomId = getRoomId({userId:userId,withUserId: toUserId});
    const msg = {
      ...newmessage,
      from: userId,
      roomId,
      to:toUserId
      
    };
    
    socket.emit("UserMessage",msg)


    socket.to(roomId).emit(SOCKET_EVENTS.RECEIVE_MESSAGE, msg);
    console.log(`Message sent from ${userId} to ${toUserId} in room ${roomId}`);
  });

  socket.on("first_chat", (newMessage) => {
    console.log("msgRecieved:", newMessage);

    socket.broadcast.emit("recieved", newMessage);
  });
}