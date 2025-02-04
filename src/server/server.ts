import express from "express";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Models
import Channel from "./models/channel";
import Flight from "./models/flight";
import Message from "./models/message";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

// Middleware
app.use(express.json());
app.use(cors());

// ------------------------------
// TRACK ACTIVE USERS & MESSAGE BUFFERS
// ------------------------------
/**
 * Map<channelId, Set<socketId>> to track which sockets are in which channel.
 */
const activeUsers = new Map<string, Set<string>>();

/**
 * Buffers messages before saving to MongoDB to reduce write operations.
 * Map<channelId, { messages: BufferedMessage[] }>
 */
interface BufferedMessage {
  userId: string;
  content: string;
  timestamp: Date;
}
const messageBuffers = new Map<string, { messages: BufferedMessage[] }>();

// ------------------------------
// SOCKET.IO CONNECTION
// ------------------------------
io.on("connection", (socket) => {
  console.log(`🔌 Client connected: ${socket.id}`);

  // CLIENT REQUESTS TO JOIN A CHANNEL
  socket.on("join_chat", async ({ channelId, userId }) => {
    try {
      // 1) Verify channel exists
      const channel = await Channel.findById(channelId);
      if (!channel) {
        socket.emit("error", "Channel does not exist or invalid channelId");
        return;
      }

      // 2) (Optional) If channel references a flight, ensure user is a passenger
      const flight = await Flight.findById(channel.flightId);
      if (!flight) {
        socket.emit("error", "Flight not found for this channel");
        return;
      }

      // Check membership: flight.passengers is an array of ObjectIds
      const isPassenger = flight.passengers.some(
        (p: string) => p.toString() === userId
      );
      if (!isPassenger) {
        socket.emit(
          "error",
          "You are not a passenger in the flight for this channel"
        );
        return;
      }

      // 3) Join the Socket.io "room" for this channel
      socket.join(channelId);
      console.log(`👤 User ${userId} joined channel ${channelId}`);

      // 4) Initialize buffer & active user set if needed
      if (!messageBuffers.has(channelId)) {
        messageBuffers.set(channelId, { messages: [] });
      }

      if (!activeUsers.has(channelId)) {
        activeUsers.set(channelId, new Set());
      }
      activeUsers.get(channelId)!.add(socket.id);

      // 5) Notify others in the channel
      io.to(channelId).emit("user_joined", {
        userId,
        count: activeUsers.get(channelId)?.size || 0,
      });
    } catch (err) {
      console.error("❌ Error in join_chat:", err);
      socket.emit("error", "Failed to join channel");
    }
  });

  // CLIENT SENDS A MESSAGE
  socket.on("send_message", async ({ channelId, userId, content }) => {
    try {
      console.log(`📨 Message from ${userId} in ${channelId}: ${content}`);

      // 1) Verify channel again if you want
      //    (Alternatively, trust that they've joined already)
      const channel = await Channel.findById(channelId);
      if (!channel) {
        socket.emit("error", "Invalid channelId");
        return;
      }

      // 2) Add message to buffer
      if (!messageBuffers.has(channelId)) {
        messageBuffers.set(channelId, { messages: [] });
      }
      messageBuffers.get(channelId)!.messages.push({
        userId,
        content,
        timestamp: new Date(),
      });

      // 3) Broadcast to everyone
      io.to(channelId).emit("receive_message", {
        userId,
        content,
        timestamp: new Date(),
      });

      // 4) Save if buffer size hits threshold
      if (messageBuffers.get(channelId)!.messages.length >= 20) {
        await flushChannelMessages(channelId);
      }
    } catch (err) {
      console.error("❌ Error in send_message:", err);
      socket.emit("error", "Failed to send message");
    }
  });

  // CLIENT DISCONNECTS
  socket.on("disconnect", async () => {
    console.log(`❌ Client disconnected: ${socket.id}`);

    // Find which channel this socket was in
    for (const [channelId, users] of activeUsers.entries()) {
      if (users.has(socket.id)) {
        users.delete(socket.id);
        io.to(channelId).emit("user_left", { count: users.size });

        // If channel is now empty, flush messages
        if (users.size === 0) {
          activeUsers.delete(channelId);
          await flushChannelMessages(channelId);
        }
        break;
      }
    }
  });
});

// ------------------------------
// FLUSH BUFFER TO DB
// ------------------------------
/**
 * Saves all buffered messages for a specific channel to the `Message` collection
 * and then clears the buffer.
 */
async function flushChannelMessages(channelId: string) {
  const buffer = messageBuffers.get(channelId);
  if (!buffer || buffer.messages.length === 0) return;

  const messagesToSave = buffer.messages;
  try {
    console.log(
      `💾 Saving ${messagesToSave.length} messages for channel ${channelId}...`
    );

    // Convert to docs for insertion
    const docs = messagesToSave.map((msg) => ({
      channelId,
      userId: msg.userId,
      content: msg.content,
      createdAt: msg.timestamp, // because we have timestamps in Message schema
      updatedAt: msg.timestamp,
    }));

    await Message.insertMany(docs);

    // Reset buffer
    messageBuffers.set(channelId, { messages: [] });

    console.log("✅ Messages saved and buffer cleared!");
  } catch (error) {
    console.error("❌ Error saving messages:", error);
  }
}

// ------------------------------
// API ROUTE FOR TEST
// ------------------------------
app.get("/", (req, res) => {
  res.send("FlyMate WebSocket & API Server is running!");
});

// ------------------------------
// CONNECT TO MONGODB
// ------------------------------
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/flymate";
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ------------------------------
// GRACEFUL SHUTDOWN
// ------------------------------
process.on("SIGINT", async () => {
  console.log("🛑 Server shutting down... Saving all pending messages.");
  for (const channelId of messageBuffers.keys()) {
    await flushChannelMessages(channelId);
  }
  console.log("✅ All unsaved messages saved. Exiting.");
  process.exit(0);
});

// ------------------------------
// START SERVER
// ------------------------------
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
