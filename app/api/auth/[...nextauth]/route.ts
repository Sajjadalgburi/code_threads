/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import User from "@/lib/models/user.model";
import { Profile, Account } from "next-auth";
import { connectToDatabase } from "@/lib/database/mongoose";

export const handler = NextAuth({
  // passing the spread operator to pass all the options from the authOptions
  ...authOptions,

  callbacks: {
    signIn: async ({
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

        // returning true if the user is signed in successfully
        return true;
      } catch (error) {
        console.error("Error signing in", error);
        return false;
      }
    },

    // The `jwt` callback is called with the JSON Web Token/JWT (and the user) when a JWT is created (during sign in)
    async jwt({ token, user, profile }) {
      await connectToDatabase();

      // When user signs in for the first time, user object will be available
      if (profile) {
        const dbUser = await User.findOne({ email: profile.email });
        token.id = dbUser?._id.toString(); // Pass MongoDB _id to the JWT token
      }

      return token;
    },

    // The `session` object is the session that will be returned to the client
    async session({ session, token }) {
      session.user.id = token.id as string; // Assign the MongoDB _id to the session
      session.user.username = token.username as string;
      return session; // The return type will match the one returned in `useSession()`
    },
  },
});

// exporting the handler for the api route as both GET and POST
export { handler as GET, handler as POST };
