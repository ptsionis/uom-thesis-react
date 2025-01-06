import React from "react";
// import { FaFacebook } from "react-icons/fa6";
import { login } from "../../services/authServices";

import "./LoginButton.css";

const LoginButton = () => {
  const goToLogin = () => {
    login();
  };

  return (
    <button className="login-button" onClick={goToLogin}>
      {/* <FaFacebook size={"28px"} /> */}
      <span className="login-button-text">Login</span>
    </button>
  );
};

export default LoginButton;
