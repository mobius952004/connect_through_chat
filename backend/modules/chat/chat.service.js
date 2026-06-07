import Chat from "./chat.model.js";
import Message from "../message/message.model.js";

class chat_Services {
  async setChatList(userId, otherUserId, otherUserName) {
    const chat = await Chat.findOne({
      users: { $all: [userId, otherUserId], $size: 2 }
    });

    if (chat) return { chat, isNew: false };

    try {
      const newChat = await Chat.create({
        users: [userId, otherUserId],
        chatName: otherUserName,
        lastmessage:" ",
      });
      const populatedChat = await newChat.populate("users", "username profilePic status isOnline");
      return { chat: populatedChat, isNew: true };
    } catch (err) {
      throw new Error(err);
    }
  }

  async createGroupChat(userId, usersArray, Name) {
    // if (!usersArray || usersArrray.length < 2) {
    //   throw new Error("Group chat requires at least 2 other users");
    // }
    const participants = [...usersArray, userId];

    try {

      const groupChat = await Chat.create({
        users: participants,
        isGroup: true,
        chatName: Name,
      });

      const populatedChat = await groupChat.populate("users", "username profilePic status isOnline");

      return { chat: populatedChat, isNew: true };
    } catch (err) {

      throw new Error(err.message);

    }
  }

async getChatList(userId) {
  try {

    const chatlist = await Chat.find({
      users: userId
    })
      .populate(
        "users",
        "username profilePic status isOnline"
      )
      .populate("lastMessage").sort({
        createdAt:-1,
      });

    const chatsWithUnread = await Promise.all(

      chatlist.map(async (chat) => {

        const readInfo =
          chat.lastReadBy?.get(userId.toString());

        let unreadCount = 0;

        if (!readInfo?.messageId) {

          unreadCount =
            await Message.countDocuments({
              Chat: chat._id,
              from: { $ne: userId },
            });

        } else {

          const lastReadMessage =
            await Message.findById(
              readInfo.messageId
            );

          if (lastReadMessage) {

            unreadCount =
              await Message.countDocuments({
                Chat: chat._id,

                from: {
                  $ne: userId,
                },

                createdAt: {
                  $gt: lastReadMessage.createdAt,
                },
              });
          }
        }

        return {
          ...chat.toObject(),
          unreadCount,
        };

      })
    );

    return chatsWithUnread;

  } catch (err) {
    throw new Error(err);
  }
}
}

export default new chat_Services()

