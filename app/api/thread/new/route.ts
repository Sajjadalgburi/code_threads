import { connectToDatabase } from "@/lib/database/mongoose";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Thread from "@/lib/models/thread.model";
import { NextRequest } from "next/server";
import User from "@/lib/models/user.model";

/**
 * Route to create a new thread.
 * Need to pass user data such as first finding their id and using it to create a new thread.
 */

export const POST = async (req: NextRequest) => {
  try {
    await connectToDatabase();

    const { text, code } = await req.json();

    // grab the user id from the Authorization header
    const userId = req.headers.get("Authorization")?.slice(7) as string;
    if (!userId) {
      return new Response("User not found...", { status: 404 });
    }

    const newThread = await Thread.create({
      text,
      code,
      user: userId,
    });

    if (!newThread) {
      return new Response("Failed to create a new thread", { status: 500 });
    }

    // Update the user's threads array by adding the new thread's ID
    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { threads: newThread._id } },
      { new: true }
    );

    if (!user) {
      return new Response("Failed to update user with new thread", {
        status: 500,
      });
    }

    return new Response("New thread created", { status: 200 });
  } catch (error) {
    console.error(error);
    new Response("Could not create a new thread", { status: 500 });
  }
};
