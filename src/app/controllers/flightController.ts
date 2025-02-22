// 📂 /server/controllers/FlightController.ts

import Flight from "@/server/models/flight";
import { AppError } from "@/server/shared/error";

// Define a parameter interface for the createOrJoinFlight function
export interface CreateOrJoinFlightParams {
  userId: string;
  airline?: string;
  flightNumber: string;
  departure: string; // or ObjectId if you're storing them as references
  arrival: string;   // same note as above
  date: string;      // "YYYY-MM-DD"
  time: string;      // "HH:mm"
}

/**
 * Create or join an existing flight
 */
export const createOrJoinFlight = async ({
  userId,
  airline,
  flightNumber,
  departure,
  arrival,
  date,
  time,
}: CreateOrJoinFlightParams) => {
  // Basic validation
  if (!flightNumber || !departure || !arrival || !date || !time) {
    throw new AppError("All flight details are required", 400);
  }

  // Generate Unique Flight Identifier
  const flightCode = `${flightNumber}-${date}-${time}`;

  // Check if flight already exists
  let flight = await Flight.findOne({ flightCode });

  if (flight) {
    // If user is not already a passenger, add them
    if (!flight.passengers.includes(userId)) {
      flight.passengers.push(userId);
      await flight.save();
    }
    return {
      status: 200,
      message: "Joined flight",
      flight,
    };
  }

  // If flight doesn't exist, create a new one
  flight = await Flight.create({
    airline,
    flightNumber,
    departure,
    arrival,
    date,
    time,
    flightCode,
    passengers: [userId],
  });

  return {
    status: 201,
    message: "Flight created",
    flight,
  };
};

/**
 * Get flight details by flightCode
 */
export const getFlightDetails = async (flightCode: string) => {
  if (!flightCode) {
    throw new AppError("Flight code is required", 400);
  }

  // Fetch flight details and populate references
  const flight = await Flight.findOne({ flightCode }).populate("departure arrival passengers");

  if (!flight) {
    return {
      status: 404,
      message: "Flight not found",
      flight: null,
    };
  }

  return {
    status: 200,
    message: "Flight found",
    flight,
  };
};
