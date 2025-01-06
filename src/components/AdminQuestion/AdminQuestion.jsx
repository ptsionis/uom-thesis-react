import React, { useState, useContext } from "react";

import { capitalizeFirstLetter } from "../../utils/otherUtils";
import { Question } from "../../models/Question";
import { Categories } from "../../models/enums/categoriesEnum";
import { AppContext } from "../../App";

import "./AdminQuestion.css";

const AdminQuestion = ({
  id,
  question,
  category,
  level,
  answer1,
  answer2,
  answer3,
  answer4,
  correctId,
}) => {
  const { socket } = useContext(AppContext);
  const [editedQuestion, setEditedQuestion] = useState(question);
  const [editedCategory, setEditedCategory] = useState(category);
  const [editedLevel, setEditedLevel] = useState(level);
  const [editedAnswer1, setEditedAnswer1] = useState(answer1);
  const [editedAnswer2, setEditedAnswer2] = useState(answer2);
  const [editedAnswer3, setEditedAnswer3] = useState(answer3);
  const [editedAnswer4, setEditedAnswer4] = useState(answer4);
  const [editedCorrectId, setEditedCorrectId] = useState(correctId);
  const [isDisplayed, setIsDisplayed] = useState(true);

  const deleteQuestion = async () => {
    socket.emit("delete_question", id);
  };

  const updateQuestion = async () => {
    const updatedQuestion = new Question(
      id,
      editedQuestion,
      editedCategory,
      editedLevel,
      editedAnswer1,
      editedAnswer2,
      editedAnswer3,
      editedAnswer4,
      editedCorrectId
    );

    socket.emit("update_question", id, updatedQuestion);

    socket.on("delete_question_success", (questionId) => {
      if (id === questionId) setIsDisplayed(false);
    });
  };

  if (!isDisplayed) return null;

  return (
    <div className="admin-question-item">
      <p className="question-item-id">
        No. <span>{id}</span>
      </p>
      <div className="question-item-section">
        <label>
          Question <span className="question-item-required">*</span>
        </label>
        <input
          className="question-item-control"
          type="text"
          value={editedQuestion}
          onChange={(e) => setEditedQuestion(e.target.value)}
        />
        <div className="question-item-note">
          (Maximum length 500 characters)
        </div>
      </div>
      <div className="question-item-section">
        <label htmlFor="category">
          Category <span className="question-item-required">*</span>
        </label>
        <div className="question-item-radio-group">
          {Object.values(Categories).map((category) => (
            <div className="question-item-radio-option" key={category}>
              <input
                type="radio"
                name={`category-q${id}`}
                value={category}
                id={`category${category}-q${id}`}
                onChange={(e) => {
                  setEditedCategory(e.target.value);
                }}
                defaultChecked={category === editedCategory}
                required
              />
              <label
                className="question-item-radio-label"
                htmlFor={`category${category}-q${id}`}
              >
                {capitalizeFirstLetter(category)}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="question-item-section">
        <label htmlFor="level">
          Level <span className="question-item-required">*</span>
        </label>
        <div className="question-item-radio-group">
          {[1, 2, 3].map((level) => {
            return (
              <div className="question-item-radio-option" key={level}>
                <input
                  type="radio"
                  name={`level-q${id}`}
                  value={level}
                  id={`level${level}-q${id}`}
                  onChange={(e) => {
                    setEditedLevel(e.target.value);
                  }}
                  defaultChecked={level === editedLevel}
                  required
                />
                <label
                  className="question-item-radio-label"
                  htmlFor={`level${level}-q${id}`}
                >
                  {level}
                </label>
              </div>
            );
          })}
        </div>
      </div>
      <div className="question-item-section">
        <label>
          Answer 1 <span className="question-item-required">*</span>
        </label>
        <input
          className="question-item-control"
          type="text"
          value={editedAnswer1}
          onChange={(e) => setEditedAnswer1(e.target.value)}
        />
      </div>
      <div className="question-item-section">
        <label>
          Answer 2 <span className="question-item-required">*</span>
        </label>
        <input
          className="question-item-control"
          type="text"
          value={editedAnswer2}
          onChange={(e) => setEditedAnswer2(e.target.value)}
        />
      </div>
      <div className="question-item-section">
        <label>
          Answer 3 <span className="question-item-required">*</span>
        </label>
        <input
          className="question-item-control"
          type="text"
          value={editedAnswer3}
          onChange={(e) => setEditedAnswer3(e.target.value)}
        />
      </div>
      <div className="question-item-section">
        <label>
          Answer 4 <span className="question-item-required">*</span>
        </label>
        <input
          className="question-item-control"
          type="text"
          value={editedAnswer4}
          onChange={(e) => setEditedAnswer4(e.target.value)}
        />
      </div>
      <div className="question-item-section">
        <label htmlFor="correctId">
          Correct Answer <span className="question-item-required">*</span>
        </label>
        <div className="question-item-radio-group">
          {[1, 2, 3, 4].map((correctId) => (
            <div className="question-item-radio-option" key={correctId}>
              <input
                type="radio"
                name={`correctId-q${id}`}
                value={correctId}
                id={`correctId${correctId}-q${id}`}
                onChange={(e) => {
                  setEditedCorrectId(e.target.value);
                }}
                defaultChecked={correctId === editedCorrectId}
                required
              />
              <label
                className="question-item-radio-label"
                htmlFor={`correctId${correctId}-q${id}`}
              >
                {correctId}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="question-item-button-wrapper">
        <button
          className="question-item-button question-item-button-modify"
          onClick={updateQuestion}
        >
          Save
        </button>
        <button
          className="question-item-button question-item-button-delete"
          onClick={deleteQuestion}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default AdminQuestion;
