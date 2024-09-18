import { connectToDatabase } from "@/lib/database/mongoose";
import Thread from "@/lib/models/thread.model";

export const GET = async () => {
  try {
    await connectToDatabase();

    const findAllThreads = await Thread.find({});

    if (!findAllThreads) {
      return new Response("No threads found", { status: 404 });
    }

    return new Response(JSON.stringify(findAllThreads), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    new Response("Could not get threads", { status: 500 });
  }
};
