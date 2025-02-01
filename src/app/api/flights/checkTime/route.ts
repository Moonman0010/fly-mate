import { NextResponse } from "next/server";
import { connectToDatabase } from "@/shared/mongo";
import Flight from "@/models/flight";
import { handleError } from "@/shared/error";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { flightNumber, date } = await req.json();

    // Validate input
    if (!flightNumber || !date) {
      return NextResponse.json({ error: "Flight number and date are required" }, { status: 400 });
    }

    // ✅ Search for flights on this date
    const flights = await Flight.find({ flightNumber, date }).select("time");

    if (flights.length > 0) {
      return NextResponse.json({ flights, message: "Available flight times found" }, { status: 200 });
    }

    return NextResponse.json({ message: "No flights found, please enter time manually" }, { status: 404 });

  } catch (error) {
    const { status, body } = handleError(error);
    return NextResponse.json(body, { status });
  }
}