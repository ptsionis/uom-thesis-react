import React from "react";

import "./Scoreboard.css";

const Scoreboard = ({ scoreMe, scoreOpponent }) => {
  return (
    <div className="scoreboard">
      <span className="scoreboard-score">{scoreMe}</span>
      <div className="scoreboard-divider"></div>
      <span className="scoreboard-score">{scoreOpponent}</span>
    </div>
  );
};

export default Scoreboard;
