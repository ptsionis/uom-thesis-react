import React, { useContext } from "react";

import "./GameCategoryTile.css";
import { AppContext } from "../../App";

const GameCategoryTile = ({ category, level, turn, isPlayed }) => {
  const { user, socket, gameRoom } = useContext(AppContext);

  const getQuestion = () => {
    socket.emit("get_question", gameRoom, category, level);
  };

  const isDisabled = () => {
    return user.id !== turn || isPlayed;
  };

  return (
    <button
      className={`${
        isDisabled() ? "game-category-tile-disabled" : "game-category-tile"
      }`}
      onClick={getQuestion}
      disabled={isDisabled()}
    >
      {`${category} X${level}`}
    </button>
  );
};

export default GameCategoryTile;
