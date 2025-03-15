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
  
  return (
    <div>
      <Timer discussionTime={discussionTime} />
      {role &&
      <RoleCard role={role}/>
      }
    </div>
  );
}
