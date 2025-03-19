import { setGameThunk } from "@/entities/game";
import { createPlayerThunk, getAllPlayerThunk } from "@/entities/player";
import { getAllRolesThunk } from "@/entities/role";
import { showAlert } from "@/features/alerts";
import { CLIENT_ROUTES } from "@/shared/enums/clientRoutes";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import WaitingGameWidget from "@/widgets/WaitingGameWidget/WaitingGameWidget";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StartGameWidget from "@/widgets/StartGameWidget/StartGameWidget";

export default function GamePage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);
  const game = useAppSelector((state) =>
    state.games.games.find((g) => g.id === +(id || 0))
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isPlayersLoaded, setIsPlayersLoaded] = useState(false);
  const currentPlayers = useAppSelector((state) =>
    state.players.players.filter((p) => p.game_id === Number(id))
  );

  useEffect(() => {
    dispatch(getAllRolesThunk());
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

        await dispatch(getAllPlayerThunk()); // Загрузить игроков
        setIsPlayersLoaded(true); // Установить флаг загрузки игроков

        if (game && user && isPlayersLoaded) {
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
  }, [id, game, user, dispatch, isPlayersLoaded]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    const fetchPlayers = async () => {
      try {
        await dispatch(getAllPlayerThunk());
        await dispatch(setGameThunk());
      } catch {
        console.error("Ошибка при загрузке игроков:");
      }
    };

    if (game?.phase === "Ожидание") {
      interval = setInterval(fetchPlayers, 1000);
    }
    return () => clearInterval(interval);
  }, [game]);

  if (isLoading) return <div>Загрузка...</div>;
  if (!game) return <div>Игра не найдена</div>;

  return (
    <div>
      {game.phase === "Ожидание" && (
        <WaitingGameWidget
          owner_id={game.owner_id}
          players={currentPlayers}
          game_id={game.id}
        />
      )}
      {game.phase !== "Ожидание" && <StartGameWidget game={game} />}
    </div>
  );
}
