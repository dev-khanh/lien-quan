import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/pt-admin") && pathname !== "/pt-admin/login") {
    const token = request.cookies.get("admin_token")?.value;
    if (!token) return NextResponse.redirect(new URL("/pt-admin/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/pt-admin/:path*"]
};
