/**
 * @api /thread/one/:id single thread by id
 *
 */
import { connectToDatabase } from "@/lib/database/mongoose";
import Thread from "@/lib/models/thread.model";
import { NextRequest } from "next/server";

export const POST = async (
  req: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  }
) => {
  try {
    await connectToDatabase();
    const { isLiked, userId } = await req.json();

    // if the user liked the post then add the user id to the liked array
    if (isLiked) {
      // Use $addToSet to ensure no duplicate likes
      await Thread.findOneAndUpdate(
        { _id: params.id },
        { $addToSet: { likes: userId } }
      );
    } else {
      await Thread.findOneAndUpdate(
        { _id: params.id },
        { $pull: { likes: userId } }
      );
    }

    return new Response("Success", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to like thread", { status: 500 });
  }
};
