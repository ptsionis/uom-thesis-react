import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";

import "./GameAnswerButton.css";

const GameAnswerButton = ({ id, text, turn }) => {
  const { user, gameRoom, socket } = useContext(AppContext);
  const [buttonClassName, setButtonClassName] = useState("game-answer-button");
  const [isDisabled, setIsDisabled] = useState(false);

  const sendAnswer = () => {
    socket.emit("submit_answer", gameRoom, id);
  };

  useEffect(() => {
    if (turn !== user.id) {
      setButtonClassName("game-answer-button-disabled");
    }
  }, [turn]);

  socket.on("selected_answer", (answerId) => {
    setIsDisabled(true);
    if (answerId === id) {
      setButtonClassName("game-answer-button-selected");
    } else {
      setButtonClassName("game-answer-button-unselected");
    }
  });

  socket.on("reveal_answer", (answerId, correctId) => {
    if (id === correctId) {
      setButtonClassName("game-answer-button-correct");
    }
    if (id === answerId && id !== correctId) {
      setButtonClassName("game-answer-button-wrong");
    }
  });

  return (
    <button
      className={buttonClassName}
      onClick={sendAnswer}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
};

export default GameAnswerButton;
