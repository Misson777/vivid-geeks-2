"use server";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // do not run middleware if not admin, or if login page
  if (pathname === "/login" || !pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Get token from HTTP-only cookie
  const token = request.cookies.get("auth_token")?.value;
  const loginUrl = new URL("/login", request.url);

  if (!token) {
    return NextResponse.redirect(loginUrl);
  }

  try {
    const [email, password] = atob(token).split(":");
    if (!email || !password) {
      return NextResponse.redirect(loginUrl);
    }

    if (
      email.toLowerCase() !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(loginUrl);
  }
}
