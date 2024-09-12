"use client";

import React from "react";
import { Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import NavItemButton from "./NavItems";
import { usePathname } from "next/navigation";
import { navItems } from "@/constants";

const AsideBar = () => {
  const pathname = usePathname();

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
              className="filter invert"
            />
          </Link>
        </NavItemButton>{" "}
      </div>

      <nav className="mid">
        {" "}
        <ul className="sidebar-nav_elements">
          {navItems.map((item) => {
            const isActive: boolean = item.url === pathname;
            return (
              <li
                key={item.id}
                className={`${
                  isActive
                    ? "bg-purple-gradient text-white bg-slate-300/10 rounded-2xl"
                    : "text-gray-500"
                }`}
              >
                <NavItemButton>
                  <Link href={item.url}>
                    <span
                      dangerouslySetInnerHTML={{ __html: item.logoSvg }}
                      className={`${isActive && "brightness-200"}`}
                    />{" "}
                  </Link>
                </NavItemButton>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="bot">
        <NavItemButton>
          <Menu size={32} />
        </NavItemButton>
      </div>
    </aside>
  );
};

export default AsideBar;
