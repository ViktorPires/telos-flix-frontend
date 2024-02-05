import React from "react";

import "./index.css";
function SecondaryGradientButton({ icon, text, onClick }) {
  return (
    <button
      data-testid="create-account-button"
      onClick={onClick}
      className="secondaryGrandientButton"
    >
      {icon}
      {text}
    </button>
  );
}

export default SecondaryGradientButton;
