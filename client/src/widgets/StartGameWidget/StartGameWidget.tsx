import { useAppSelector } from "@/shared/hooks/reduxHooks";
import Timer from "../Timer/Timer";
import RoleCard from "@/entities/role/ui/RoleCard";
import { useParams } from "react-router";
import { IGame } from "@/entities/game";

type Props = {
  game:IGame
};

export default function StartGameWidget({ game }:Props) {
  const {id} = useParams()
  const { user } = useAppSelector((state) => state.user);
  const player = useAppSelector((state)=> state.players.players.find((p)=> p.user_id === user?.id && p.game_id === Number(id)))
  const role = useAppSelector((state)=> state.roles.roles.find(r => r.id === player?.role_id))
  const gamePlayers = useAppSelector((state) =>
    state.players.players.filter((el) => el.game_id === Number(id))
  );
  

  if (!user) {
    return <div>Пользователь не авторизован</div>;
  }
  return (
    <div>
      <Timer gamePlayers={gamePlayers} game={game} user={user}/>
      {role && <RoleCard role={role} />}
    </div>
  );
}
