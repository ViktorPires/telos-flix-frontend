import React from "react";

export default function AppBarActions({ actions, texts }) {
  if (!actions) {
    throw new Error('actions prop is required');
  }

  if (!Array.isArray(actions)) {
    throw new Error('actions prop must be an array');
  }

  if (actions.some((element) => !React.isValidElement(element))) {
    throw new Error('actions prop must contain only react elements');
  }

  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "30px" }}>
      {actions.map((element, index) => (
        <div key={index}>{element}</div>
      ))}
    </div>
  );
}
