import { useAppSelector } from "@/shared/hooks/reduxHooks";
import Timer from "../Timer/Timer";
import RoleCard from "@/entities/role/ui/RoleCard";
import { useParams } from "react-router";

type Props = {
  discussionTime:number
};

export default function StartGameWidget({ discussionTime }:Props) {
  const {id} = useParams()
  const { user } = useAppSelector((state) => state.user);
  const player = useAppSelector((state)=> state.players.players.find((p)=> p.user_id === user?.id && p.game_id === Number(id)))
  const role = useAppSelector((state)=> state.roles.roles.find(r => r.id === player?.role_id))
  const gamePlayers = useAppSelector((state)=> state.players.players.filter(el => el.game_id === Number(id)))
  
  return (
    <div>
      <Timer discussionTime={discussionTime} gamePlayers={gamePlayers} />
      {role && <RoleCard role={role} />}
    </div>
  );
}
