/**
 *
 * This will deifne the replies schema for the users that replied to
 * a respective thread which will reference the user and the thread
 *
 */

import { Schema, model, models } from "mongoose";
import { IReply } from "@/interfaces";

const replySchema = new Schema<IReply>(
  {
    // ! the text of the reply or you can say content of the reply
    text: {
      type: String,
      required: [true, "Text content for reply is required"],
      minlength: 1, // Add validation to ensure replies have meaningful content
    },
    // ! the user who created the reply.
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true, // Ensure every reply is tied to a user
    },
    // ! the thread that the reply belongs to
    thread: {
      type: Schema.Types.ObjectId,
      ref: "Thread",
      required: true, // Ensure every reply is tied to a thread
    },
  },
  {
    // timestamps of when the reply was created and updated
    timestamps: true,
  }
);

// Add indexes for better performance when querying by user or thread
replySchema.index({ user: 1 });
replySchema.index({ thread: 1 });

const Reply = models.Reply || model<IReply>("Reply", replySchema);

export default Reply;
