import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import AzureADProvider from "next-auth/providers/azure-ad";
import AppleProvider from "next-auth/providers/apple";
import CredentialsProvider from "next-auth/providers/credentials";
import Endpoints from "@/services/Endpoints";
import { ClientServer } from "@/services/Server";

export const authOptions: NextAuthOptions = {
     providers: [
          GoogleProvider({
               clientId: process.env.GOOGLE_CLIENT_ID ?? "",
               clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
          }),
          FacebookProvider({
               clientId: process.env.FACEBOOK_CLIENT_ID ?? "",
               clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? "",
          }),
          AzureADProvider({
               clientId: process.env.MICROSOFT_CLIENT_ID ?? "",
               clientSecret: process.env.MICROSOFT_CLIENT_SECRET ?? "",
               tenantId: process.env.MICROSOFT_TENANT_ID,
          }),
          AppleProvider({
               clientId: process.env.APPLE_CLIENT_ID ?? "",
               clientSecret: process.env.APPLE_CLIENT_SECRET ?? "",
          }),
          CredentialsProvider({
               name: "credentials",
               credentials: {
                    token: { label: "Token", type: "text" },
               },
               async authorize(credentials) {
                    if (credentials?.token) {
                         try {
                         const user = await ClientServer.get(`${Endpoints.auth.getUser}?token=${credentials.token}`);
                         if (user) return user;
                         } catch (error) {
                         console.error("Error fetching user data:", error);
                         }
                    }
                    return null;
               },
          }),
     ],
     // session: {
     //      strategy: "jwt",
     // },
     secret: process.env.NEXTAUTH_SECRET,
     pages: {
          signIn: '/auth/signin',
          // error: '/auth/error',
          // signOut: '/auth/signout'
     },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };


