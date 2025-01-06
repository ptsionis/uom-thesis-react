import React, { useContext } from "react";
import { MdLogout } from "react-icons/md";
import { logout } from "../../services/authServices";
import { AppContext } from "../../App";

import "./LogoutButton.css";

const LogoutButton = () => {
  const { socket } = useContext(AppContext);
  const userLogout = () => {
    socket.disconnect();
    logout();
  };
  return (
    <button className="main-menu-button logout-btn" onClick={userLogout}>
      <MdLogout size={"24px"} />
      <span className="logout-btn-text">Logout</span>
    </button>
  );
};

export default LogoutButton;
