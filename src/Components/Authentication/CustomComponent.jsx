import React from "react";

const CustomComponent = ({ onClick, onLogoutClick }) => {
  return (
    <div>
      <button onClick={onLogoutClick}>Logout</button>
    </div>
  );
};

export default CustomComponent;
