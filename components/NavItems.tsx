import { cn } from "@/lib/utils";
import React from "react";

interface NavItemsProps {
  children: React.ReactNode;
  className?: string;
}

const NavItemButton = ({ children, className }: NavItemsProps) => {
  return (
    <button
      className={cn(
        "hover:bg-slate-300/10 transition duration-300 px-5 py-3 rounded-2xl",
        className
      )}
    >
      {children}
    </button>
  );
};

export default NavItemButton;
