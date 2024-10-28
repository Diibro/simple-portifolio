import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import AzureADProvider from "next-auth/providers/azure-ad"; // Corrected
import AppleProvider from "next-auth/providers/apple";
import Endpoints from "@/services/Endpoints";
import { ClientServer } from "@/services/Server";
import CredentialsProvider from "next-auth/providers/credentials"; // Added import


export const authOptions = {
     providers: [
          GoogleProvider({
               clientId: process.env.GOOGLE_CLIENT_ID,
               clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
          FacebookProvider({
               clientId: process.env.FACEBOOK_CLIENT_ID,
               clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
          }),
          AzureADProvider({ // Corrected name
               clientId: process.env.MICROSOFT_CLIENT_ID,
               clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
               tenantId: process.env.MICROSOFT_TENANT_ID,
          }),
          AppleProvider({
               clientId: process.env.APPLE_CLIENT_ID,
               clientSecret: process.env.APPLE_CLIENT_SECRET,
          }),
          CredentialsProvider({
               name: "credentials",
               credentials: {
                    token: { label: "Token", type: "text" }, 
               },
               async authorize(credentials) {
                 // You receive the token from the customLogin function, now use it to fetch user data
               if (credentials?.token) {
                    try {
                         // Fetch the user details using the token from your server
                         const user = await ClientServer.get(`${Endpoints.auth.getUser}?token=${credentials.token}`);
                         
                         // If a user is found, return the user object, else return null
                         if (user) return user;
                    } catch (error) {
                         console.error("Error fetching user data:", error);
                    }
                    }
                    return null;
               },
          }),
     ],
     session: {
          strategy: "jwt",
     },
     // callbacks: {
     //      async jwt({ token, user }) {
     //      if (user) {
     //      token.id = user.id;
     //      token.accessToken = user.accessToken;
     //      }
     //      return token;
     //      },
     //      async session({ session, token }) {
     //      session.user.id = token.id;
     //      session.user.accessToken = token.accessToken;
     //      return session;
     //      },
     // },
     secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };


