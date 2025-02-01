import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function authenticate(req: Request) {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized - No Token" }, { status: 401 });
    }

    // Get the actual token
    const token = authHeader.split(" ")[1];

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    
    // Return decoded user data
    return decoded;
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized - Invalid Token" }, { status: 401 });
  }
}