import mongoose, { Schema, models } from "mongoose";

const ChannelSchema = new Schema({
  channelId: {
    type: String, // Use UUID for unique identifier
    required: true,
    unique: true, // Ensure uniqueness
    index: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["main", "sub"], // Defines "main" and "sub" channels
    required: true,
  },
  parentId: {
    type: String, // UUID of the parent main channel (if sub-channel)
    default: null,
    index: true, // Optimize queries on parentId
  },
  users: [
    {
      type: String, // Store user IDs
      required: true,
    },
  ],
});

const Channel = models.Channel || mongoose.model("Channel", ChannelSchema);
export default Channel;