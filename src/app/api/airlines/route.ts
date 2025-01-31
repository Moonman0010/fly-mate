import { NextResponse } from "next/server";
import { connectToDatabase } from "@/shared/mongo";
import Airline from "@/models/airline";
import { handleError } from "@/shared/error";

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    // Extract query parameters
    const { searchParams } = new URL(req.url);
    const searchQuery = searchParams.get("q") || "";
    const page = parseInt(searchParams.get("page") || "1", 10); // Default page = 1
    const limit = parseInt(searchParams.get("limit") || "10", 10); // Default limit = 10
    const skip = (page - 1) * limit; // Calculate how many documents to skip

    // Build search filter
    let filter = {};
    if (searchQuery) {
      filter = {
        $or: [
          { name: { $regex: searchQuery, $options: "i" } }, // Case-insensitive search by name
          { iata_code: { $regex: `^${searchQuery}$`, $options: "i" } } // Exact match for IATA code
        ]
      };
    }

    // ✅ Prioritize "TATA" airline if search query contains "TATA"
    if (searchQuery.toLowerCase().includes("tata")) {
      filter = {
        $or: [
          { name: { $regex: "TATA", $options: "i" } },
          { iata_code: { $regex: "TATA", $options: "i" } }
        ]
      };
    }

    // Fetch airlines with pagination
    const airlines = await Airline.find(filter).skip(skip).limit(limit);
    const total = await Airline.countDocuments(filter); // Total matching documents

    return NextResponse.json(
      { airlines, total, currentPage: page, totalPages: Math.ceil(total / limit) },
      { status: 200 }
    );
  } catch (error) {
    const { status, body } = handleError(error);
    return NextResponse.json(body, { status });
  }
}