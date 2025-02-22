// 📂 /server/shared/channelService.ts
import { v4 as uuidv4 } from "uuid";
import Channel from "@/server/models/channel";

// Create a new chat channel
export const createChannel = async (channelName: string) => {
  const newChannel = new Channel({
    channelId: uuidv4(),
    name: channelName,
    users: []
  });

  await newChannel.save();
  return newChannel.channelId;
};

// Find an existing sub-channel by location
export const findSubChannel = async (location: string) => {
  const subChannel = await Channel.findOne({ name: location });
  return subChannel ? subChannel.channelId : null;
};

// Add user to an existing channel
export const addUserToChannel = async (userId: string, channelId: string) => {
  const channel = await Channel.findOne({ channelId });

  if (channel && !channel.users.includes(userId)) {
    channel.users.push(userId);
    await channel.save();
  }
};