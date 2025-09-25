import Message from "./message.model.js";
import Chat from "../chat/chat.model.js";

class MessageService{
    async sendMessage({chatId, from, content}) {
        const msg = new Message({
            Chat: chatId,
            from,
            content,
            status: "sent",
        }) 

        await msg.save();

        await Chat.findByIdAndUpdate(chatId, { lastMessage: msg._id });
        return msg.populate("from Chat");
    }

    async getMessages(chatId) {
        return Message.find({ Chat: chatId })
          .populate("from")
          .populate("Chat")
          .sort({ createdAt: -1 });
    }
}

export default new MessageService();