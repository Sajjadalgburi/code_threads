import { Schema, Document } from "mongoose";

/**
 * IUser interface which defines the properties of a user document.
 */
export interface IUser extends Document {
  username: string;
  email: string;
  liked?: Schema.Types.ObjectId[];
  followers?: Schema.Types.ObjectId[];
  replies?: Schema.Types.ObjectId[];
  threads?: Schema.Types.ObjectId[];
}
