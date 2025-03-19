import { useState, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styles from "./Timer.module.css";
import { PlayerArrayType } from "@/entities/player";
import { IGame, updateGameThunk } from "@/entities/game";
import { IUser } from "@/entities/user";
import { useAppDispatch } from "@/shared/hooks/reduxHooks";

type Props = {
  gamePlayers?: PlayerArrayType;
  game?: IGame;
  user: IUser;
};

export default function Timer({game, user }: Props) {
  // const [players, setPlayers] = useState<PlayerArrayType>(
  //   gamePlayers?.sort() || []
  // );
  const dispatch = useAppDispatch();
  const [phaseCounter, setPhaseCounter] = useState(0);
  const permanentPhase = [
    "Ночное голосование",
    "Обсуждение",
    "Дневное голосование",
  ];
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (game && game.isRunning) {
      interval = setInterval(() => {
        if (game.currentTime && game.currentTime > 0) {
          dispatch(
            updateGameThunk({
              id: game.id,
              updateData: {
                currentTime: game.currentTime - 2,
              },
            })
          );
        } else {
          // if (gamePlayers && gamePlayers.length > 0) {
          //   const updatedPlayers = players.slice(1);
          //   setPlayers(updatedPlayers);
          // } else {
          
            dispatch(
              updateGameThunk({
                id: game.id,
                updateData: { phase: permanentPhase[phaseCounter] },
              })
            );
            if (phaseCounter !== 2) {
              setPhaseCounter((prev) => prev + 1); 
        
            } else {
              setPhaseCounter(0); 
             
            }
          // }
          
          dispatch(
            updateGameThunk({
              id: game.id,
              updateData: {
                currentTime: game.discussionTime,
              },
            })
          );
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [game, dispatch]);

  const handleStartStop = async (running: boolean) => {
    if (game) {
      try {
        await dispatch(
          updateGameThunk({
            id: game.id,
            updateData: {
              isRunning: running,
            },
          })
        );
      } catch (error) {
        console.error("Ошибка при обновлении статуса игры:", error);
      }
    }
  };

  const progress =
    game && game.discussionTime && game.currentTime
      ? (game.currentTime / game.discussionTime) * 100
      : 0;
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
        {/* {players.length > 0 && `Время для ${players[0].User.username}`} */}
      </div>
      {user && user.id === game?.owner_id && (
        <div className={styles.controls}>
          <button
            onClick={() => handleStartStop(true)}
            disabled={game?.isRunning}
          >
            Продолжить
          </button>
          <button
            onClick={() => handleStartStop(false)}
            disabled={!game?.isRunning}
          >
            Остановить
          </button>
        </div>
      )}
    </div>
  );
}
