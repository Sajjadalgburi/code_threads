import { connectToDatabase } from "@/lib/database/mongoose";
import User from "@/lib/models/user.model";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Thread from "@/lib/models/thread.model";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

/**
 * Route to create a new thread.
 * Need to pass user data such as first finding their id and using it to create a new thread.
 */
export const POST = async () => {
  try {
    await connectToDatabase();

    const data = await getServerSession(authOptions);

    // finding a user by their email and retrieving their id
    const user = await User.findOne({ email: data?.user.email });
    if (!user) {
      new Response("User not found...", { status: 404 });
      return;
    }

    console.log("post success: ", user);

    return new Response("New thread created", { status: 200 });
  } catch (error) {
    console.error(error);
    new Response("Could not create a new thread", { status: 500 });
  }
};
