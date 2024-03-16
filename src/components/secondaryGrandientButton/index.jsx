import React from "react";

import "./index.css";
function SecondaryGradientButton({ icon, text, onClick, alwaysActive}) {
  const buttonActive = alwaysActive ? "always-active" : "";
  return (
    <button
      data-testid="create-account-button"
      onClick={onClick}
      className={`secondaryGrandientButton ${buttonActive}`}
    >
      {icon}
      {text}
    </button>
  );
}

export default SecondaryGradientButton;
