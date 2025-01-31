import { NextResponse } from "next/server";

export function middleware(req: any) {
  const token = req.cookies.get("token")?.value;
  const protectedRoutes = ["/dashboard", "/profile", "/flights"];

  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route)) && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/flights/:path*"],
};