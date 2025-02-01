import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "";

if (!MONGO_URI) {
  throw new Error("❌ MONGO_URI is not defined in .env.local");
}

// Global connection cache to prevent multiple connections
declare global {
  var mongooseConnection: Promise<typeof mongoose> | null;
}

export const connectToDatabase = async () => {
  if (global.mongooseConnection) {
    console.log("✅ Using existing MongoDB connection");
    return global.mongooseConnection;
  }

  console.log("🚀 Connecting to MongoDB...");
  global.mongooseConnection = mongoose.connect(MONGO_URI, {
    dbName: "flymate",
    maxPoolSize: 10, // Efficient connection pooling
  });

  await global.mongooseConnection; // Ensure the connection is established
  console.log("✅ Connected to MongoDB");
  return global.mongooseConnection;
};