import React from "react";
import SecondaryGradientButton from "../secondaryGrandientButton";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

export default function CreateAccountButton({ onClick }) {
  return (
    <SecondaryGradientButton onClick={onClick} text="Create account" icon={<AddBoxOutlinedIcon />} />
  );
}
