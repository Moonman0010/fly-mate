import express from "express";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Chat from "./models/chat"; // Mongoose Chat Model

dotenv.config(); // Load environment variables

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }, // Allow frontend requests
});

// Middleware
app.use(express.json()); // JSON body parser
app.use(cors()); // Enable CORS for frontend access

// Active users tracking
const activeUsers = new Map<string, Set<string>>(); // Map<flightCode, Set<socketId>>

// Message buffer before saving to DB
const chatBuffers = new Map<string, { messages: { userId: string; message: string; timestamp: Date }[] }>();

io.on("connection", (socket) => {
  console.log(`🔌 New client connected: ${socket.id}`);

  // 📌 User joins a flight chat
  socket.on("join_chat", ({ flightCode, userId }) => {
    socket.join(flightCode);
    console.log(`👤 User ${userId} joined chat ${flightCode}`);

    // Initialize chat buffer if not exists
    if (!chatBuffers.has(flightCode)) {
      chatBuffers.set(flightCode, { messages: [] });
    }

    // Track active users
    if (!activeUsers.has(flightCode)) activeUsers.set(flightCode, new Set());
    activeUsers.get(flightCode)!.add(socket.id);

    // Notify others in the chat
    io.to(flightCode).emit("user_joined", { userId, count: activeUsers.get(flightCode)?.size || 0 });
  });

  // 📌 Handle chat messages
  socket.on("send_message", async ({ flightCode, userId, message }) => {
    console.log(`📨 Message from ${userId} in ${flightCode}: ${message}`);

    // Store message in buffer
    if (!chatBuffers.has(flightCode)) chatBuffers.set(flightCode, { messages: [] });
    chatBuffers.get(flightCode)!.messages.push({ userId, message, timestamp: new Date() });

    // Broadcast message to everyone in the chat
    io.to(flightCode).emit("receive_message", { userId, message, timestamp: new Date() });

    // Save when buffer reaches 20 messages
    if (chatBuffers.get(flightCode)!.messages.length >= 20) {
      await saveChatMessages(flightCode);
    }
  });

  // 📌 Handle user disconnect
  socket.on("disconnect", async () => {
    console.log(`❌ Client disconnected: ${socket.id}`);

    for (const [flightCode, users] of activeUsers.entries()) {
      if (users.has(socket.id)) {
        users.delete(socket.id);
        io.to(flightCode).emit("user_left", { count: users.size });
        if (users.size === 0) {
          activeUsers.delete(flightCode);
          await saveChatMessages(flightCode); // Save chat on last user leaving
        }
        break;
      }
    }
  });
});

// 📌 Save Chat Messages in Batches
async function saveChatMessages(flightCode: string) {
  if (!chatBuffers.has(flightCode) || chatBuffers.get(flightCode)!.messages.length === 0) {
    return; // No messages to save
  }

  const messagesToSave = chatBuffers.get(flightCode)!.messages;

  try {
    console.log(`💾 Saving ${messagesToSave.length} messages for ${flightCode}...`);

    await Chat.updateOne(
      { flightCode },
      { $push: { messages: { $each: messagesToSave } } },
      { upsert: true }
    );

    // Clear buffer after saving
    chatBuffers.set(flightCode, { messages: [] });
    console.log("✅ Messages saved and buffer cleared!");
  } catch (error) {
    console.error("❌ Error saving messages:", error);
  }
}

// 📌 API Route for Testing
app.get("/", (req, res) => {
  res.send("FlyMate WebSocket & API Server is running!");
});

// 📌 Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/flymate";
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// 📌 Graceful Shutdown - Save Unstored Messages
process.on("SIGINT", async () => {
  console.log("🛑 Server shutting down... Saving all chats.");

  for (const flightCode of chatBuffers.keys()) {
    await saveChatMessages(flightCode);
  }

  console.log("✅ All unsaved messages saved. Exiting.");
  process.exit(0);
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
