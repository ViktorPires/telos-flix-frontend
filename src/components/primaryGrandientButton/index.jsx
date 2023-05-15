import React from "react";
import "./index.css";

function PrimaryGradientButton({ text, icon, img, onClick }) {
  return (
    <button onClick={onClick} className="primaryGrandientButton">
      {icon}
      {text}
      {img}
    </button>
  );
}

export default PrimaryGradientButton;
