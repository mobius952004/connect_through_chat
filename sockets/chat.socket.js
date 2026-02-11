// sockets/chat.socket.js
import jwtServices from "../shared/utils/jwt.utils.js";
import { SOCKET_EVENTS } from "../middleware/socket.events.js";
import Message from "../modules/message/message.model.js";
import Chat from "../modules/chat/chat.model.js";

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
        replyTo: newmessage.replyTo,
        status: "Sent",
      };

      const updatedmessage = await Message.create(cleanMessage);

      await updatedmessage.populate({
        path: "replyTo",
        select: "content from"
      });
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


  socket.on("forward:messages", async ({ forwardMessage, forwardTo }) => {
    try {
      if (!forwardMessage || !forwardTo || !Array.isArray(forwardTo)) return;

      const originalMessages = await Message.find({
        _id: { $in: forwardMessage }
      });

      if (!originalMessages.length) return;

      for (const chatId of forwardTo) {
        // Find the chat to get participants and determine 'to' user (for 1-v-1)
        const chat = await Chat.findById(chatId).populate("users");
        if (!chat) continue;

        let toUserId = null;
        let roomId = chatId.toString(); // Default for group

        if (!chat.isGroup) {
          // Find the other user
          const otherUser = chat.users.find(u => u._id.toString() !== userId);
          if (otherUser) {
            toUserId = otherUser._id;
            roomId = getRoomId({ userId, withUserId: toUserId });
          }
        }

        // Process each message
        for (const originalMsg of originalMessages) {
          const newMessageData = {
            content: originalMsg.content,
            Chat: chatId,
            from: userId,
            fromName: socket.user.username, // Assuming username is in payload
            to: toUserId, // Can be null for group chats if schema allows
            roomId: roomId,
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            date: new Date().toLocaleDateString([], {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }),
            status: "Sent",
            // We can add a 'forwarded' flag or Reference if schema supported it, 
            // but for now just content copy as per original code, 
            // maybe keep 'replyTo' null or original? Usually null for forward.
          };

          const savedMessage = await Message.create(newMessageData);

          // Emit to the room (works for 1-v-1 if both strictly join 'roomId')
          // Note: In 1-v-1, we use getRoomId(). In Group, we need to ensure they join 'chatId'.
          // Assuming Group Chat implementation joins 'chatId' somewhere.
          // If 1-v-1, use roomId.
          io.to(roomId).emit(SOCKET_EVENTS.RECEIVE_MESSAGE, savedMessage);

          savedMessage.status = "Delivered";
          await savedMessage.save();

          // Update last message in Chat
          await Chat.findByIdAndUpdate(chatId, { lastMessage: savedMessage._id });
        }
      }

      // Notify sender that forwarding is done (optional)
      // socket.emit("FORWARD_SUCCESS"); 

    } catch (error) {
      console.error("Forward Error:", error);
    }
  });



}
