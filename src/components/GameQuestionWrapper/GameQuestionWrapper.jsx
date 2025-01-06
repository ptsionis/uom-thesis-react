import React from "react";

import "./GameQuestionWrapper.css";
import GameAnswerButton from "../GameAnswerButton/GameAnswerButton";

const GameQuestionWrapper = ({ turn, question }) => {
  return (
    <div className="game-question-wrapper">
      <span className="game-question-head">{`${question.category} X${question.level}`}</span>
      <span className="game-question">{question.question}</span>
      <div className="game-answers-wrapper">
        <GameAnswerButton id={1} text={question.answer1} turn={turn} />
        <GameAnswerButton id={2} text={question.answer2} turn={turn} />
        <GameAnswerButton id={3} text={question.answer3} turn={turn} />
        <GameAnswerButton id={4} text={question.answer4} turn={turn} />
      </div>
    </div>
  );
};

export default GameQuestionWrapper;
