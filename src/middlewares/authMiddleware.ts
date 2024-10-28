import { NextRequest, NextResponse } from 'next/server';

export function authMiddleware(req: NextRequest, protectedRoutes: string[]) {
     const token = req.cookies.get('authToken')?.value;

     if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
          if (!token) {
               const loginUrl = new URL('/auth/login', req.url);
               return NextResponse.redirect(loginUrl);
          }
     }

     return NextResponse.next();
}
