// src/middleware.ts (Ensure the filename is middleware.ts, not proxy.ts)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const locales = ["en", "es"];

  const pathnameIsMissingLocale = locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  if (pathnameIsMissingLocale) {
    // If the user is at the root '/', pathname is '/'. 
    // We want to redirect to '/en', NOT '/en/'
    const targetPath = pathname === '/' ? '' : pathname;
    
    // Using 301 (Permanent) is better for SEO once you're sure it works, 
    // but 307 (Temporary) is safer during testing.
    return NextResponse.redirect(
      new URL(`/en${targetPath}`, request.url),
      307 
    );
  }
}

export const config = {
  matcher: [
    // Optimized matcher to exclude internal Next.js files and static assets
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|sw.js).*)'
  ],
};