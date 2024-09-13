import AsideBar from "@/components/AsideBar";
import Feed from "@/components/Feed";
import Header from "@/components/Header";
import React from "react";

const page = () => {
  return (
    <main className="flex">
      {/* Side bar for larger screens */}
      <AsideBar />
      <div className="container">
        <div className="wrapper">
          <div className="feed">
            <Header title="for you" />
            <Feed>awad</Feed>{" "}
          </div>

          {/*  */}
          <div className="feed">
            <Header title="Thread" />
            <Feed>hdadwa</Feed>{" "}
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
