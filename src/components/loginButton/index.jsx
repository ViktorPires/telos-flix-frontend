import React from "react";
import PrimaryGradientButton from "../primaryGrandientButton";
import { PersonOutline } from "@mui/icons-material";

export default function LoginButton({ onClick, showIcon = true }) {
  const icon = showIcon ? <PersonOutline /> : null;
  return (
    <PrimaryGradientButton
      onClick={onClick}
      text="Login"
      icon={icon}
    />
  );
}
