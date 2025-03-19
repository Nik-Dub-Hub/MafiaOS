import { useState, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styles from "./Timer.module.css";
import { PlayerArrayType, updatePlayerThunk } from "@/entities/player";
import { clearVotingThunk, IGame, updateGameThunk } from "@/entities/game";
import { IUser } from "@/entities/user";
import { useAppDispatch } from "@/shared/hooks/reduxHooks";
import NightEventsModal from "@/features/modal/NightEventsModal/NightEventsModal";

type Props = {
  gamePlayers?: PlayerArrayType;
  game?: IGame;
  user: IUser;
};

export default function Timer({ game, user, gamePlayers }: Props) {
  // const [players, setPlayers] = useState<PlayerArrayType>(
  //   gamePlayers?.sort() || []
  // );
  const dispatch = useAppDispatch();
  const [phaseCounter, setPhaseCounter] = useState(0);
  const [modalState, setModalState] = useState({
    isOpen: false,
    killedPlayer: "",
  });

  const permanentPhase = [
    "Ночное голосование",
    "Обсуждение",
    "Дневное голосование",
  ];

  function findMostFrequentNumber(arr: number[]): number | null {
    if (arr.length === 0) return null;

    const frequencyMap = arr.reduce((acc, num) => {
      acc[num] = (acc[num] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    const mostFrequent = Object.entries(frequencyMap).sort(
      (a, b) => b[1] - a[1]
    )[0][0];

    return Number(mostFrequent);
  }

  function getNameById(id: number): string | undefined {
    const player = gamePlayers?.find((player) => player.id === id);
    return player ? player.User.username : undefined;
  }

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
           if (
             game.phase === "Ночное голосование" ||
             game.phase === "Дневное голосование"
           ) {
             const idDidPlayer = findMostFrequentNumber(game.voting);
             if (idDidPlayer !== null && idDidPlayer !== undefined) {
               const DidPlayer =
                 getNameById(idDidPlayer) || "Неизвестный игрок";
               dispatch(
                 updatePlayerThunk({
                   id: idDidPlayer,
                   updateData: { isAlive: false },
                 })
               );

               setModalState({ isOpen: true, killedPlayer: DidPlayer });

               setTimeout(() => {
                 setModalState({ isOpen: false, killedPlayer: "" });
               }, 3000);
             }
           }

           setPhaseCounter((prev) => prev + 1);
           dispatch(clearVotingThunk(game.id));
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
 }, [game, dispatch, phaseCounter]);

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

      <NightEventsModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false, killedPlayer: "" })}
        DidPlayer={modalState.killedPlayer}
        game={game!}
      />
    </div>
  );
}