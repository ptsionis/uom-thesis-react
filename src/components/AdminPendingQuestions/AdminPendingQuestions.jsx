import React, { useContext, useEffect, useState } from "react";

import AdminPendingQuestion from "../AdminPendingQuestion/AdminPendingQuestion";
import Loader from "../Loader/Loader";

import { AiOutlineClose } from "react-icons/ai";
import { AppContext } from "../../App";

import "./AdminPendingQuestions.css";

const AdminPendingQuestions = ({ toggleShowAdminPending }) => {
  const { socket } = useContext(AppContext);
  const [pendingQuestions, setPendingQuestions] = useState([]);

  useEffect(() => {
    socket.emit("get_all_pending_questions");
  }, []);

  socket.on("get_all_pending_success", (pendingQuestions) => {
    setPendingQuestions(pendingQuestions);
  });

  return (
    <div className="admin-pending-wrapper popup-wrapper">
      <div className="admin-pending-questions">
        <AiOutlineClose
          className="pending-questions-close"
          size={"30px"}
          onClick={toggleShowAdminPending}
        />
        <div className="admin-pending-outer">
          {pendingQuestions ? (
            pendingQuestions.map((pendingQuestion) => {
              return (
                <AdminPendingQuestion
                  key={pendingQuestion.id}
                  id={pendingQuestion.id}
                  question={pendingQuestion.question}
                  category={pendingQuestion.category}
                  level={pendingQuestion.level}
                  answer1={pendingQuestion.answer1}
                  answer2={pendingQuestion.answer2}
                  answer3={pendingQuestion.answer3}
                  answer4={pendingQuestion.answer4}
                  correctId={pendingQuestion.correctId}
                  source={pendingQuestion.source}
                  userId={pendingQuestion.userId}
                />
              );
            })
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPendingQuestions;
