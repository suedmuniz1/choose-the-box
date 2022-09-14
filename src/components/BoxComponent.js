import React from "react";

const BoxComponent = ({ box, handleBoxClick, disabled }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 100,
        height: 100,
        padding: 10,
        backgroundColor: "darkblue",
        borderRadius: 25,
        marginRight: 10,
        cursor: "pointer",
      }}
      onClick={(e) => (disabled ? e.preventDefault() : handleBoxClick(box))}
    >
      <span style={{ color: "white", textAlign: "center" }}>{box.name}</span>
    </div>
  );
};

export default BoxComponent;
