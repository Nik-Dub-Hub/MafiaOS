import  { useState, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styles from "./Timer.module.css";
import { useAppSelector } from "@/shared/hooks/reduxHooks";
import { useParams } from "react-router";

type Props = {
  discussionTime: number;
};

export default function Timer({ discussionTime }:Props) {
  const [time, setTime] = useState(discussionTime);
  // const statusText = useAppSelector(state=> state.gameLogic.phase)
  const {id} = useParams()
  const game  = useAppSelector(state => state.games.games.find(g => g.id === Number(id)))


  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          return discussionTime;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [discussionTime]);

  const progress = (time / discussionTime) * 100;

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
      <div className={styles.timerText}>{game?.phase}</div>
    </div>
  );
};


