import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const cookieLocale = req.cookies.get('NEXT_LOCALE')?.value || 'en';
  const supportedLocales = ['en', 'kin', 'fr'];

  // Determine the locale based on the cookie, fallback to default locale if not set
  const locale = supportedLocales.includes(cookieLocale) ? cookieLocale : 'en';

  // Set the locale for the current request
  req.nextUrl.locale = locale;
  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'], // Apply middleware to all paths
};