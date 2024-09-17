import { connectToDatabase } from "@/lib/database/mongoose";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Thread from "@/lib/models/thread.model";

/**
 * Route to create a new thread.
 * Need to pass user data such as first finding their id and using it to create a new thread.
 */
export const POST = async () => {
  try {
    await connectToDatabase();
    // Pass req and res to getServerSession

    return new Response("New thread created", { status: 200 });
  } catch (error) {
    console.error(error);
    new Response("Could not create a new thread", { status: 500 });
  }
};
