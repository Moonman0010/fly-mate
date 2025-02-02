import mongoose, { Schema, models } from "mongoose";

interface IChat {
  flightCode: string;
  name: string;
  type: "flight" | "subchat";
  linkedChats?: mongoose.Schema.Types.ObjectId[];
  level: number;
  members?: mongoose.Schema.Types.ObjectId[];
  tags?: string[];
}

const ChatSchema = new Schema<IChat>(
  {
    flightCode: { type: String, required: true, index: true },
    name: { type: String, required: true },
    type: { type: String, enum: ["flight", "subchat"], default: "flight" },
    linkedChats: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chat", default: [] }],
    level: { type: Number, default: 0, min: 0 }, // Ensuring level is non-negative
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }], // Default to empty array
    tags: [{ type: String, default: [] }]
  },
  { timestamps: true }
);

// Additional indexes for performance
ChatSchema.index({ name: 1 });
ChatSchema.index({ level: 1 });

const Chat = models.Chat || mongoose.model<IChat>("Chat", ChatSchema);
export default Chat;