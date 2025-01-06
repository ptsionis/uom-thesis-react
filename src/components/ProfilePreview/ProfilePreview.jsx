import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import ProgressBar from "../ProgressBar/ProgressBar";
import AllCategoriesWinratesBars from "../AllCategoriesWinrateBars/AllCategoriesWinratesBars";
import {
  getFirstName,
  getGoalScore,
  getJoinedDate,
  getRank,
  getWinrate,
} from "../../utils/userUtils";
import { capitalizeFirstLetter } from "../../utils/otherUtils";

import "./ProfilePreview.css";

const ProfilePreview = ({ user, toggleShowProfile }) => {
  return (
    <div className="popup-wrapper profile-preview-wrapper">
      <div className="profile-preview">
        <AiOutlineClose
          className="pending-questions-close"
          size={"30px"}
          onClick={toggleShowProfile}
        />
        <div className="profile-preview-outer">
          <div className="profile-preview-user">
            <img
              className="profile-preview-avatar-img"
              src={
                user.profilePicUrl
                  ? user.profilePicUrl
                  : "/images/noPicture.webp"
              }
              alt="Pic"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/images/noPicture.webp";
              }}
            />
            <h3 className="profile-preview-name">
              {getFirstName(user.username)} (
              <span>{getWinrate(user.gamesWon, user.gamesPlayed) + "%"}</span>)
            </h3>
            <span className="profile-preview-joined">
              Member since {getJoinedDate(user.createdAt)}
            </span>
            <span className="profile-preview-rank">
              {capitalizeFirstLetter(getRank(user.score))}
            </span>
          </div>
          <ProgressBar
            currentValue={user.score}
            goalValue={getGoalScore(user.score)}
          />
          <AllCategoriesWinratesBars user={user} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePreview;
