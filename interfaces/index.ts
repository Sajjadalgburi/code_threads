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

// interface for the thread model/data
export interface IThread extends Document {
  text: string;
  views?: number;
  likes?: Schema.Types.ObjectId[]; // Array of user IDs
  replies?: Schema.Types.ObjectId[]; // Array of reply IDs or Thread references
  user: Schema.Types.ObjectId;
}
