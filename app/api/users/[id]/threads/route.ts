import { connectToDatabase } from "@/lib/database/mongoose";
import { User } from "@/lib/models/user.model";
import Thread from "@/lib/models/thread.model";
import { NextRequest } from "next/server";

/**
 *
 * This API is for the profile feed of a user.
 * We will grab the user's id from the params and fetch all the threads created by the user.
 * Then we need to pass the thread ids from the user model to fetch the threads from the thread model.
 * Return the threads to the client.
 *
 */

export const GET = async (
  req: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  }
) => {
  try {
    await connectToDatabase();

    // Fetch user by ID and populate the threads
    const user = await User.findById(params.id).populate("threads");

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    // Check if the user has any threads
    if (user.threads.length === 0) {
      return new Response("No threads found for this user", { status: 200 });
    }

    // Retrieve the threads associated with the user
    const threads = await Thread.find({ _id: { $in: user.threads } });

    // Return the threads to the client as JSON
    return new Response(JSON.stringify(threads), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch user's threads", { status: 500 });
  }
};
