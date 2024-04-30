import { useEffect, useState } from "react";
import React from "react";
import "./styles.css";
const ProgressBar = ({ value }) => {
  const [percent, setPercent] = useState(value);
  useEffect(() => {
    setPercent(Math.min(100, Math.max(value, 0)));
  }, [value]);
  return (
    <div className="progress">
      <span style={{ color: percent > 49 ? "white" : "black" }}>
        {percent.toFixed()}%
      </span>
      <div
        // style={{ width: `${percent}%` }}
        style={{
          transform: `scaleX(${percent / 100})`,
          transformOrigin: "left",
        }}
      />
    </div>
  );
};

export default ProgressBar;
