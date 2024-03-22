import React from "react";
import "./index.css";

function ContentLoading({
  text = "Loading...",
  setSpinner = true,
}) {
  return (
    <div className="content-loading-container">
      {setSpinner && <div className="content-loading-spinner"></div>}
      <h1>{text}</h1>
    </div>
  );
}

export default ContentLoading;
