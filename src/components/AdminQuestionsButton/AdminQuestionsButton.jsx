import React from "react";

import "./AdminQuestionsButton.css";

const AdminQuestionsButton = ({ toggleShowAdminQuestions }) => {
  return (
    <button
      className="main-menu-button admin-questions-button"
      onClick={toggleShowAdminQuestions}
    >
      All Questions
    </button>
  );
};

export default AdminQuestionsButton;
