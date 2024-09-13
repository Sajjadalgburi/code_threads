/**
 * Header that accepts props to dynamically represent each section of an app.
 * todo:
 *      Need to refresh the appropriate page on click of the title and not all pages.
 */

import React from "react";

const Header = ({ title }: { title: string }) => {
  return (
    <div className="flex justify-center items-center m-2 p-2">
      <h1 className="capitalize font-semibold text-xl">{title}</h1>
    </div>
  );
};

export default Header;
