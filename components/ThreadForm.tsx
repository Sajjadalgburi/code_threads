import React from "react";
import { useState } from "react";

const ThreadForm = () => {
  const [thread, setThread] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [code, setCode] = useState<any>(null);

  return (
    <div className="flex flex-col gap-4">
      {" "}
      <input
        minLength={3}
        maxLength={100}
        className="bg-red w-full text-sm min-h-[10px] text-white focus:outline-none resize-none rounded-md p-2 overflow-hidden"
        placeholder="Start a thread..."
        value={thread}
        onChange={(e) => setThread(e.target.value)}
      />
      <textarea
        minLength={3}
        maxLength={512}
        className="bg-red w-full text-sm min-h-[150px] text-white focus:outline-none resize-none rounded-md p-2 overflow-hidden"
        placeholder="Start a thread..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
    </div>
  );
};

export default ThreadForm;
