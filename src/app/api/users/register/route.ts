"use server"; // Ensures this runs only on the backend

import { connectToDatabase } from "@/server/shared/mongo";
import User from "@/server/models/user";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { sendVerificationEmail } from "@/server/shared/email";
import jwt from "jsonwebtoken";


export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const { name, email, phone, country, password, role } = await req.json();
    const validRole = role === "admin" ? "admin" : "user";

    const existingUser = await User.findOne({ $or: [{ email }, { phone: phone.number }] });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate verification token
    const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: "1h" });

    const newUser = await User.create({
      name,
      email,
      phone,
      country,
      password: hashedPassword,
      role: validRole,
      verified: false, // Mark user as unverified
      verificationToken,
    });

    // Send email verification
    // await sendVerificationEmail(email, verificationToken);

    return NextResponse.json({ message: "User registered! Please verify your email.", user: newUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}   