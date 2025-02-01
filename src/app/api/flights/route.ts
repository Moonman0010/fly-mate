import { NextResponse } from "next/server";
import { connectToDatabase } from "@/shared/mongo";
import Flight from "@/models/flight";
import { authenticate } from "@/middleware/auth";
import { AppError, handleError } from "@/shared/error";

export async function POST(req: Request) {
  try {
    // ✅ Authenticate user
    const user = authenticate(req);
    if (user instanceof NextResponse) return user;

    // ✅ Extract `userId` correctly
    const userId = typeof user === "string" ? user : user.userId;

    await connectToDatabase();
    let { airline, flightNumber, departure, arrival, date, time } = await req.json();

    if (!flightNumber || !departure || !arrival || !date || !time) {
      throw new AppError("All flight details are required", 400);
    }

    // ✅ Generate Unique Flight Identifier
    const flightCode = `${flightNumber}-${date}`;

    // ✅ Check if flight already exists
    let flight = await Flight.findOne({ flightCode });

    if (flight) {
      // ✅ Check if user is already in passengers list
      if (!flight.passengers.includes(userId)) {
        flight.passengers.push(userId);
        await flight.save();
      }
      return NextResponse.json({ message: "Joined flight", flight }, { status: 200 });
    }

    // ✅ Create new flight
    flight = await Flight.create({ airline, flightNumber, departure, arrival, date, time, flightCode, passengers: [userId] });

    return NextResponse.json({ message: "Flight created", flight }, { status: 201 });
  } catch (error) {
    // ✅ Use centralized error handler
    const { status, body } = handleError(error);
    return NextResponse.json(body, { status });
  }
}

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const flightCode = searchParams.get("flightCode");

    if (!flightCode) {
      throw new AppError("Flight code is required", 400);
    }

    // ✅ Fetch flight details
    const flight = await Flight.findOne({ flightCode }).populate("departure arrival passengers");

    if (!flight) {
      return NextResponse.json({ error: "Flight not found" }, { status: 404 });
    }

    return NextResponse.json({ flight }, { status: 200 });
  } catch (error) {
    const { status, body } = handleError(error);
    return NextResponse.json(body, { status });
  }
}
