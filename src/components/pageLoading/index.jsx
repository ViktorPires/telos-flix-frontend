import React from "react";
import "./index.css";

function PageLoading({
  text = "TélosFLIX",
  setSpinner,
}) {
  return (
    <div className="loading-container">
      {setSpinner && <div className="loading-spinner"></div>}
      <h1>{text}</h1>
    </div>
  );
}

export default PageLoading;
