// 📂 /server/controllers/ChannelController.ts
import { v4 as uuidv4 } from "uuid";
import Channel from "@/server/models/channel";

/**
 * Create a new chat channel (main or sub)
 * @param name - Channel name (e.g., Flight Route or Location)
 * @param type - "main" for flight routes, "sub" for locations
 * @param parentId - Parent channel ID (only for sub-channels)
 * @returns Newly created channel ID
 */
export const createChannel = async (name: string, type: "main" | "sub", parentId: string | null = null) => {
  try {
    const newChannel = new Channel({
      channelId: uuidv4(), // Generate unique ID
      name,
      type,
      parentId,
      users: [],
    });

    await newChannel.save();
    return newChannel.channelId;
  } catch (error) {
    console.error("Error creating channel:", error);
    throw new Error("Failed to create channel");
  }
};

/**
 * Check if a sub-channel exists for a given location
 * @param location - The travel location (sub-channel name)
 * @returns Existing sub-channel ID or null
 */
export const findSubChannel = async (location: string) => {
  try {
    const subChannel = await Channel.findOne({ name: location, type: "sub" });
    return subChannel ? subChannel.channelId : null;
  } catch (error) {
    console.error("Error finding sub-channel:", error);
    throw new Error("Failed to check sub-channel existence");
  }
};

/**
 * Add a user to a channel (main or sub)
 * @param userId - User ID to add
 * @param channelId - Channel ID where user should be added
 */
export const addUserToChannel = async (userId: string, channelId: string) => {
  try {
    const channel = await Channel.findOne({ channelId });

    if (channel && !channel.users.includes(userId)) {
      channel.users.push(userId);
      await channel.save();
    }
  } catch (error) {
    console.error("Error adding user to channel:", error);
    throw new Error("Failed to add user to channel");
  }
};