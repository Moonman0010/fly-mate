import { NextResponse } from "next/server";
import { connectToDatabase } from "@/shared/mongo";
import Airline from "@/models/airport";
import { handleError } from "@/shared/error";

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    // Extract query parameters
    const { searchParams } = new URL(req.url);
    const searchQuery = searchParams.get("q") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    let filter = {};
    if (searchQuery) {
      // ✅ Generic Regex-Based Search (Matches any part of name or IATA code)
      filter = {
        $or: [
          { name: { $regex: searchQuery, $options: "i" } },  // Case-insensitive match in name
          { iata_code: { $regex: searchQuery, $options: "i" } } // Case-insensitive IATA match
        ]
      };
    }

    // Fetch airlines with pagination
    const airlines = await Airline.find(filter).skip(skip).limit(limit);
    const total = await Airline.countDocuments(filter);

    return NextResponse.json(
      { airlines, total, currentPage: page, totalPages: Math.ceil(total / limit) },
      { status: 200 }
    );
  } catch (error) {
    const { status, body } = handleError(error);
    return NextResponse.json(body, { status });
  }
}