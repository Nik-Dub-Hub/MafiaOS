import { useState, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styles from "./Timer.module.css";
import { PlayerArrayType, updatePlayerThunk } from "@/entities/player";
import { clearVotingThunk, IGame, updateGameThunk } from "@/entities/game";
import { IUser } from "@/entities/user";
import { useAppDispatch } from "@/shared/hooks/reduxHooks";
import EventsModal from "@/features/modal/EventsModal/EventsModal";

type Props = {
  gamePlayers?: PlayerArrayType;
  game?: IGame;
  user: IUser;
};

export default function Timer({ game, user, gamePlayers }: Props) {
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

  // Функция для поиска наиболее часто встречающегося числа в массиве
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

  // Функция для получения имени игрока по его ID
  function getNameById(id: number): string | undefined {
    const player = gamePlayers?.find((player) => player.id === id);
    return player ? player.User.username : undefined;
  }

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const updateGamePhase = async () => {
      if (game && game.isRunning) {
        // Если время еще не истекло, уменьшаем текущее время на 1 секунду
        if (game.currentTime && game.currentTime > 0) {
          await dispatch(
            updateGameThunk({
              id: game.id,
              updateData: {
                currentTime: game.currentTime - 1,
              },
            })
          );
        } else {
          // Если время истекло, переходим к следующей фазе
          await dispatch(
            updateGameThunk({
              id: game.id,
              updateData: { phase: permanentPhase[phaseCounter] },
            })
          );

          // Если это не последняя фаза, увеличиваем счетчик фаз
          if (phaseCounter !== 2) {
            // Если фаза "Ночное голосование" или "Дневное голосование", обрабатываем голосование
            if (
              game.phase === "Ночное голосование" ||
              game.phase === "Дневное голосование"
            ) {
              const idDidPlayer = findMostFrequentNumber(game.voting);
              if (idDidPlayer !== null && idDidPlayer !== undefined) {
                const DidPlayer =
                  getNameById(idDidPlayer) || "Неизвестный игрок";

                // Обновляем состояние игрока (убиваем его)
                await dispatch(
                  updatePlayerThunk({
                    id: idDidPlayer,
                    updateData: { isAlive: false },
                  })
                );

                // Показываем модальное окно с результатами голосования
                setModalState({ isOpen: true, killedPlayer: DidPlayer });

                // Скрываем модальное окно через 3 секунды
                setTimeout(() => {
                  setModalState({ isOpen: false, killedPlayer: "" });
                }, 3000);
              }
            }

            // Увеличиваем счетчик фаз и очищаем голосование
            setPhaseCounter((prev) => prev + 1);
            await dispatch(clearVotingThunk(game.id));
          } else {
            // Если это последняя фаза, сбрасываем счетчик фаз
            setPhaseCounter(0);
          }

          // Сбрасываем текущее время для следующей фазы
          await dispatch(
            updateGameThunk({
              id: game.id,
              updateData: {
                currentTime: game.discussionTime,
              },
            })
          );
        }
      }
    };

    // Запускаем интервал только если игра запущена
    if (game && game.isRunning) {
      interval = setInterval(updateGamePhase, 1000);
    }

    // Очищаем интервал при размонтировании компонента
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [game, dispatch, phaseCounter]);

  // Функция для запуска или остановки игры
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

  // Вычисляем прогресс для отображения в CircularProgressbar
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

      <EventsModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false, killedPlayer: "" })}
        DidPlayer={modalState.killedPlayer}
        game={game!}
      />
    </div>
  );
}
