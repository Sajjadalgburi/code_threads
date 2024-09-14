"use client";

import React from "react";
import { Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import NavItemButton from "../NavItems";
import { ModeToggle } from "../ThemeSwitch";
import Nav_Aside from "./nav.aside";

const AsideBar = () => {
  return (
    <aside className="aside-bar">
      <div className="top">
        <NavItemButton>
          <Link href="/">
            <Image
              src="/app-logo.png"
              alt="logo"
              width={50}
              height={50}
              priority={true} // {false} | {true}
              className="filter invert"
            />
          </Link>
        </NavItemButton>{" "}
      </div>

      <Nav_Aside />

      <div className="bot">
        <ModeToggle />
        <NavItemButton>
          <Menu size={32} />
        </NavItemButton>
      </div>
    </aside>
  );
};

export default AsideBar;
