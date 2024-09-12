import React from "react";
import { User } from "lucide-react";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { Heart } from "lucide-react";
import { House } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const AsideBar = () => {
  return (
    <aside className="aside-bar">
      <div className="top">
        <Button className="hover:bg-slate-300/10 transition duration-300 px-5 py-3">
          <Link href="/">
            <Image
              src="/app-logo.png"
              alt="logo"
              width={50}
              height={50}
              className="filter invert"
            />
          </Link>
        </Button>
      </div>

      {/* 
    {/* TODO: Add a menu component to display some settings */}
      <div className="mid">
        <Button className="hover:bg-slate-300/10 transition duration-300 px-5 py-3">
          <House size={32} />
        </Button>{" "}
        <Button className="hover:bg-slate-300/10 transition duration-300 px-5 py-3">
          <Heart size={32} />
        </Button>{" "}
        <Button className="hover:bg-slate-300/10 transition duration-300 px-5 py-3">
          <User size={32} />
        </Button>{" "}
      </div>
      {/* 
        TODO: Add a menu component to display some settings
      */}
      <div className="bot">
        <Button className="hover:bg-slate-300/10 transition duration-300 px-5 py-3">
          <Menu size={32} />
        </Button>
      </div>
    </aside>
  );
};

export default AsideBar;
