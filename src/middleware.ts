// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const locales = ["en", "es", "zh"];

  // Check if the current URL path is missing all supported language codes
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  if (pathnameIsMissingLocale) {
    // Standardize path ending to guarantee a trailing slash because next.config has trailingSlash: true
    let targetPath = pathname;
    if (!targetPath.endsWith("/")) {
      targetPath = `${targetPath}/`;
    }

    // Set the target path inside request metadata internally to the [lang] folder structure
    request.nextUrl.pathname = `/en${targetPath}`;

    // Use rewrite instead of redirect so the server responds with a 200 OK code
    return NextResponse.rewrite(request.nextUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|sw.js).*)'
  ],
};
