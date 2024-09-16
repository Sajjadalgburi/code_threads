import React from "react";

const ThreadForm = () => {
  return (
    <div>
      {" "}
      <input
        minLength={3}
        maxLength={512}
        className="bg-red w-full text-sm min-h-[10px] text-white focus:outline-none resize-none rounded-md p-2 overflow-hidden"
        placeholder="Start a thread..."
      />
    </div>
  );
};

export default ThreadForm;
