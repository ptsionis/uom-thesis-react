import React, { useContext } from "react";
import { AppContext } from "../../App";

import "./ChallengeCancelButton.css";

const ChallengeCancelButton = ({ friendId = "" }) => {
  const { socket } = useContext(AppContext);
  const cancelChallenge = () => {
    if (friendId) {
      socket.emit("challenge_cancel", friendId);
    } else {
      socket.emit("open_challenge_cancel");
    }
  };

  return (
    <button
      className=" challenge-button challenge-button-cancel"
      onClick={cancelChallenge}
    >
      Cancel
    </button>
  );
};

export default ChallengeCancelButton;
