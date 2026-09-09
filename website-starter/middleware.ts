// Production guard for the demo routes. /bold, /calm and /pick are design
// templates for a FICTIONAL business - browsable on the dev server, but they
// must never be reachable on a live site: a Google reviewer finding a fake
// plumbing company on the domain reads as a fake business. Never remove this.
//
// (A notFound() in the routes' layout.tsx does not 404 statically generated
// child pages in Next 15, which is why the guard lives here instead.)

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  if (process.env.NODE_ENV !== "production") return NextResponse.next();
  // Rewrite to a route that does not exist so Next serves its real 404 page.
  return NextResponse.rewrite(new URL("/__demo-route-blocked", req.url));
}

export const config = {
  matcher: ["/bold/:path*", "/calm/:path*", "/pick"],
};
