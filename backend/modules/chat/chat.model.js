import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    isGroup: { type: Boolean, default: false },
    chatName: { type: String },
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    },
     lastReadBy: {
      type: Map,
      of: new mongoose.Schema(
        {
          messageId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
            default: null,
          },

          readAt: {
            type: Date,
            default: null,
          },
        },
        { _id: false }
      ),

      default: {},
    },
  },{
    createdAt: { type: Date, default: Date.now }
});
const Chat = mongoose.model('Chat', chatSchema);
export default Chat;