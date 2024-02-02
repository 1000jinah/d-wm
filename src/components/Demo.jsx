import React from "react";

const Demo = ({ width, height, text, contents }) => {
  const containerStyle = {
    width: width,
    height: height,
    border: "1px solid #333", // Add some styling for demonstration
 
    backgroundColor: "#ddd",
  };

  return (
    <div style={containerStyle}>
      <span>{text}</span>
      <div>{contents}</div>
    </div>
  );
};

export default Demo;
