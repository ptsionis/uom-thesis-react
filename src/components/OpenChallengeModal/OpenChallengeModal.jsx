import React from "react";
import ChallengeCancelButton from "../ChallengeCancelButton/ChallengeCancelButton";

import "./OpenChallengeModal.css";
import Loader from "../Loader/Loader";

const OpenChallengeModal = () => {
  return (
    <div className="open-challenge-modal-wrapper popup-wrapper">
      <div className="open-challenge-modal">
        <span className="open-challenge-modal-text">
          Waiting for an opponent...
        </span>
        <Loader />
        <ChallengeCancelButton />
      </div>
    </div>
  );
};

export default OpenChallengeModal;
