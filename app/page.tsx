import AsideBar from "@/components/AsideBar";
import Feed from "@/components/Feed";
import Header from "@/components/Header";
import React from "react";

const Page = () => {
  return (
    <main className="flex h-screen">
      {/* Sidebar for larger screens */}
      <AsideBar />

      {/* Main container centered with max-width */}
      <div className="flex-1 max-w-6xl mx-auto w-full grid grid-cols-2 gap-4 p-4 h-full">
        <div className="flex flex-col">
          <Header title="For You" />
          <Feed>awad</Feed>
        </div>
        <div className="flex flex-col">
          <Header title="Thread" />
          <Feed>hdadwa</Feed>
        </div>
      </div>
    </main>
  );
};

export default Page;
