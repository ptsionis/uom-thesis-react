import React from "react";
import GameCategoryTile from "../GameCategoryTile/GameCategoryTile";

import { Categories } from "../../models/enums/categoriesEnum";

import "./GameCategoriesWrapper.css";
import { getQuestionTileId } from "../../utils/otherUtils";

const GameCategoriesWrapper = ({ turn, questionsPlayed }) => {
  return (
    <div className="game-categories-wrapper">
      {Object.keys(Categories).map((category) => (
        <React.Fragment key={category}>
          <GameCategoryTile
            key={getQuestionTileId(category, 1)}
            category={category}
            level={1}
            turn={turn}
            isPlayed={questionsPlayed.includes(getQuestionTileId(category, 1))}
          />
          <GameCategoryTile
            key={getQuestionTileId(category, 2)}
            category={category}
            level={2}
            turn={turn}
            isPlayed={questionsPlayed.includes(getQuestionTileId(category, 2))}
          />
          <GameCategoryTile
            key={getQuestionTileId(category, 3)}
            category={category}
            level={3}
            turn={turn}
            isPlayed={questionsPlayed.includes(getQuestionTileId(category, 3))}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

export default GameCategoriesWrapper;
