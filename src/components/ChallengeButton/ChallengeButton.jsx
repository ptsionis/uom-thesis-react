import React, { useContext } from "react";
import { AppContext } from "../../App";

import { Availabilities } from "../../models/enums/availabilityEnum";
import "./ChallengeButton.css";

const ChallengeButton = ({ friendId, availability }) => {
  const { socket } = useContext(AppContext);

  const getButtonStatus = () => {
    switch (availability) {
      case Availabilities.ONLINE:
        return true;
      default:
        return false;
    }
  };

  const getButtonText = () => {
    switch (availability) {
      case Availabilities.ONLINE:
        return "Play";
      case Availabilities.OFFLINE:
        return "Offline";
      case Availabilities.PENDING:
        return "On hold";
      case Availabilities.PLAYING:
        return "Playing";
    }
  };

  const challengeFriend = () => {
    socket.emit("challenge", friendId);
  };

  return (
    <button
      className={`challenge-button challenge-button${
        getButtonStatus() ? "-enabled" : "-disabled"
      } challenge-button-${availability}`}
      type="button"
      disabled={!getButtonStatus()}
      onClick={challengeFriend}
    >
      {getButtonText()}
    </button>
  );
};

export default ChallengeButton;
