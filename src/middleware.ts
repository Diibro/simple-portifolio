import { NextRequest, NextResponse } from 'next/server';
import { authMiddleware } from './middlewares/authMiddleware';


export async function middleware(req: NextRequest) {
     const protectedRoutes = ['/dashboard', '/seller', '/dispatcher'];
     const authResponse = authMiddleware(req, protectedRoutes);
     if (authResponse) {
          return authResponse;
     }

    // Continue applying other middleware logic if necessary
    // e.g., rateLimiterMiddleware(req), loggingMiddleware(req), etc.

     return NextResponse.next();
}

export const config = {
     matcher: ['/dashboard/:path*', '/seller/:path*', '/dispatcher/:path*'],
};
