import React, { useContext } from "react";
import { AppContext } from "../../App";

import "./ChallengeAcceptButton.css";

const ChallengeAcceptButton = ({ friendId }) => {
  const { socket } = useContext(AppContext);

  const acceptChallenge = () => {
    socket.emit("challenge_accept", friendId);
  };

  return (
    <button className="challenge-accept-button" onClick={acceptChallenge}>
      Ac
    </button>
  );
};

export default ChallengeAcceptButton;
