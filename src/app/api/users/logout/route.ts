import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json({ message: "Logged out successfully" }, { status: 200 });

  // Clear the authentication cookie
  response.headers.set("Set-Cookie", "token=; HttpOnly; Path=/; Max-Age=0; Secure;");

  return response;
}