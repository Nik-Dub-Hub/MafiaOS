import { useState, useEffect, useCallback, useRef} from "react";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import Timer from "../Timer/Timer";
import RoleCard from "@/entities/role/ui/RoleCard";
import { useParams } from "react-router";
import { IGame } from "@/entities/game";
import DailyVotingWidget from "../DailyVotingWidget/DailyVotingWidget";
import ResultModal from "../../features/modal/ResultModal/ResultModal";
import { updateUserThunk } from "@/entities/user";

type Props = {
  game: IGame;
};

export default function StartGameWidget({ game }: Props) {
  const { id } = useParams();
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch()
  const statsUpdatedRef = useRef(false);
  const [winner, setWinner] = useState<"mafia" | "civilians" | "">("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const player = useAppSelector((state) =>
    state.players.players.find(
      (p) => p.user_id === user?.id && p.game_id === Number(id)
    )
  );
  const role = useAppSelector((state) =>
    state.roles.roles.find((r) => r.id === player?.role_id)
  );
  const gamePlayers = useAppSelector((state) =>
    state.players.players.filter((el) => el.game_id === Number(id))
  );
  const mafiaPlayers = gamePlayers.filter(
    (player) => player.role_id === 3 && player.isAlive
  );
  const civiliansPlayers = gamePlayers.filter(
    (player) => player.role_id !== 3 && player.isAlive
  );

   const updatePlayerStats = useCallback(async () => {
     if (user && player && player?.role_id === 2) {
       await dispatch(
         updateUserThunk({
           id: user?.id,
           updateData: { civilianCount: Number(user.civilianCount) + 1 },
          })
        );
        statsUpdatedRef.current = true
     }
     if (user && player && player?.role_id === 3) {
       await dispatch(
         updateUserThunk({
           id: user?.id,
           updateData: { mafiaCount: Number(user.mafiaCount) + 1 },
         })
        );
        statsUpdatedRef.current = true
     }
     if (user && player && player?.role_id === 4) {
       await dispatch(
         updateUserThunk({
           id: user?.id,
           updateData: { doctorCount: Number(user.doctorCount) + 1 },
         })
       );
       statsUpdatedRef.current = true
     }
     if (user && player && player?.role_id === 5) {
       await dispatch(
         updateUserThunk({
           id: user?.id,
           updateData: { ladyCount: Number(user.ladyCount) + 1 },
         })
       );
       statsUpdatedRef.current = true
      }
   },[player?.role_id]);

 useEffect(() => {
   if (user && player && !statsUpdatedRef.current) {
     updatePlayerStats();
   }
 }, [user, player]);


  useEffect(() => {
    if (game.phase !== "Ожидание" && game.phase !== "Знакомство") {
      if (mafiaPlayers.length === 0 && civiliansPlayers.length > 0) {
        setWinner("civilians");
        setIsModalOpen(true);
      } else if (civiliansPlayers.length <= mafiaPlayers.length) {
        setWinner("mafia");
        setIsModalOpen(true);
      } else if (player && !player.isAlive) {
        setIsModalOpen(true);
      }
    }
  }, [game.phase, player, mafiaPlayers.length, civiliansPlayers.length]);

  if (!user || !player) {
    return <div>Пользователь не авторизован</div>;
  }

  return (
    <div>
      <Timer gamePlayers={gamePlayers} game={game} user={user} />
      {(game.phase === "Знакомство" || game.phase === "Обсуждение") && (
        <RoleCard role={role} />
      )}
      {game.phase === "Ночное голосование" && (
        <>
          {player.role_id === 3 ? (
            <DailyVotingWidget
              gamePlayers={gamePlayers}
              game={game}
              user={user}
            />
          ) : (
            <RoleCard role={role} />
          )}
        </>
      )}
      {game.phase === "Дневное голосование" && (
        <DailyVotingWidget gamePlayers={gamePlayers} game={game} user={user} />
      )}
      <ResultModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        player={player}
        winner={winner}
        gameId={game.id} 
      />
    </div>
  );
}
