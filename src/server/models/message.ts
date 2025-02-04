import mongoose, { Schema, models } from "mongoose";

const MessageSchema = new Schema({
  channelId: {
    type: Schema.Types.ObjectId,
    ref: "Channel", // references channel.ts
    required: true,
    index: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User", // or just String if you haven't structured your User model
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  // Timestamps let you display or sort messages by time
}, { timestamps: true });

// We usually index (channelId, createdAt) for fast pagination.
MessageSchema.index({ channelId: 1, createdAt: 1 });

const Message = models.Message || mongoose.model("Message", MessageSchema);
export default Message;