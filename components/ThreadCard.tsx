import React from "react";
import Image from "next/image";
import { MessageCircle, Heart } from "lucide-react";
import { useState } from "react";

const ThreadCard = () => {
  const [liked, setLiked] = useState(false);

  const handleLiked = async () => {
    setLiked((prev) => !prev);
  };

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
              username
            </h4>
            <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm">
              20h
            </p>
          </div>

          {/* Card Body */}
          <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
          </p>

          {/* Card Stats */}
          <div className="flex space-x-6">
            <button
              onClick={handleLiked}
              className={`flex items-center space-x-2 ${
                liked === false
                  ? "text-gray-600 dark:text-gray-400"
                  : "text-transparent"
              } text-transparent transition-colors duration-300`}
            >
              <Heart fill={`${liked && "red"}`} size={20} />
              <p className="text-gray-600 dark:text-gray-400 hover:text-black">
                22
              </p>
            </button>
            <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-black transition-colors duration-300">
              <MessageCircle size={20} />
              <p>22</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreadCard;
