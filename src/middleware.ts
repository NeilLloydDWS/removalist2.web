import { NextResponse, type NextRequest } from "next/server";
import { countryCodeToRegion } from "@/lib/localization";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // ---- Region detection ----
  const existingRegion = request.cookies.get("vanman_region")?.value;
  if (!existingRegion) {
    // x-vercel-ip-country is set by Vercel Edge Network
    const countryCode =
      request.headers.get("x-vercel-ip-country") ?? "";
    const region = countryCodeToRegion(countryCode);

    response.cookies.set("vanman_region", region, {
      path: "/",
      maxAge: 365 * 24 * 60 * 60,
      sameSite: "lax",
      httpOnly: false,
    });
  }

  // ---- A/B testing: Googlebot always sees control ----
  const ua = request.headers.get("user-agent") ?? "";
  if (/Googlebot/i.test(ua)) {
    response.cookies.set("vanman_ab", JSON.stringify({}), {
      path: "/",
      maxAge: 60 * 60,
      sameSite: "lax",
      httpOnly: false,
    });
  }

  return response;
}

export const config = {
  matcher: [
    // Run on all pages except static files and API routes
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
