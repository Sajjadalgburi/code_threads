/**
 * Thread/post model
 *  ! users can create threads and reply to threads
 *      threads can be liked by users
 *      threads has views, likes, replies, and user who created it
 *      text is required
 *      timestamps are automatically added
 *      full curde operations
 */

import { Schema, model, models } from "mongoose";
import { IThread } from "@/interfaces";

const threadSchema = new Schema<IThread>(
  {
    // ! the text of the thread or you can say content of the thread
    text: {
      type: String,
      required: [true, "Text content for thread is required"],
      minlength: 3, // Add validation to ensure threads have meaningful content
    },
    views: {
      type: Number,
      default: 0,
    },

    // track users who liked the thread
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    replies: [
      {
        type: Schema.Types.ObjectId,
        ref: "Reply", // Assuming replies are threads or you can make a separate "Reply" model
      },
    ],

    // ! the user who created the thread.
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true, // Ensure every thread is tied to a user
    },
  },
  // timestamps of when the thread was created and updated
  { timestamps: true }
);

// Indexes for better query performance
threadSchema.index({ text: "text" });
threadSchema.index({ user: 1 });

const Thread = models.Thread || model<IThread>("Thread", threadSchema);

export default Thread;
