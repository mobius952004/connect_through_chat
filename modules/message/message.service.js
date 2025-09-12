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

        await Chat.findByIdAndUpdate(chatId, { lastMessage: message._id });
        return message.populate("from Chat");
    }

    async getMessage(chatId) {
        return Message.find({ Chat: chatId })
          .populate("from")
          .populate("Chat")
          .sort({ createdAt: 1 });
    }
}

export default new MessageService();