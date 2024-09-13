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
          {/*  1. This will serve the main feed on the left hand side and the 
          users profile-if they are logged in- on the right hand side 2. The
          header reusable component will be used in order to display appropriate
           information on the page */}
          <div className="bg-blue-500 w-full max-w-3xl rounded-xl">
            <Header title="for you" />
            <Feed>awad</Feed>{" "}
          </div>{" "}
          {/* This is the users thread/profile which will be dynamically created if the user is currently signed in or not

              EX: {session && <Profile />} */}
          <div className="bg-blue-500 w-full max-w-3xl rounded-xl">
            <Header title="Thread" />
            <Feed>hdadwa</Feed>{" "}
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
