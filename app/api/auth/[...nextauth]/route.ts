/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import User from "@/lib/models/user.model";
import { Profile, Account } from "next-auth";
import { connectToDatabase } from "@/lib/database/mongoose";

export const handler = NextAuth({
  ...authOptions,

  callbacks: {
    signIn: async ({
      account,
      profile,
    }: {
      account: Account | null;
      profile?: Profile;
    }): Promise<boolean> => {
      try {
        await connectToDatabase();

        const userExists = await User.findOne({ email: profile?.email });

        if (!userExists) {
          await User.create({
            email: profile?.email,
            username: profile?.name
              ?.replace(" ", "")
              .toLowerCase()
              .trim() as string, // remove spaces and convert username to lowercase
            image: profile?.picture,
          });
        }

        // Returning true if the user is signed in successfully
        return true;
      } catch (error) {
        console.error("Error signing in", error);
        return false;
      }
    },

    // The `jwt` callback is responsible for generating the token
    async jwt({ token, user }) {
      await connectToDatabase();

      // If `user` is defined, use `user.email` to find the user in the database
      if (user) {
        const dbUser = await User.findOne({ email: user.email });

        if (dbUser) {
          token.id = dbUser._id.toString(); // Store the MongoDB _id in the token
          token.username = dbUser.username; // Optionally store username in token
        }
      }

      return token;
    },

    // The `session` callback is responsible for returning the session to the client
    async session({ session, token }) {
      session.user.id = token.id as string; // Use MongoDB _id from token
      session.user.username = token.username as string; // Optionally assign username

      return session;
    },
  },
});

// Exporting the handler for the API route as both GET and POST
export { handler as GET, handler as POST };
