import React, { useContext } from "react";

import { AppContext } from "../../App";

import "./QuickPlayButton.css";

const QuickPlayButton = () => {
  const { socket } = useContext(AppContext);

  const createOpenChallenge = () => {
    socket.emit("challenge_open");
  };

  return (
    <button
      className="main-menu-button quick-play"
      onClick={createOpenChallenge}
    >
      Quick Play
    </button>
  );
};

export default QuickPlayButton;
