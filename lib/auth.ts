// lib/auth.ts
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid email profile https://www.googleapis.com/auth/calendar",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // When user signs in, store Google's access_token
      if (account?.access_token) {
        token.access_token = account.access_token;  // ⭐ corrected
      }
      return token;
    },
    async session({ session, token }) {
      // Expose access_token to the client + API routes
      session.access_token = token.access_token as string | undefined; // ⭐ corrected
      return session;
    },
  },
};

