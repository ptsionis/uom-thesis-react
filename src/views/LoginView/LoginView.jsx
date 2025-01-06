import React from "react";
import LoginButton from "../../components/LoginButton/LoginButton";

import "./LoginView.css";

const LoginView = () => {
  return (
    <main className="login-main">
      <h1>ThesisReact</h1>
      <LoginButton />
    </main>
  );
};

export default LoginView;
