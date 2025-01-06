import React from "react";

import "./AvailabilityIcon.css";

const AvailabilityIcon = ({ availability }) => {
  return (
    <div
      className={`availability-icon ${availability}`}
      title={availability}
    ></div>
  );
};

export default AvailabilityIcon;
