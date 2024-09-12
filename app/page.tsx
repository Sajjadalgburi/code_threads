import AsideBar from "@/components/AsideBar";
import React from "react";

const page = () => {
  return (
    <main className="flex">
      {/* Side bar for larger screens */}
      <AsideBar />
      <div className="container">
        <div className="wrapper">
          {" "}
          <h1>Code Threads</h1>
          <p>Share cool code snippets and interact with other developers!</p>
        </div>
      </div>
    </main>
  );
};

export default page;
