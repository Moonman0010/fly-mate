"use server";

import { NextResponse } from "next/server";
import { connectToDatabase } from "@/server/shared/mongo";
import User from "@/server/models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError, handleError } from "@/server/shared/error";

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const { email, password } = await req.json();

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 400 });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 400 });
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: "7d" });

    // Set HTTP-only cookie using Response headers
    const response = NextResponse.json({ message: "Login successful" }, { status: 200 });
    response.headers.set(
      "Set-Cookie",
      `token=${token}; HttpOnly; Path=/; Max-Age=604800; Secure;`
    );

    return response;
  } catch (error) {
      const { status, body } = handleError(error);
      return NextResponse.json(body, { status });
  }
}