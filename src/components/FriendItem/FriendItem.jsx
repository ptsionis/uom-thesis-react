import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../App";

import AvailabilityIcon from "../AvailabilityIcon/AvailabilityIcon";
import ChallengeButton from "../ChallengeButton/ChallengeButton";
import ChallengeCancelButton from "../ChallengeCancelButton/ChallengeCancelButton";
import ChallengeAcceptButton from "../ChallengeAcceptButton/ChallengeAcceptButton";
import ChallengeDeclineButton from "../ChallengeDeclineButton/ChallengeDeclineButton";
import ProfilePreview from "../ProfilePreview/ProfilePreview";
import { Availabilities } from "../../models/enums/availabilityEnum";

import "./FriendItem.css";
import { getFirstName } from "../../utils/userUtils";

const FriendItem = ({ friend }) => {
  const { socket, setGameRoom, setCurrentPage } = useContext(AppContext);
  const [showProfile, setShowProfile] = useState(false);
  const [availability, setAvailability] = useState(Availabilities.OFFLINE);
  const [challengedMe, setChallengedMe] = useState(false);
  const [cancelButton, setCancelButton] = useState(false);

  const toggleShowProfile = () => {
    setShowProfile(!showProfile);
  };

  socket.on(
    "friend_status",
    ({ userId, status, challengedMe, amIChallenger }) => {
      if (userId === friend.id) {
        if (status === Availabilities.OFFLINE) {
          setChallengedMe(false);
          setCancelButton(false);
        }
        setAvailability(status);
        if (challengedMe && amIChallenger) {
          setCancelButton(true);
        }
        if (challengedMe && !amIChallenger) {
          setChallengedMe(true);
        }
      }
    }
  );

  socket.on("challenge_notification", (challengerUserId) => {
    if (friend.id === challengerUserId) {
      setChallengedMe(true);
    }
  });

  socket.on("challenge_sent", (targetUserId) => {
    if (friend.id === targetUserId) {
      setAvailability(Availabilities.PENDING);
      setCancelButton(true);
    }
  });

  socket.on("challenge_cancelled_ch", (targetUserId) => {
    if (friend.id === targetUserId) {
      setCancelButton(false);
      setAvailability(Availabilities.ONLINE);
    }
  });

  socket.on("challenge_cancelled_ta", (challengerUserId) => {
    if (friend.id === challengerUserId) {
      setChallengedMe(false);
      setAvailability(Availabilities.ONLINE);
    }
  });

  socket.on("rejected_successfully", (challengerUserId) => {
    if (friend.id === challengerUserId) {
      setChallengedMe(false);
      setAvailability(Availabilities.ONLINE);
    }
  });

  socket.on("challenge_rejected", (targetUserId) => {
    if (friend.id === targetUserId) {
      setCancelButton(false);
    }
  });

  socket.on("accept_error_ch", (targetUserId) => {
    if (friend.id === targetUserId) {
      setCancelButton(false);
      setAvailability(Availabilities.ONLINE);
    }
  });

  socket.on("accept_error_ta", (challengerUserId) => {
    if (friend.id === challengerUserId) {
      setChallengedMe(false);
      setAvailability(Availabilities.ONLINE);
    }
  });

  socket.on("start_game", (newRoomId) => {
    setGameRoom(newRoomId);
    setCurrentPage("game");
  });

  return (
    <>
      <div className={`frienditem ${challengedMe ? "challenged-me" : ""}`}>
        <div className="frienditem-name-wrapper">
          <AvailabilityIcon availability={availability} />
          <div className="frienditem-name" onClick={toggleShowProfile}>
            <img
              className="friend-img"
              src={
                friend.profilePicUrl
                  ? friend.profilePicUrl
                  : "/images/noPicture.webp"
              }
              alt="Pic"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/images/noPicture.webp";
              }}
            />
            <span className="frienditem-name-span">
              {getFirstName(friend.username)}
            </span>
          </div>
        </div>
        {challengedMe ? (
          <div className="challenge-response-wrapper">
            <ChallengeAcceptButton friendId={friend.id} />
            <ChallengeDeclineButton friendId={friend.id} />
          </div>
        ) : cancelButton ? (
          <ChallengeCancelButton friendId={friend.id} />
        ) : (
          <ChallengeButton friendId={friend.id} availability={availability} />
        )}
      </div>
      {showProfile ? (
        <ProfilePreview user={friend} toggleShowProfile={toggleShowProfile} />
      ) : null}
    </>
  );
};

export default FriendItem;
