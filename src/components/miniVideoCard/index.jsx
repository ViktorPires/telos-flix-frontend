import React from "react";
import "./index.css";
function MiniVideoCard({ image, title }) {
  return (
    <div data-testid="miniVideoCard" className="miniVideoCard">
      {image}
      {title}
    </div>
  )
}

export default MiniVideoCard;
