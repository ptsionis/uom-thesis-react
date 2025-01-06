import React, { useState, useEffect, useContext } from "react";

import Loader from "../Loader/Loader";
import AdminQuestion from "../AdminQuestion/AdminQuestion";
import { AiOutlineClose } from "react-icons/ai";
import { AppContext } from "../../App";

import "./AdminQuestions.css";

const AdminQuestions = ({ toggleShowAdminQuestions }) => {
  const { socket } = useContext(AppContext);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    socket.emit("get_all_questions");
  }, []);

  socket.on("get_all_questions_success", (questions) => {
    setQuestions(questions);
  });

  return (
    <div className="admin-questions-wrapper popup-wrapper">
      <div className="admin-questions">
        <AiOutlineClose
          className="questions-close"
          size={"30px"}
          onClick={toggleShowAdminQuestions}
        />
        <div className="admin-questions-outer">
          {questions ? (
            questions.map((question) => {
              return (
                <AdminQuestion
                  key={question.id}
                  id={question.id}
                  question={question.question}
                  category={question.category}
                  level={question.level}
                  answer1={question.answer1}
                  answer2={question.answer2}
                  answer3={question.answer3}
                  answer4={question.answer4}
                  correctId={question.correctId}
                  source={question.source}
                  userId={question.userId}
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

export default AdminQuestions;
