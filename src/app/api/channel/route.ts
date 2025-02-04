import { NextResponse } from "next/server";
import { connectToDatabase } from "@/server/shared/mongo";
import { authenticate } from "@/server/middleware/auth";
import { AppError, handleError } from "@/server/shared/error";

import Channel from "@/server/models/channel";
import Flight from "@/server/models/flight";
import User from "@/server/models/user";
import mongoose from "mongoose";

//
// POST /api/channel
// Body: { flightId, name, type?, parentId? }
// Creates a new channel if the user is a passenger of the given flight.
//
export async function POST(req: Request) {
  try {
    // 1) Authenticate user
    const authUser = authenticate(req);
    if (authUser instanceof NextResponse) return authUser;

    // Extract the userId (assuming your `authenticate` returns user object with userId)
    const userId = typeof authUser === "string" ? authUser : authUser.userId;

    // 2) Connect to DB
    await connectToDatabase();

    // 3) Parse request body
    const { flightId, name, type, parentId } = await req.json();

    // 4) Basic validation
    if (!flightId || !name) {
      throw new AppError("flightId and name are required", 400);
    }

    // (Optional) Validate channel type
    const validTypes = ["text", "category"];
    if (type && !validTypes.includes(type)) {
      throw new AppError(`Invalid channel type. Use one of: ${validTypes.join(", ")}`, 400);
    }

    // 5) Ensure user exists in DB (if your authenticate doesn't guarantee that)
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError("User not found. Invalid userId.", 404);
    }

    // 6) Check flight & membership
    const flight = await Flight.findById(flightId);
    if (!flight) {
      throw new AppError("Flight not found. Provide a valid flightId.", 404);
    }

    // Make sure user is a passenger of this flight
    const isPassenger = flight.passengers.some((p: mongoose.Types.ObjectId) => p.equals(user._id));
    if (!isPassenger) {
      throw new AppError("User is not a passenger of this flight. Access denied.", 403);
    }

    // 7) If parentId is provided, ensure the parent channel belongs to the same flight
    let parentChannel = null;
    if (parentId) {
      parentChannel = await Channel.findById(parentId);
      if (!parentChannel) {
        throw new AppError("Parent channel not found.", 404);
      }
      if (!parentChannel.flightId.equals(flight._id)) {
        throw new AppError("Parent channel belongs to a different flight.", 403);
      }
    }

    // 8) Create the channel
    const channel = await Channel.create({
      flightId: flight._id,
      name,
      type: type || "text",
      parentId: parentId || null,
    });

    // 9) Respond with newly created channel
    return NextResponse.json(channel, { status: 201 });
  } catch (error) {
    const { status, body } = handleError(error);
    return NextResponse.json(body, { status });
  }
}

//
// GET /api/channel?flightId=abc123&userId=xyz456
// Returns all channels for a flight if the user is a passenger.
// (You can also fetch parent/child channels specifically if needed.)
//
export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const url = new URL(req.url);
    const flightId = url.searchParams.get("flightId");
    const userId = url.searchParams.get("userId"); // to confirm membership

    if (!flightId || !userId) {
      throw new AppError("flightId and userId query params are required", 400);
    }

    // 1) Check if user & flight exist
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError("User not found.", 404);
    }

    const flight = await Flight.findById(flightId);
    if (!flight) {
      throw new AppError("Flight not found.", 404);
    }

    // 2) Ensure membership
    const isPassenger = flight.passengers.some((p: mongoose.Types.ObjectId) => p.equals(user._id));
    if (!isPassenger) {
      throw new AppError("User is not a passenger of this flight. Access denied.", 403);
    }

    // 3) Fetch channels for that flight
    const channels = await Channel.find({ flightId }).exec();

    // 4) Return them
    return NextResponse.json(channels, { status: 200 });
  } catch (error) {
    const { status, body } = handleError(error);
    return NextResponse.json(body, { status });
  }
}
