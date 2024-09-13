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
              .trim() as string, // remove spaces and convert username to lowercase            image: profile?.image,
          });
        }

        // returning true if the user is signed in successfully
        return true;
      } catch (error) {
        console.error("Error signing in", error);
        return false;
      }
    },

    // The `session` object is the session that will be returned to the client
    session({ session, token, user }) {
      return session; // The return type will match the one returned in `useSession()`
    },
  },
});

// exporting the handler for the api route as both GET and POST
export { handler as GET, handler as POST };
