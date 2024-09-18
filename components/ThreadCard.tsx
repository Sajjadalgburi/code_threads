import React from "react";
import Image from "next/image";

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
        <div className="flex gap-4">
          {/* users name will be a link */}
          <h4>username</h4>
          <p>20h</p>
        </div>

        {/* card body */}
        <div className="my-2">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
          </p>
        </div>

        {/* card stats */}
        <div className="flex gap-4">
          <p>likes 10</p>
          <p>comments 10</p>
        </div>
      </div>
    </div>
  );
};

export default ThreadCard;
