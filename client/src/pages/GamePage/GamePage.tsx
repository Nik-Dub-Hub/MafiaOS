import { setGameThunk } from "@/entities/game";
import { createPlayerThunk } from "@/entities/player";
import { showAlert } from "@/features/alerts";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import WaitingGameWidget from "@/widgets/WaitingGameWidget/WaitingGameWidget";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function GamePage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const game = useAppSelector((state) =>
    state.games.games.find((g) => g.id === +(id || 0))
  );
  const [isLoading, setIsLoading] = useState(true);

  // Получаем игроков текущей игры
  const currentPlayers = useAppSelector((state) =>
    state.players.players)
  
  console.log(currentPlayers);
  
  useEffect(() => {
    const initializeGame = async () => {
      try {
        if (!game) {
          await dispatch(setGameThunk());
        }
        if (game && user) {
          // Создаем игрока при входе на страницу
          await dispatch(
            createPlayerThunk({
              game_id: game.id,
            })
          ).unwrap();
        }
      } catch {
        dispatch(showAlert({ message: "Ошибка подключения", status: "error" }));
      } finally {
        setIsLoading(false);
      }
    };

    initializeGame();
  }, [dispatch, game, user, id]);

  if (isLoading) return <div>Загрузка...</div>;
  if (!game) return <div>Игра не найдена</div>;



  return (
    <div>
      {game.phase === "waiting" && (
        <WaitingGameWidget
          gameId={game.id}
          players={currentPlayers}
        />
      )}
    </div>
  );
}
