
import React from "react";
import "./SideBarOptions.css";

function SidebarOption({ option = "test", Icon }) {
  return (
    <div className="sb-options">
      {Icon && <Icon className="sb-options__icon" />}
      {Icon ? <p>{option}</p>: <p>{option}</p>}
    </div>
  );
}

export default SidebarOption;