"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { IThread } from "@/interfaces";
import ThreadCard from "./ThreadCard_Things/ThreadCard";

interface FeedProps {
  action: "main_feed" | "profile_feed";
}

const Feed: React.FC<FeedProps> = ({ action }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [threads, setThreads] = useState<IThread[]>([]); // Changed to array
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        let url = "/api/thread";

        if (action === "profile_feed" && userId) {
          url = `/api/thread?userId=${userId}`;
        }

        const res = await fetch(url);

        if (!res.ok) {
          throw new Error("Failed to fetch threads");
        }

        const data = await res.json();
        setThreads(data); // Set array of threads
      } catch (error) {
        console.error(error);
        setError("Failed to load threads");
      }
    };

    if (action === "main_feed" || (action === "profile_feed" && userId)) {
      fetchThreads(); // Fetch for both feeds with conditions
    }
  }, [action, userId]); // Depend on action and userId

  return (
    <div className="bg-[#181818] border p-8 rounded-3xl h-full overflow-auto">
      {error && <p className="text-red-500">{error}</p>}

      {threads.length > 0 ? (
        threads.map((t) => <ThreadCard key={t._id as string} threadData={t} />)
      ) : (
        <p>No threads available.</p>
      )}
    </div>
  );
};

export default Feed;
