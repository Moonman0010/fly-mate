import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function authenticate(req: Request) {
  try {
    // Get the JWT token from cookies
    const token = req.headers.get("cookie")?.split("token=")[1]?.split(";")[0];

    if (!token) {
      return NextResponse.json({ error: "Unauthorized - No Token" }, { status: 401 });
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded; // Return the user data (userId, etc.)
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized - Invalid Token" }, { status: 401 });
  }
}