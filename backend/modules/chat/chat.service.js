import Chat from "./chat.model.js";

class chat_Services {
  async setChatList(userId, otherUserId, otherUserName) {
    const chat = await Chat.findOne({
      users: { $all: [userId, otherUserId], $size: 2 }
    });

    if (chat) return { chat, isNew: false };

    try {
      const newChat = await Chat.create({
        users: [userId, otherUserId],
        chatName:otherUserName,
      });
      const populatedChat = await newChat.populate("users", "username profilePic status isOnline");
      return { chat: populatedChat, isNew: true };
    } catch (err) {
      throw new Error(err);
    }
  }

  async createGroupChat(userId, users, chatName) {
    if (!users || users.length < 2) {
      throw new Error("Group chat requires at least 2 other users");
    }
    users.push(userId);

    try {
      const groupChat = await Chat.create({
        users: users,
        isGroup: true,
        chatName: chatName,
        groupAdmin: userId,
      });

      const populatedChat = await groupChat.populate("users", "username profilePic status isOnline");
      return { chat: populatedChat, isNew: true };
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getChatList(userId) {
    try {
      const chatlist = await Chat.find({ users: userId }).populate(
        "users",
        "username profilePic status isOnline"
      );
      // console.log(chatlist);
      return chatlist;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default new chat_Services()

