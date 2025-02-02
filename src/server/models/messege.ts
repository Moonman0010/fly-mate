import mongoose, { Schema, models } from "mongoose";

const MessageSchema = new Schema(
  {
    chatId: { type: mongoose.Schema.Types.ObjectId, ref: "Chat", required: true }, // Links message to chat
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User sending message
    senderName: { type: String, required: true }, // Display name
    text: { type: String, required: true }, // Message content
    timestamp: { type: Date, default: Date.now }, // Time sent
  },
  { timestamps: false }
);

const Message = models.Message || mongoose.model("Message", MessageSchema);
export default Message;