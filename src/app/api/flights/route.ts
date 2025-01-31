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

    await connectToDatabase();
    let { airline, flightNumber, departure, arrival, date, time } = await req.json();

    if (!time) {
      throw new AppError("Time is required", 400);
    }

    // ✅ Generate Unique Flight Identifier
    const flightCode = `${flightNumber}-${date}-${time}`;

    // ✅ Check if flight already exists
    const existingFlight = await Flight.findOne({ flightCode });
    if (existingFlight) {
      return NextResponse.json({ message: "Flight already exists", flight: existingFlight }, { status: 200 });
    }

    // ✅ Create new flight
    const newFlight = await Flight.create({ airline, flightNumber, departure, arrival, date, time, flightCode });
    return NextResponse.json({ message: "Flight created", flight: newFlight }, { status: 201 });

  } catch (error) {
    // ✅ Use centralized error handler
    const { status, body } = handleError(error);
    return NextResponse.json(body, { status });
  }
}