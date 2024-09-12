import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "./ui/button";

interface NavItemsProps {
  children: React.ReactNode;
  className?: string;
}

const NavItemButton = ({ children, className }: NavItemsProps) => {
  return (
    <Button
      className={cn(
        "hover:bg-slate-300/10 transition duration-300 px-5 py-3 rounded-2xl",
        className
      )}
    >
      {children}
    </Button>
  );
};

export default NavItemButton;
