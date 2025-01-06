import React, { useState, useEffect } from "react";
import { FaInfinity } from "react-icons/fa6";

import "./ProgressBar.css";

const ProgressBar = ({ currentValue, goalValue }) => {
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    let widthPercentage = 0;
    if (currentValue <= 0) {
      widthPercentage = 1;
    } else if (goalValue === 0) {
      widthPercentage = 100;
    } else {
      widthPercentage = Math.round((currentValue / goalValue) * 100);
    }
    setBarWidth(widthPercentage);
  }, []);

  return (
    <div className="progress-bar-outer">
      <div
        className={`progress-bar-inner`}
        style={{
          width: `${barWidth}%`,
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;
