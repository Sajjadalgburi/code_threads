"use client";

import AsideBar from "@/components/SideBar/AsideBar";
import Feed from "@/components/Feed";
import Header from "@/components/Header";
import React from "react";
import { useSession } from "next-auth/react";
import { AnimatedModal } from "@/components/Modal";

const Page = () => {
  const session = useSession();
  console.log(session);

  return (
    <main className="flex h-screen">
      {/* Sidebar for larger screens */}
      <AsideBar />

      {/* Main container centered with max-width */}
      <div className="container">
        {/* For You Section */}
        <section className="flex-column">
          <Header title="For You" />
          <Feed>awad</Feed>
        </section>

        <AnimatedModal />

        {session?.data?.user ? (
          // User Profile Section
          <section className="flex-column">
            <Header title="Thread" />
            <Feed>hdadwa</Feed>
          </section>
        ) : (
          /**
           * todo: find a skeleton loader for this section but still
           * todo: display the message "Please log in to view your profile."
           */
          <section className="flex-column">
            <Header title="Thread" />
            <div className="bg-[#181818] border p-8 rounded-3xl h-full overflow-auto">
              <div className="flex items-center justify-center h-full">
                <p className="text-lg font-bold text-gray-500">
                  Please log in to view your profile.
                </p>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default Page;
