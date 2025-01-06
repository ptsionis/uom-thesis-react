import React, { useEffect, useContext, useState } from "react";

import FriendList from "../../components/FriendList/FriendList";
import QuickPlayButton from "../../components/QuickPlayButton/QuickPlayButton";
import ModalCustom from "../../components/ModalCustom/ModalCustom";
import Loader from "../../components/Loader/Loader";
import PlayVsFriendButton from "../../components/PlayVsFriendButton/PlayVsFriendButton";
import SubmitQuestionButton from "../../components/SubmitQuestionButton/SubmitQuestionButton";
import AdminPendingQuestions from "../../components/AdminPendingQuestions/AdminPendingQuestions";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import ChallengeModal from "../../components/ChallengeModal/ChallengeModal";
import OpenChallengeModal from "../../components/OpenChallengeModal/OpenChallengeModal";
import QuestionForm from "../../components/QuestionForm/QuestionForm";
import AdminPendingButton from "../../components/AdminPendingButton/AdminPendingButton";
import ProfilePreview from "../../components/ProfilePreview/ProfilePreview";

import { AppContext } from "../../App";
import { urlInitialization } from "../../utils/pagesUtils";
import { getFirstName } from "../../utils/userUtils";
import { Roles } from "../../models/enums/rolesEnum";

import "./HomeView.css";
import AdminQuestions from "../../components/AdminQuestions/AdminQuestions";
import AdminQuestionsButton from "../../components/AdminQuestionsButton/AdminQuestionsButton";

const HomeView = () => {
  const { socket, user, setUser, setGameRoom, setCurrentPage } =
    useContext(AppContext);
  const [showProfile, setShowProfile] = useState(false);
  const [showFriendlist, setShowFriendlist] = useState(false);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [showOpenChallengeModal, setShowOpenChallengeModal] = useState(false);
  const [showAdminPending, setShowAdminPending] = useState(false);
  const [showAdminQuestions, setShowAdminQuestions] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [challenger, setChallenger] = useState(null);

  const closeModal = () => {
    setShowErrorModal(false);
  };

  const toggleShowProfile = () => {
    setShowProfile(!showProfile);
  };

  const toggleShowFriendlist = () => {
    setShowFriendlist(!showFriendlist);
  };

  const toggleShowQuestionForm = () => {
    setShowQuestionForm(!showQuestionForm);
  };

  const toggleShowAdminPending = () => {
    setShowAdminPending(!showAdminPending);
  };

  const toggleShowAdminQuestions = () => {
    setShowAdminQuestions(!showAdminQuestions);
  };

  useEffect(() => {
    urlInitialization(socket, setUser);
    socket.connect();
    socket.emit("user_init");
  }, []);

  socket.on("user_init_success", (user) => {
    setUser(user);
  });

  socket.on("challenge_notification_detailed", (challengerProfile) => {
    setChallenger(challengerProfile);
    setShowChallengeModal(true);
  });

  socket.on("challenge_cancelled_ta", (challengerUserId) => {
    setShowChallengeModal(false);
  });

  socket.on("challenger_left", () => {
    setShowChallengeModal(false);
  });

  socket.on("challenge_error", (challengeErrorMsg) => {
    setShowErrorModal(true);
    setErrorText(challengeErrorMsg);
  });

  socket.on("rejected_successfully", (challengerUserId) => {
    setShowChallengeModal(false);
  });

  socket.on("open_challenge_created", () => {
    setShowOpenChallengeModal(true);
  });

  socket.on("open_challenge_cancelled", () => {
    setShowOpenChallengeModal(false);
  });

  socket.on("start_game", (newRoomId) => {
    setGameRoom(newRoomId);
    setCurrentPage("game");
  });

  return (
    <main className="home-main">
      {user ? (
        <>
          <div className="home-welcome-wrapper">
            <img
              className="home-avatar-img"
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
              onClick={toggleShowProfile}
            />
            <h3 className="home-welcome-text" onClick={toggleShowProfile}>
              Welcome, {getFirstName(user.username)}!
            </h3>
          </div>
          <div className="home-main-buttons">
            <QuickPlayButton />
            <PlayVsFriendButton toggleShowFriendlist={toggleShowFriendlist} />
            <SubmitQuestionButton
              toggleShowQuestionForm={toggleShowQuestionForm}
            />
            {user.role !== Roles.USER ? (
              <>
                <AdminPendingButton
                  toggleShowAdminPending={toggleShowAdminPending}
                />
                <AdminQuestionsButton
                  toggleShowAdminQuestions={toggleShowAdminQuestions}
                />
              </>
            ) : null}
            <LogoutButton />
          </div>
          {showErrorModal ? (
            <ModalCustom
              modalMsg={errorText}
              isError={true}
              callback={closeModal}
            />
          ) : null}
          {showFriendlist ? (
            <FriendList toggleShowFriendlist={toggleShowFriendlist} />
          ) : null}
          {showChallengeModal ? (
            <ChallengeModal challenger={challenger} />
          ) : null}
          {showOpenChallengeModal ? <OpenChallengeModal /> : null}
          {showQuestionForm ? (
            <QuestionForm toggleShowQuestionForm={toggleShowQuestionForm} />
          ) : null}
          {showAdminPending ? (
            <AdminPendingQuestions
              toggleShowAdminPending={toggleShowAdminPending}
            />
          ) : null}
          {showAdminQuestions ? (
            <AdminQuestions
              toggleShowAdminQuestions={toggleShowAdminQuestions}
            />
          ) : null}
          {showProfile ? (
            <ProfilePreview user={user} toggleShowProfile={toggleShowProfile} />
          ) : null}
        </>
      ) : (
        <Loader />
      )}
    </main>
  );
};

export default HomeView;
