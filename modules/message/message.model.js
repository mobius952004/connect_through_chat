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
    fromName:{type:String},
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    content: {
        type: String,
        // required: true
    },
    roomId:String,
    time: { type: String },
    date: { type: String },
    status: {
        type: String,
        // enum: ["Pending","sent", "delivered", "seen"],
        // default: "Pending"
    },
}, { timestamps: true });

const Message = mongoose.model("Message", messageSchema);
export default Message;
