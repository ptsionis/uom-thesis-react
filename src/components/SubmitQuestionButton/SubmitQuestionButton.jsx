import React from "react";

import "./SubmitQuestionButton.css";

const SubmitQuestionButton = ({ toggleShowQuestionForm }) => {
  return (
    <button
      className="main-menu-button submit-question-button"
      onClick={toggleShowQuestionForm}
    >
      Submit a Question
    </button>
  );
};

export default SubmitQuestionButton;
