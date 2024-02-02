import React from "react";
import { ReactComponent as Logo } from "assets/images/img_logo.svg"; // Import the default export directly

const Header = () => {
  return (
    <div style={{ maxWidth: 1440, margin: "0 auto", padding:20 }}>
      <Logo style={{width:150, height:50}}/>
    </div>
  );
};

export default Header;
