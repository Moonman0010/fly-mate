import { connectToDatabase } from "@/server/shared/mongo";
import Itinerary from "@/server/models/Itinerary";
import { createChannel, findSubChannel, addUserToChannel } from "./channelController";

// Fetch Itinerary for a User
export const getItinerary = async (userId: string) => {
  await connectToDatabase();
  return await Itinerary.findOne({ userId }) || { travelLocations: [] };
};

// Create a New Itinerary & Main Channel
export const createItinerary = async (userId: string, flightRoute: string, initialLocation: string) => {
  await connectToDatabase();

  let itinerary = await Itinerary.findOne({ userId });

  if (!itinerary) {
    // Create a main channel for this flight route
    const mainChannelId = await createChannel(flightRoute, "main");

    itinerary = new Itinerary({
      userId,
      flightRoute,
      travelLocations: [initialLocation],
      channelId: mainChannelId,
      subChannels: [],
    });

    await itinerary.save();
  }

  return itinerary;
};

// Add New Location & Handle Sub-Channels
export const addLocationToItinerary = async (userId: string, newLocation: string) => {
  await connectToDatabase();
  let itinerary = await Itinerary.findOne({ userId });

  if (!itinerary) {
    throw new Error("Itinerary not found. Please create one first.");
  }

  // Check if a sub-channel already exists for this location
  let subChannelId = await findSubChannel(newLocation);

  if (!subChannelId) {
    // Create a new sub-channel if it doesn’t exist
    subChannelId = await createChannel(newLocation, "sub", itinerary.channelId);
    itinerary.subChannels.push({ location: newLocation, subChannelId });
  } else {
    // Add the user to the existing sub-channel
    await addUserToChannel(userId, subChannelId);
  }

  if (!itinerary.travelLocations.includes(newLocation)) {
    itinerary.travelLocations.push(newLocation);
  }

  await itinerary.save();
  return itinerary.travelLocations;
};
