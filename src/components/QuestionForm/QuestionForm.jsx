import React, { useContext, useState } from "react";

import { PendingQuestion } from "../../models/PendingQuestion";
import { Categories } from "../../models/enums/categoriesEnum";
import { capitalizeFirstLetter } from "../../utils/otherUtils";
import { AppContext } from "../../App";
import { AiOutlineClose } from "react-icons/ai";

import "./QuestionForm.css";
import ModalCustom from "../ModalCustom/ModalCustom";

const QuestionForm = ({ toggleShowQuestionForm }) => {
  const { socket } = useContext(AppContext);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const msgSuccess = "Question submitted successfully!";
  const msgFail = "An error occured, please try again!";

  const closeModal = () => {
    setShowFormModal(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const pendingQuestion = new PendingQuestion(
      null,
      formData.get("question"),
      formData.get("category"),
      formData.get("level"),
      formData.get("answer1"),
      formData.get("answer2"),
      formData.get("answer3"),
      formData.get("answer4"),
      formData.get("correctId"),
      formData.get("source"),
      null
    );

    const postData = { ...pendingQuestion };
    delete postData.id;
    delete postData.userId;

    socket.emit("submit_pending_question", postData);
  };

  socket.on("submit_pending_success", () => {
    setSubmitSuccess(true);
    setShowFormModal(true);
  });

  socket.on("submit_pending_fail", () => {
    setSubmitSuccess(false);
    setShowFormModal(true);
  });

  return (
    <div className="submit-form-wrapper popup-wrapper">
      <form onSubmit={handleSubmit} className="submit-form">
        <AiOutlineClose
          className="submit-form-close"
          size={"30px"}
          onClick={toggleShowQuestionForm}
        />
        <div className="submit-form-outer">
          <div className="submit-form-section">
            <label htmlFor="question">
              Question <span className="submit-form-required">*</span>
            </label>
            <input
              className="submit-form-control"
              type="text"
              name="question"
              maxLength={500}
              required
            />
            <div className="submit-form-note">
              (Maximum length 500 characters)
            </div>
          </div>
          <div className="submit-form-section">
            <label htmlFor="category">
              Category <span className="submit-form-required">*</span>
            </label>
            <div className="submit-form-radio-group">
              {Object.values(Categories).map((category) => (
                <div className="submit-form-radio-option" key={category}>
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    id={category}
                    required
                  />
                  <label className="submit-form-radio-label" htmlFor={category}>
                    {capitalizeFirstLetter(category)}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="submit-form-section">
            <label htmlFor="level">
              Level <span className="submit-form-required">*</span>
            </label>
            <div className="submit-form-radio-group">
              {[1, 2, 3].map((level) => (
                <div className="submit-form-radio-option" key={level}>
                  <input
                    type="radio"
                    name="level"
                    value={level}
                    id={`level-${level}`}
                    required
                  />
                  <label
                    className="submit-form-radio-label"
                    htmlFor={`level-${level}`}
                  >
                    {level}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="submit-form-section">
            <label htmlFor="answer1">
              Answer 1 <span className="submit-form-required">*</span>
            </label>
            <input
              className="submit-form-control"
              type="text"
              name="answer1"
              maxLength={100}
              required
            />
          </div>
          <div className="submit-form-section">
            <label htmlFor="answer2">
              Answer 2 <span className="submit-form-required">*</span>
            </label>
            <input
              className="submit-form-control"
              type="text"
              name="answer2"
              maxLength={100}
              required
            />
          </div>
          <div className="submit-form-section">
            <label htmlFor="answer3">
              Answer 3 <span className="submit-form-required">*</span>
            </label>
            <input
              className="submit-form-control"
              type="text"
              name="answer3"
              maxLength={100}
              required
            />
          </div>
          <div className="submit-form-section">
            <label htmlFor="answer4">
              Answer 4 <span className="submit-form-required">*</span>
            </label>
            <input
              className="submit-form-control"
              type="text"
              name="answer4"
              maxLength={100}
              required
            />
          </div>
          <div className="submit-form-section">
            <label htmlFor="correctId">
              Correct Answer <span className="submit-form-required">*</span>
            </label>
            <div className="submit-form-radio-group">
              {[1, 2, 3, 4].map((correctId) => (
                <div className="submit-form-radio-option" key={correctId}>
                  <input
                    type="radio"
                    name={`correctId`}
                    value={correctId}
                    id={`correctId-ci${correctId}`}
                    required
                  />
                  <label
                    className="submit-form-radio-label"
                    htmlFor={`correctId-ci${correctId}`}
                  >
                    {correctId}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="submit-form-section">
            <label htmlFor="source">Source URL</label>
            <input
              className="submit-form-control"
              type="text"
              name="source"
              maxLength={2048}
            />
          </div>
          <div className="submit-form-buttons-wrapper">
            <button
              type="button"
              className="submit-form-cancel"
              onClick={toggleShowQuestionForm}
            >
              Cancel
            </button>
            <button className="submit-form-submit" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
      {showFormModal ? (
        <ModalCustom
          modalMsg={submitSuccess ? msgSuccess : msgFail}
          isError={submitSuccess}
          callback={closeModal}
        />
      ) : null}
    </div>
  );
};

export default QuestionForm;
