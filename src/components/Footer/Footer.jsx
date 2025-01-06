import React from "react";

import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <span className="footer-text">
        Made by{" "}
        <a className="footer-link" href="https://ptsionis.gr" target="_blank">
          ptsionis
        </a>{" "}
        &copy; {new Date().getFullYear()}
      </span>
    </footer>
  );
};

export default Footer;
