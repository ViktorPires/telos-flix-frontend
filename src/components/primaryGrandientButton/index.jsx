import React from "react";
import "./index.css";

function PrimaryGradientButton({ text, icon, img, onClick, disabled}) {
  const isDisabled = disabled ? "disabled" : "";
  return (
    <button onClick={onClick} className={`primaryGrandientButton ${isDisabled}`} disabled={disabled} >
      {icon}
      {text}
      {img}
    </button>
  );
}

export default PrimaryGradientButton;
