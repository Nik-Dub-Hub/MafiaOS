import { setGameThunk } from "@/entities/game";
import { createPlayerThunk, getAllPlayerThunk } from "@/entities/player";
import { showAlert } from "@/features/alerts";
import { CLIENT_ROUTES } from "@/shared/enums/clientRoutes";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import WaitingGameWidget from "@/widgets/WaitingGameWidget/WaitingGameWidget";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function GamePage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);
  const game = useAppSelector((state) =>
    state.games.games.find((g) => g.id === +(id || 0))
  );
  const [isLoading, setIsLoading] = useState(true);

  const currentPlayers = useAppSelector((state) =>
    state.players.players.filter(p => p.game_id === Number(id))
  );

  useEffect(() => {
    dispatch(getAllPlayerThunk())
    const initializeGame = async () => {
      try {
        if (!id) {
          dispatch(
            showAlert({ message: "ID игры не указан", status: "error" })
          );
          navigate(CLIENT_ROUTES.MAIN);
          return;
        }

        if (!game) {
          await dispatch(setGameThunk());
        }

        if (game && user) {
          const isPlayerExists = currentPlayers.some(
            (player) => player.user_id === user.id
          );

          if (!isPlayerExists) {
            const response = await dispatch(
              createPlayerThunk({
                game_id: Number(id),
              })
            ).unwrap();

            if (response.error) {
              dispatch(
                showAlert({
                  message: "Вы уже игрок этой игры",
                  status: "message",
                })
              );
            } else if (response.statusCode === 201) {
              dispatch(
                showAlert({ message: "Теперь вы игрок", status: "success" })
              );
            }
          }
        }
      } catch {
        dispatch(showAlert({ message: "Ошибка подключения", status: "error" }));
      } finally {
        setIsLoading(false);
      }
    };

    initializeGame();
  }, [id, game, user]);

  if (isLoading) return <div>Загрузка...</div>;
  if (!game) return <div>Игра не найдена</div>;

  return (
    <div>
      {game.phase === "waiting" && (
        <WaitingGameWidget owner_id={game.owner_id} players={currentPlayers} />
      )}
    </div>
  );
}
