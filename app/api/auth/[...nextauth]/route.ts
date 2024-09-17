/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import User from "@/lib/models/user.model";
import { Profile, Account } from "next-auth";
import { connectToDatabase } from "@/lib/database/mongoose";
import { getUserByEmail } from "@/lib/helper";

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
    jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = user?.id;
      }
      return token;
    },

    // The `session` callback is responsible for returning the session to the client
    async session({ session, token }) {
      await connectToDatabase();

      const dbUser = await getUserByEmail(session.user.email as string);

      if (token && dbUser) {
        session.user.id = dbUser._id.toString();
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.picture as string;
      }

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
});

// Exporting the handler for the API route as both GET and POST
export { handler as GET, handler as POST };
