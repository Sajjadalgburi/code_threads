import React from "react";
import { Button } from "../ui/button";

interface AuthButtonsProps {
  isLogin: boolean;
  onClick: () => void;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({ isLogin, onClick }) => {
  return (
    <Button className="text-sm" onClick={onClick}>
      {isLogin ? "Sign Out" : "Sign In"}
    </Button>
  );
};

export default AuthButtons;
