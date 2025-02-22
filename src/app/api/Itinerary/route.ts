// 📂 /pages/api/itinerary/route.ts
import { NextApiRequest, NextApiResponse } from "next";
import { getItinerary, createItinerary, addLocationToItinerary } from "@/app/controllers/ItinerayController";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query as { userId: string };

  try {
    if (!userId) {
      return res.status(400).json({ error: "Missing userId" });
    }

    if (req.method === "GET") {
      const itinerary = await getItinerary(userId);
      return res.json(itinerary);
    }

    if (req.method === "POST") {
      const { flightRoute, initialLocation, newLocation } = req.body;

      if (flightRoute && initialLocation) {
        // Create a new itinerary and a main channel
        const newItinerary = await createItinerary(userId, flightRoute, initialLocation);
        return res.status(201).json({ success: true, itinerary: newItinerary });
      }

      if (newLocation) {
        // Add a new location to an existing itinerary and handle sub-channel logic
        const updatedLocations = await addLocationToItinerary(userId, newLocation);
        return res.json({ success: true, travelLocations: updatedLocations });
      }

      return res.status(400).json({ error: "Invalid request body" });
    }

    res.status(405).json({ message: "Method Not Allowed" });
  } catch (error) {
    console.error("Error handling itinerary request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
