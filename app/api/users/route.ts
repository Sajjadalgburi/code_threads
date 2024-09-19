/**
 * Route to fetch every single user in the database.
 */

import { connectToDatabase } from "@/lib/database/mongoose";
import { User } from "@/lib/models/user.model";

export const GET = async () => {
  try {
    await connectToDatabase();
    const findAllUsers = await User.find({});

    if (!findAllUsers) {
      return new Response("No users found", {
        status: 404,
      });
    }

    return new Response(JSON.stringify(findAllUsers), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    new Response("Could not get users", {
      status: 500,
    });
  }
};
