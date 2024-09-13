import { Schema, model, models } from "mongoose";
import { IUser } from "@/interfaces";

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    liked: {
      type: [Schema.Types.ObjectId],
      ref: "Thread",
    },
    followers: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
    // todo: add a real default image
    image: {
      type: String,
      required: false,
      default: "/app-logo.png",
    },
    replies: [
      {
        type: Schema.Types.ObjectId,
        ref: "Reply", // Reference the Reply model, not Thread
      },
    ],
    threads: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thread",
      },
    ],
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// ! thank you gpt-4
// Explicitly creating indexes
userSchema.index({ username: 1 }, { unique: true });
userSchema.index({ email: 1 }, { unique: true });

const User = models.User || model<IUser>("User", userSchema);

export default User;
