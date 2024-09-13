import React from "react";

interface FeedProps {
  children: React.ReactNode;
}

const Feed: React.FC<FeedProps> = ({ children }) => {
  return (
    <div className="bg-[#181818] border p-8 rounded-3xl h-full overflow-auto">
      {children}
    </div>
  );
};

export default Feed;
