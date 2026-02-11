import Chat from "./chat.model.js";

class chat_Services {
  async setChatList(userId, otherUserId, otherUserName) {

    // console.log('H1')

    const chat = await Chat.findOne({
        users: { $all: [userId, otherUserId], $size: 2 }
    });

    if (chat) return chat; // chat already exists
  // console.log("H4")
    try {
      // console.log("h5")
      const chat = await Chat.create({ users: [userId, otherUserId] ,
       
      });
      // console.log(`controller-${chat}`)
      return chat.populate("users", "username profilePic status isOnline");
    } catch (err) {
      throw new Error(err);
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

