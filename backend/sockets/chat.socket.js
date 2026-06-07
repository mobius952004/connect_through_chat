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

  // Join room by Chat ID
  socket.on(SOCKET_EVENTS.JOIN_ROOM, ({ chatId }) => {
    if (!chatId) return;
    socket.join(chatId);
    // console.log(`User ${userId} joined room ${chatId}`);
  });

  // Send private message
  socket.on(
    SOCKET_EVENTS.SEND_PRIVATE_MESSAGE,
    async ({ newmessage }, callback) => {
      if (!userId || !newmessage.Chat) return;

      const roomId = newmessage.Chat; // Use Chat ID as room ID

      const cleanMessage = {
        content: newmessage.content,
        to: newmessage.to,
        from: userId,
        fromName: newmessage.fromName,
        roomId: roomId,
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

     io.to(userId).emit("MESSAGE_STATUS_CHANGED", {
  messageId: updatedmessage._id,
  status: "Delivered",
});
    }
  );

  socket.on("MESSAGE_READ", async ({ messageId }) => {
    const msg = await Message.findById(messageId);
    if (!msg) return;

    msg.status = "Read";
    await msg.save();

    // notify sender
io.to(msg.from.toString()).emit("MESSAGE_STATUS_CHANGED", {
  messageId: msg._id,
  status: "Read",
});
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
            roomId = chatId.toString();
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
            isForward: true,

          };

          const savedMessage = await Message.create(newMessageData);

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


  socket.on("DELETE_MESSAGE", async ({ chatId, messageId }) => {
    // 1. Delete from DB
    await Message.deleteOne({ _id: messageId });

    // 2. Broadcast to the room so BOTH users see it disappear
    // We need to reconstruct roomId. 
    // If you don't have roomId easily, you can find the message first to get it.
    // Ideally, pass roomId from frontend if possible, or lookup:
    // const msg = await Message.findById(messageId); 
    // const roomId = getRoomId(...) or msg.Chat if group.

    // Simple way if you trust the client to send the right room/chatId:
    // For now, let's assume you broadcast to the 'chatId' room if that's how you handle groups, 
    // or loop through users. 

    // BETTER APPROACH FOR YOUR APP:
    // Just emit the event after the HTTP delete succeeds, OR do it all here.
    // Since you already have HTTP set up, let's use the socket just for notification.
  });


}
