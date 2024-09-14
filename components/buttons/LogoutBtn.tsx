import { signOut } from "next-auth/react";
import React from "react";
import { Button } from "../ui/button";

const LogoutBtn = () => {
  return (
    <Button className="text-sm" onClick={() => signOut()}>
      Logout
    </Button>
  );
};

export default LogoutBtn;
