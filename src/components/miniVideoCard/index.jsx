import React from "react";
import "./index.css";
function MiniVideoCard({ image, title }) {
  return (
    <div className="miniVideoCard">
      {image}
      {title}
    </div>
  )
}

export default MiniVideoCard;
