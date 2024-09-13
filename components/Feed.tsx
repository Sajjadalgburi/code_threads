import React from "react";

interface FeedProps {
  children: React.ReactNode;
}

const Feed: React.FC<FeedProps> = ({ children }) => {
  return <div className="">{children}</div>;
};

export default Feed;
