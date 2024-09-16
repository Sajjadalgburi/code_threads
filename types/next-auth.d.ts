/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    id?: string; // Include user ID in the JWT token
    idToken?: string;
    username?: string; // Optionally add username to JWT
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // The user ID will be included in the session object
      username: string; // Include username if necessary
      name?: string;
      email: string;
      liked?: Schema.Types.ObjectId[];
      image?: string;
      followers?: Schema.Types.ObjectId[];
      replies?: Schema.Types.ObjectId[];
      threads?: Schema.Types.ObjectId[];
      AccessToken: string;
    };
  }

  interface Profile {
    name?: string | null;
    email: string;
    username: string;
    image?: string | null;
    picture?: string | null;
  }
}
