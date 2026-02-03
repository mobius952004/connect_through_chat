// sockets/chat.socket.js
import jwtServices from "../shared/utils/jwt.utils.js";
import { SOCKET_EVENTS } from "../middleware/socket.events.js";
import Message from "../modules/message/message.model.js";

const getRoomId = ({ userId, withUserId }) => {
  return [userId, withUserId].sort().join("_");
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


    socket.join(userId);
    console.log(`User ${userId} joined their personal room`);
    // --- FIX ENDS HERE ---

  } catch (err) {
    // console.error(' Socket auth failed');
    return socket.disconnect();
  }
  // console.log(userId)

  // Join 1-on-1 room

  socket.on(SOCKET_EVENTS.JOIN_ROOM, ({ withUserId }) => {
    if (!userId || !withUserId) return;
    const roomId = getRoomId({ userId: userId, withUserId: withUserId });
    socket.join(roomId);
    console.log(` ${userId} joined room ${roomId}`);
  });

  // Send private message
  //can add feedback function to confirm mesage delivery

  socket.on(
    SOCKET_EVENTS.SEND_PRIVATE_MESSAGE,
    async ({ toUserId, newmessage }, callback) => {
      if (!userId || !toUserId) return;


      const roomId = getRoomId({ userId: userId, withUserId: toUserId });

      const cleanMessage = {
        content: newmessage.content,
        to: toUserId,
        from: userId,
        fromName: newmessage.fromName,
        roomId: getRoomId({ userId, withUserId: toUserId }),
        Chat: newmessage.Chat,
        time: newmessage.time,
        date: newmessage.date,
        status: "Sent",
      };

      const updatedmessage = await Message.create(cleanMessage);
      callback(updatedmessage);



      io.to(roomId).emit(SOCKET_EVENTS.RECEIVE_MESSAGE, updatedmessage);
      updatedmessage.status = "Delivered";
      await updatedmessage.save();

      io.to(userId).emit("MESSAGE_STATUS", updatedmessage);
      console.log(
        `Message sent from ${userId} to ${toUserId} in room ${roomId}`
      );
    }
  );

  socket.on("MESSAGE_READ", async ({ messageId }) => {
    const msg = await Message.findById(messageId);
    if (!msg) return;

    msg.status = "Read";
    await msg.save();

    // notify sender
    io.to(msg.from).emit("MESSAGE_UPDATED", msg);
  });
}
