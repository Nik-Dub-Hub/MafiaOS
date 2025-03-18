import { getAllPlayerThunk, IPlayer, PlayerArrayType, updatePlayerThunk } from '@/entities/player';
import { IUser, UserAvatar } from '@/entities/user';
import { useAppDispatch} from '@/shared/hooks/reduxHooks';
import { ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { useState } from 'react';

type Props = {
  players: PlayerArrayType;
  currentUser:IUser;
};
export default function DailyVotingWidget({
  players,
  currentUser,

}: Props) {
   const dispatch = useAppDispatch();
    const isAlivePlayers = players.filter((player: IPlayer) => {
      return player.isAlive === true && player.User.id !== currentUser?.id;
    });
   
const [hasVoted, setHasVoted] = useState(false);
    
const handlePlayerClick = (playerId: number) => {
    if (hasVoted) {
      console.log("Вы уже голосовали.");
      return;
    }
  dispatch(
    updatePlayerThunk({
      id: playerId,
      updateData: { isAlive: false },
    })
  )
    .unwrap()
    .then(() => {
      dispatch(getAllPlayerThunk());
      setHasVoted(true);
    })
    .catch((error) => {
      console.error("Ошибка обновления:", error);
    });
};


    return (
      <div>
        {isAlivePlayers.map((player: IPlayer, index: number) => (
          <ListItem key={index} onClick={() => handlePlayerClick(player.id)}>
            <ListItemAvatar>
              <UserAvatar />
            </ListItemAvatar>
            <ListItemText
              primary={player.User.username}
              secondary={hasVoted ? "Вы уже голосовали" : ""}
            />
          </ListItem>
        ))}
      </div>
    );
}
