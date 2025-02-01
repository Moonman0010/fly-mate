import { NextResponse } from "next/server";
import { connectToDatabase } from "@/shared/mongo";
import Airport from "@/models/airport";
import { AppError, handleError } from "@/shared/error";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    
    const airports = await req.json();
    
    if (!Array.isArray(airports) || airports.length === 0) {
      throw new AppError("Invalid input. Expected an array of airports", 400);
    }

    // ✅ Step 1: Remove duplicate IATA codes within the request body
    const uniqueAirports = Array.from(
      new Map(airports.map((a) => [a.iata_code, a])).values()
    );

    // ✅ Step 2: Get existing IATA codes from MongoDB
    const existingAirports = await Airport.find(
      { iata_code: { $in: uniqueAirports.map((a) => a.iata_code) } },
      { iata_code: 1 }
    );
    const existingIATACodes = new Set(existingAirports.map((a) => a.iata_code));

    // ✅ Step 3: Filter out airports that already exist in DB
    const newAirports = uniqueAirports.filter(
      (a) => !existingIATACodes.has(a.iata_code)
    );

    if (newAirports.length === 0) {
      return NextResponse.json(
        { message: "No new airports to insert, all already exist" },
        { status: 200 }
      );
    }

    // ✅ Step 4: Insert only the new unique airports
    await Airport.insertMany(newAirports);

    return NextResponse.json(
      {
        message: "Airports inserted successfully",
        inserted: newAirports.length,
        ignored: existingIATACodes.size
      },
      { status: 201 }
    );

  } catch (error) {
    const { status, body } = handleError(error);
    return NextResponse.json(body, { status });
  }
}