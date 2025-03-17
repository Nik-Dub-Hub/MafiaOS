import  { useState, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styles from "./Timer.module.css";
import { useAppSelector } from "@/shared/hooks/reduxHooks";
import { useParams } from "react-router";
import { PlayerArrayType } from "@/entities/player";

type Props = {
  discussionTime: number;
  gamePlayers?: PlayerArrayType
};

export default function Timer({ discussionTime, gamePlayers }: Props) {
  const [time, setTime] = useState(discussionTime);
  const [isRunning, setIsRunning] = useState(true);
  const { id } = useParams();
  const game = useAppSelector((state) =>
    state.games.games.find((g) => g.id === Number(id))
  );

  useEffect(() => {
    let interval: NodeJS.Timeout
    if(isRunning){
      interval = setInterval(() => {
        setTime((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            return discussionTime;
          }
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [discussionTime,isRunning]);

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
      <div className={styles.controls}>
        <button onClick={() => setIsRunning(true)} disabled={isRunning}>
          Продолжить
        </button>
        <button onClick={() => setIsRunning(false)} disabled={!isRunning}>
          Остановить
        </button>
      </div>
    </div>
  );
};


