import React from "react";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { Heart } from "lucide-react";

const ThreadCard = () => {
  return (
    <div className="bg-slate-500 flex justify-start p-2">
      <div className="mr-2">
        {" "}
        <Image
          src="/app-logo.png"
          alt="user profile"
          width={50}
          height={50}
          className="rounded-full"
        />
      </div>

      {/* rest of the content */}
      <div>
        {/* card header */}
        <div className="flex gap-4 items-center">
          {/* users name will be a link */}
          <h4 className="text-md md:text-lg font-bold">username</h4>
          <p className=" text-gray-400 text-sm font-extralight">20h</p>
        </div>

        {/* card body */}
        <div className="my-2">
          <p className="font-extralight text-xs md:text-sm tracking-wide">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
          </p>
        </div>

        {/* card stats */}
        <div className="flex">
          <button className="hover:bg-slate-300/10 transition duration-300 px-3 py-2 rounded-3xl">
            {" "}
            <div className="flex justify-center items-center gap-1">
              <Heart size={20} />
              <p>22</p>
            </div>
          </button>
          <button className="hover:bg-slate-300/10 transition duration-300 px-3 py-2 rounded-3xl">
            {" "}
            <div className="flex justify-center items-center gap-1">
              <MessageCircle size={20} />
              <p>22</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThreadCard;
