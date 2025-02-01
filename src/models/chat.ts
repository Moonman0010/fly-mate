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
    linkedChats: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chat", default: [] }], // ✅ Explicitly include linkedChats
    level: { type: Number, default: 0 },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    tags: [{ type: String }]
  },
  { timestamps: true }
);

const Chat = models.Chat || mongoose.model<IChat>("Chat", ChatSchema);
export default Chat;