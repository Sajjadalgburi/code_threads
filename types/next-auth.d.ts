// eslint-disable-next-line @typescript-eslint/no-unused-vars
import nextAuth from "next-auth";
import { IUser } from "@/interfaces";

declare module "next-auth" {
  interface Session {
    user: IUser; // Use the IUser interface from the userSchema file
  }
}
