import React from "react";
import Image from "next/image";
import { MessageCircle, Heart } from "lucide-react";
import { useState } from "react";
import { IThread, UserInterface } from "@/interfaces";
import moment from "moment"; // for formatting the date
import StatButtons from "./StatButtons";

interface ThreadCardProps {
  threadData: IThread;
  action: "main_feed" | "profile_feed";
  users: UserInterface[];
  currentUser: string;
}

const ThreadCard: React.FC<ThreadCardProps> = ({
  threadData,
  users,
  action = "main_feed",
  currentUser,
}) => {
  const [comment, setComment] = useState<boolean>(false);

  const [likedCss, setLikedCss] = useState<boolean>(false);
  const [liked, setLiked] = useState<number>(threadData.likes?.length || 0);

  const handleLiked = async () => {
    setLikedCss((prev) => !prev); // will be used to change the color of the heart icon
    try {
      const isLiked = !likedCss;
      setLiked((prev) => (isLiked ? prev + 1 : prev - 1));

      const response = await fetch(`/api/thread/one/${threadData._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isLiked, userId: currentUser }),
      });

      if (!response.ok) {
        throw new Error("Failed to like thread");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleComment = async () => {
    setComment((prev) => !prev);
  };

  // Format createdAt to relative time (e.g., '20h ago')
  const formattedTime = moment(threadData.createdAt).fromNow();

  return (
    <div className="bg-gray-200 dark:bg-transparent rounded-lg p-4 md:p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-start space-x-4">
        <Image
          src={
            users.find(
              (u) => (u._id as string) === (threadData.user as unknown)
            )?.image || "/default-avatar.jpg"
          }
          alt="user profile"
          width={50}
          height={50}
          className="rounded-full"
        />

        <div className="flex-1">
          {/* Card Header */}
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-md md:text-lg font-bold text-black dark:text-white">
              {action === "profile_feed"
                ? "You"
                : users.find(
                    (u) => (u._id as string) === (threadData.user as unknown)
                  )?.username || "Unknown"}
            </h4>
            <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm">
              {formattedTime}
            </p>
          </div>

          {/* Card Body */}
          <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-4">
            {threadData.text}{" "}
          </p>

          {/* Card Stats */}
          <div className="flex space-x-6">
            {/* Likes */}
            <StatButtons
              handleClick={handleLiked}
              stat={liked}
              clicked={likedCss}
              fill="red"
              Logo={Heart}
            />

            {/* comments */}
            <StatButtons
              handleClick={handleComment}
              stat={threadData.replies?.length || 0}
              clicked={comment}
              fill="white"
              Logo={MessageCircle}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreadCard;
