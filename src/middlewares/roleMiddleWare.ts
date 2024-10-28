import fetchUserData from "@/util/authFunctions";
import { NextRequest, NextResponse } from "next/server";

export async function roleMiddleware(req:NextRequest) {
     const token = req.cookies.get('authToken')?.value;
     if(token) {
          const user = await fetchUserData(token);
          if(user) {
               const role = user.role || user.type;
               const pathname = req.nextUrl.pathname;
               let allowed:boolean = false;
               switch(pathname) {
                    case '/dashboard':
                         allowed = role === 'admin';
                         break;
                    case '/dispatcher':
                         allowed = role === 'dispatcher';
                         break;
                    case '/seller':
                         allowed = role === 'seller';
                         break;
                    default :
                         allowed = false
               }
               if(allowed) return NextResponse.next();
               else {
                    const loginUrl = new URL('/', req.url);
                    return NextResponse.redirect(loginUrl);
               };
          }else {
               const loginUrl = new URL('/auth/login', req.url);
               return NextResponse.redirect(loginUrl);
          }
     }
}