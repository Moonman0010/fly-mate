// 📂 /app/api/flight/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/server/shared/mongo";
import { authenticate } from "@/server/middleware/auth";
import { AppError, handleError } from "@/server/shared/error";
import {
  createOrJoinFlight,
  getFlightDetails,
} from "@/app/controllers/flightController";

/**
 * POST /api/flight
 * Creates or joins a flight
 */
export async function POST(req: Request) {
  try {
    // 1. Authenticate user
    const user = authenticate(req);
    if (user instanceof NextResponse) {
      // If authenticate returns a NextResponse, it's likely an auth failure
      return user;
    }

    // 2. Extract userId from the authentication token/user object
    const userId = typeof user === "string" ? user : user.userId;

    // 3. Connect to database
    await connectToDatabase();

    // 4. Parse request body
    const { airline, flightNumber, departure, arrival, date, time } = await req.json();

    // 5. Call the controller function
    const result = await createOrJoinFlight({
      userId,
      airline,
      flightNumber,
      departure,
      arrival,
      date,
      time,
    });

    // 6. Construct HTTP response
    return NextResponse.json(
      { message: result.message, flight: result.flight },
      { status: result.status }
    );
  } catch (error) {
    // 7. Handle errors with a centralized error handler
    const { status, body } = handleError(error);
    return NextResponse.json(body, { status });
  }
}

/**
 * GET /api/flight?flightCode=...
 * Gets flight details by flightCode
 */
export async function GET(req: Request) {
  try {
    // 1. Connect to database
    await connectToDatabase();

    // 2. Extract query params
    const { searchParams } = new URL(req.url);
    const flightCode = searchParams.get("flightCode") ?? "";

    // 3. Call the controller function
    const result = await getFlightDetails(flightCode);

    // 4. If flight not found, return 404
    if (!result.flight) {
      return NextResponse.json({ error: result.message }, { status: result.status });
    }

    // 5. Return flight details if found
    return NextResponse.json({ flight: result.flight }, { status: result.status });
  } catch (error) {
    // 6. Handle errors
    const { status, body } = handleError(error);
    return NextResponse.json(body, { status });
  }
}
