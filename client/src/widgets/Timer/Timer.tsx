import { useState, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styles from "./Timer.module.css";
import { PlayerArrayType } from "@/entities/player";
import { IGame } from "@/entities/game";
import { IUser } from "@/entities/user";

type Props = {
  discussionTime: number;
  gamePlayers?: PlayerArrayType;
  game?: IGame;
  user: IUser;
};

export default function Timer({
  discussionTime,
  gamePlayers: initialGamePlayers,
  game,
  user,
}: Props) {
  const [time, setTime] = useState(discussionTime);
  const [isRunning, setIsRunning] = useState(true);
  const [players, setPlayers] = useState<PlayerArrayType>(
    initialGamePlayers || []
  );

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            // Когда таймер доходит до 0
            if (players.length > 0) {
              // Удаляем игрока с индексом 0
              const updatedPlayers = players.slice(1);
              setPlayers(updatedPlayers);
            }
            return discussionTime; // Сбрасываем таймер
          }
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [discussionTime, isRunning, players]);

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
      <div className={styles.timerText}>
        {game?.phase}
        <br />
        {players.length > 0 && `Время для ${players[0].User.username}`}
      </div>
      {user && user.id === game?.owner_id && (
        <div className={styles.controls}>
          <button
            onClick={() => setIsRunning(true)}
            disabled={isRunning}
          >
            Продолжить
          </button>
          <button onClick={() => setIsRunning(false)} disabled={!isRunning}>
            Остановить
          </button>
        </div>
      )}
    </div>
  );
}
