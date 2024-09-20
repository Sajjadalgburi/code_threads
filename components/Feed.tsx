"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { IThread, UserInterface } from "@/interfaces";
import ThreadCard from "./ThreadCard_Things/ThreadCard";

interface FeedProps {
  action: "main_feed" | "profile_feed";
}

const Feed: React.FC<FeedProps> = ({ action }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [threads, setThreads] = useState<IThread[]>([]);
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch threads based on action and userId
        let threadUrl = "/api/thread";
        if (action === "profile_feed" && userId) {
          threadUrl = `/api/users/${userId}/threads`;
        }

        // Fetch threads
        const threadRes = await fetch(threadUrl);
        if (!threadRes.ok) {
          throw new Error("Failed to fetch threads");
        }
        const threadData = await threadRes.json();
        setThreads(threadData);

        // Fetch users
        const userRes = await fetch("/api/users");
        if (!userRes.ok) {
          throw new Error("Failed to fetch users");
        }
        const userData = await userRes.json();
        setUsers(userData);
      } catch (error) {
        console.error(error);
        setError("Failed to load data");
      }
    };

    if (action === "main_feed" || (action === "profile_feed" && userId)) {
      fetchData();
    }
  }, [action, userId]);

  return (
    <div className="dark:bg-[#181818] p-2 border rounded-3xl h-full space-y-2 overflow-auto">
      {error && <p className="text-red-500">{error}</p>}

      {threads.length > 0 ? (
        threads.map((t) => (
          <ThreadCard
            key={t._id as string}
            currentUser={userId as string}
            users={users}
            action={action}
            threadData={t}
          />
        ))
      ) : (
        <p>No threads available.</p>
      )}
    </div>
  );
};

export default Feed;
