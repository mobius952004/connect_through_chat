import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    Chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
    },
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    content: {
        type: String,
    },
    time: { type: String },
    date: { type: String },
    status: {
        type: String,
        enum: ["Pending", "sent", "delivered", "seen"],
        default: "Pending"
    },
});

const Message = mongoose.model("Message", messageSchema);
export default Message;
