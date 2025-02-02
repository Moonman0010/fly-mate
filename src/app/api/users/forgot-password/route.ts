import { NextResponse } from "next/server";
import User from "@/server/models/user";
import { connectToDatabase } from "@/server/shared/mongo";
import { sendVerificationEmail } from "@/server/shared/email";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { email } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: "1h" });

    //await sendVerificationEmail(email, resetToken);

    return NextResponse.json({ message: "Password reset email sent." }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
