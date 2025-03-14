import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  startGame,
  addPlayer,
  assignRoles,
  startNightPhase,
  submitNightVote,
  startDayVoting,
  submitDayVote,
  checkEndConditions,
} from "@/features/gameLogic/slice";
import { RootState } from "@/app/store/store";

const GamePage: React.FC = () => {
  const dispatch = useDispatch();
  const gameState = useSelector((state: RootState) => state.gameLogic);
  const [timer, setTimer] = useState<number | null>(null);

  useEffect(() => {
    if (timer && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => (prevTimer ? prevTimer - 1 : null));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  useEffect(() => {
    if (timer === 0) {
      switch (gameState.phase) {
        case "inProgressBeginning":
          dispatch(assignRoles());
          dispatch(startNightPhase());
          setTimer(30); // Устанавливаем время до конца ночной фазы
          break;
        case "inProgressNight":
          dispatch(startDayVoting());
          setTimer(30); // Устанавливаем время для дневного голосования
          break;
        case "inProgressDayVoting":
          dispatch(startNightPhase());
          setTimer(30); // Устанавливаем время до ночи
          break;
        default:
          break;
      }
    }
  }, [timer, gameState.phase, dispatch]);

  const handleStartGame = () => {
    dispatch(startGame());
    setTimer(60); // Время до начала распределения ролей
  };

  const handleJoinGame = () => {
    dispatch(addPlayer({ id: Date.now(), username: `Player${Date.now()}` }));
  };

  const handleNightVote = (playerId: number) => {
    dispatch(submitNightVote(playerId));
    dispatch(checkEndConditions());
  };

  const handleDayVote = (playerId: number) => {
    dispatch(submitDayVote(playerId));
    dispatch(checkEndConditions());
  };

  return (
    <div>
      <h1>Фаза игры: {gameState.phase}</h1>
      <p>Таймер: {timer}</p>
      {gameState.phase === "waiting" && (
        <>
          <button onClick={handleStartGame}>Начать игру</button>
          <button onClick={handleJoinGame}>Присоединиться к игре</button>
          <p>Игроков: {gameState.players.length}/5</p>
        </>
      )}
      {gameState.phase === "inProgressNight" && (
        <div>
          <h2>Ночная фаза</h2>
          <p>Выберите жертву:</p>
          {gameState.players
            .filter((player) => player.isAlive)
            .map((player) => (
              <button
                key={player.id}
                onClick={() => handleNightVote(player.id)}
              >
                {player.username}
              </button>
            ))}
        </div>
      )}
      {gameState.phase === "inProgressDayVoting" && (
        <div>
          <h2>Дневное голосование</h2>
          <p>Проголосуйте за игрока:</p>
          {gameState.players
            .filter((player) => player.isAlive)
            .map((player) => (
              <button key={player.id} onClick={() => handleDayVote(player.id)}>
                {player.username}
              </button>
            ))}
        </div>
      )}
      {gameState.phase === "inEnd" && (
        <div>
          <h2>Игра окончена</h2>
          <p>Победитель: {gameState.winner}</p>
        </div>
      )}
    </div>
  );
};

export default GamePage;
