import chatServices from "./chat.service.js"
import { SOCKET_EVENTS } from "../../middleware/socket.events.js";

class Chat_controller {

  async setChatList(req, res) {
    const userId = req.user.sub
    const otherUserId = req.body.selecteduserId
    const otherUserName = req.body.selectedusername

    try {
      const { chat, isNew } = await chatServices.setChatList(userId, otherUserId, otherUserName)

      if (isNew) {
        // Emit NEW_CHAT to all participants
        const io = req.app.get("io");
        if (io) {
          chat.users.forEach(user => {
            // Don't emit to sender if they already got it via response (optional/redundant but safe)
            if (user._id.toString() !== userId) {
              io.to(user._id.toString()).emit(SOCKET_EVENTS.NEW_CHAT, chat);
            }
          });
        }
      }

      res.status(200).json(chat)
    } catch (err) {
      res.status(404).json({ msg: `chat not created${err}` })
    }

  }

  async createGroupChat(req, res) {
    const userId = req.user.sub;
    const { createGroup, Name } = req.body;
    console.log("reached controller")
 console.log(Name)
 console.log(createGroup)
  if (!createGroup?.length || !Name?.trim()) {
    return res.status(400).json({
      message: "Please fill all fields"
    });
  }
      console.log("passed first statement ")
    try {
      // Ensure users is an array (parse if stringified)
      console.log("trying")
      const usersArray = typeof users === 'string' ? JSON.parse(createGroup) : createGroup;

      const { chat, isNew } = await chatServices.createGroupChat(userId, usersArray, Name);

      if (isNew) {
        const io = req.app.get("io");
        if (io) {
          chat.users.forEach(user => {
            if (user._id.toString() !== userId) {


              io.to(user._id.toString()).emit(SOCKET_EVENTS.NEW_CHAT, chat);
            }
          });
        }
      }

      res.status(200).json(chat);
    } catch (err) {
      console.log("failed")
      res.status(400).json({ message: err.message });
    }
  }

  async getChatList(req, res) {

    const userId = req.user.sub
    try {
      const chatlist = await chatServices.getChatList(userId)
      res.status(200).json(chatlist)

    } catch (err) {
      res.json({ message: err })
    }
  }
}

export default new Chat_controller()