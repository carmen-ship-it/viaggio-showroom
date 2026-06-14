import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { resolveDemoRedirect } from "@/lib/config/demo-routes";

export function middleware(request: NextRequest) {
  const redirect = resolveDemoRedirect(request.nextUrl.pathname);
  if (redirect) {
    return NextResponse.redirect(new URL(redirect, request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|assets).*)"],
};
