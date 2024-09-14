"use client";

import AsideBar from "@/components/SideBar/AsideBar";
import Feed from "@/components/Feed";
import Header from "@/components/Header";
import React from "react";

const Page = () => {
  return (
    <main className="flex h-screen">
      {/* Sidebar for larger screens */}
      <AsideBar />

      {/* Main container centered with max-width */}
      <div className="container">
        <div className="flex-column">
          <Header title="For You" />
          <Feed>awad</Feed>
        </div>
        <div className="flex-column">
          <Header title="Thread" />
          <Feed>hdadwa</Feed>
        </div>
      </div>
    </main>
  );
};

export default Page;
