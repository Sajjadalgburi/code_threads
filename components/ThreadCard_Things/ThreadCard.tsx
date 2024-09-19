import React from "react";
import Image from "next/image";
import { MessageCircle, Heart } from "lucide-react";
import { useState } from "react";
import { IThread } from "@/interfaces";
import moment from "moment"; // for formatting the date
import StatButtons from "./StatButtons";

interface ThreadCardProps {
  threadData: IThread;
  action: "main_feed" | "profile_feed";
}

const ThreadCard: React.FC<ThreadCardProps> = ({
  threadData,
  action = "main_feed",
}) => {
  const [liked, setLiked] = useState<boolean>(false);
  const [comment, setComment] = useState<boolean>(false);

  const handleLiked = async () => {
    setLiked((prev) => !prev);
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
          src="/app-logo.png"
          alt="user profile"
          width={50}
          height={50}
          className="rounded-full"
        />

        <div className="flex-1">
          {/* Card Header */}
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-md md:text-lg font-bold text-black dark:text-white">
              {action === "profile_feed" ? "You" : threadData.user}
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
              stat={threadData.likes?.length || 0}
              clicked={liked}
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