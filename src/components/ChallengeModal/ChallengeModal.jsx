import React, { useContext } from "react";

import { AppContext } from "../../App";
import { getFirstName } from "../../utils/userUtils";

import "./ChallengeModal.css";
import ChallengeAcceptButton from "../ChallengeAcceptButton/ChallengeAcceptButton";
import ChallengeDeclineButton from "../ChallengeDeclineButton/ChallengeDeclineButton";

const ChallengeModal = ({ challenger }) => {
  const { user } = useContext(AppContext);

  return (
    <div className="challenge-modal-wrapper popup-wrapper">
      <div className="challenge-modal">
        <span>{getFirstName(challenger.username)} challenged you!</span>
        <div className="challenge-modal-vs-wrapper">
          <img
            className="challenge-modal-profile-pic"
            src={
              user.profilePicUrl ? user.profilePicUrl : "/images/noPicture.webp"
            }
            alt="Pic"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/images/noPicture.webp";
            }}
          />
          <span className="challenge-modal-vs">vs</span>
          <img
            className="challenge-modal-profile-pic"
            src={
              challenger.profilePicUrl
                ? challenger.profilePicUrl
                : "/images/noPicture.webp"
            }
            alt="Pic"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/images/noPicture.webp";
            }}
          />
        </div>
        <div className="challenge-modal-respond-wrapper">
          <ChallengeAcceptButton friendId={challenger.id} />
          <ChallengeDeclineButton friendId={challenger.id} />
        </div>
      </div>
    </div>
  );
};

export default ChallengeModal;
