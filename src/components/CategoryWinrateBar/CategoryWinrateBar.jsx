import React from "react";

import "./CategoryWinrateBar.css";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CategoryWinrateBar = ({ categoryName, winrate }) => {
  return (
    <div style={{ width: "80px" }}>
      <h6 className="category-winrate-title">{categoryName}</h6>
      <CircularProgressbarWithChildren
        value={winrate}
        styles={buildStyles({
          pathColor: "hsl(214, 89%, 52%)",
        })}
      >
        <div style={{ fontSize: 12 }}>
          <span>{winrate}%</span>
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
};

export default CategoryWinrateBar;
