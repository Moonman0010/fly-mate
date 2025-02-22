import mongoose from "mongoose";

const ItinerarySchema = new mongoose.Schema({
  userId: { type: String, required: true }, // User making the trip
  flightRoute: { type: String, required: true }, // Initial flight leg (e.g., "CHI → DEL")
  travelLocations: [{ type: String }], // Additional travel locations (e.g., "Agra", "Jaipur")
  channelId: { type: String, required: true }, // Main Channel ID
  subChannels: [{ location: String, subChannelId: String }], // Sub-channels per location
  createdAt: { type: Date, default: Date.now } // Timestamp of itinerary creation
});

export default mongoose.model("Itinerary", ItinerarySchema);