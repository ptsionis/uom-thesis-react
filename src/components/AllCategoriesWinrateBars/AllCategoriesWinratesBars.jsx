import React from "react";

import "./AllCategoriesWinratesBars.css";
import CategoryWinrateBar from "../CategoryWinrateBar/CategoryWinrateBar";
import { getWinrate } from "../../utils/userUtils";

const AllCategoriesWinratesBars = ({ user }) => {
  return (
    <div className="all-categories-winrates-wrapper">
      <CategoryWinrateBar
        categoryName={"History"}
        winrate={getWinrate(user.historyWon, user.historyPlayed)}
      />
      <CategoryWinrateBar
        categoryName={"Geography"}
        winrate={getWinrate(user.geographyWon, user.geographyPlayed)}
      />
      <CategoryWinrateBar
        categoryName={"Finance"}
        winrate={getWinrate(user.financeWon, user.financePlayed)}
      />
      <CategoryWinrateBar
        categoryName={"Logo"}
        winrate={getWinrate(user.logoWon, user.logoPlayed)}
      />
      <CategoryWinrateBar
        categoryName={"Trivia"}
        winrate={getWinrate(user.triviaWon, user.triviaPlayed)}
      />
      <CategoryWinrateBar
        categoryName={"Hidden"}
        winrate={getWinrate(user.hiddenWon, user.hiddenPlayed)}
      />
    </div>
  );
};

export default AllCategoriesWinratesBars;
