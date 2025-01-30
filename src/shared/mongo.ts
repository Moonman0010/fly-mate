import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "";

export const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log("✅ MongoDB already connected");
    return;
  }

  try {
    await mongoose.connect(MONGO_URI, {
      dbName: "flymate", // Specify your database name
    });
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1); // Exit the process if connection fails
  }
};