// server/models/channel.ts
import mongoose, { Schema, models } from "mongoose";

const ChannelSchema = new Schema({
  flightId: {
    type: Schema.Types.ObjectId,
    ref: "Flight",
    required: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["text", "category"],
    default: "text",
  },
  parentId: {
    type: Schema.Types.ObjectId,
    ref: "Channel",
    default: null,
  },
});

const Channel = models.Channel || mongoose.model("Channel", ChannelSchema);
export default Channel;