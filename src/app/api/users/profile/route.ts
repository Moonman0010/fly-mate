import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/user";
import { connectToDatabase } from "@/shared/mongo";
import { AppError, handleError } from "@/shared/error";

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const token = req.headers.get("cookie")?.split("token=")[1]?.split(";")[0];
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Verify token
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await User.findById(decoded.userId).select("-password");

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
      const { status, body } = handleError(error);
      return NextResponse.json(body, { status });
  }
}