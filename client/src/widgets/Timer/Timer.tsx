import React, { useState, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styles from "./Timer.module.css";

const Timer: React.FC = () => {
  const totalTime = 10;
  const [time, setTime] = useState(totalTime);
  const statusText = "Стадия";

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          return totalTime;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [totalTime]);

  const progress = (time / totalTime) * 100;

  return (
    <div className={styles.timer}>
      <CircularProgressbar
        value={progress}
        styles={{
          path: {
            stroke: "yellow",
          },
          trail: {
            stroke: "#d6d6d6",
          },
        }}
      />
      <div className={styles.timerText}>{statusText}</div>
    </div>
  );
};

export default Timer;
