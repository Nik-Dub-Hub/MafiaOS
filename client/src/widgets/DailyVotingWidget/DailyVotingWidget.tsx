import { IPlayer, PlayerArrayType } from "@/entities/player";
import { IUser, UserAvatar } from "@/entities/user";
import { useAppDispatch} from "@/shared/hooks/reduxHooks";
import { ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { useState } from "react";
import { addVoteThunk, IGame } from "@/entities/game";

type Props = {
  gamePlayers: PlayerArrayType;
  game: IGame;
  user: IUser;
};

export default function DailyVotingWidget({ gamePlayers, game, user }: Props) {
  const dispatch = useAppDispatch();
  const [hasVoted, setHasVoted] = useState(false);

  const alivePlayers = gamePlayers.filter(
    (player: IPlayer) => player.isAlive && player.User.id !== user?.id
  );

  const handlePlayerClick = (playerId: number) => {
    if (hasVoted) {
      console.log("Вы уже голосовали.");
      return;
    }

    dispatch(addVoteThunk({ id: game.id, voteData: { vote: playerId } }))
      .unwrap()
      .then(() => {
        setHasVoted(true);
        console.log("Голос успешно добавлен");
      })
      .catch((error) => {
        console.error("Ошибка при голосовании:", error);
      });
  };

  return (
    <div>
      {alivePlayers.map((player: IPlayer, index: number) => (
        <ListItem key={index} onClick={() => handlePlayerClick(player.id)}>
          <ListItemAvatar>
            <UserAvatar user={player.User}/>
          </ListItemAvatar>
          <ListItemText
            primary={player.User.username}
            secondary={
              hasVoted ? "Вы уже голосовали" : "Нажмите, чтобы проголосовать"
            }
          />
        </ListItem>
      ))}
      {game && (
        <div>
          Текущие голоса:{" "}
          {(game.voting || [])
            .map((votedId) => {
              const votedPlayer = gamePlayers.find(
                (player) => player.id === votedId
              );
              return votedPlayer
                ? votedPlayer.User.username
                : "Неизвестный игрок";
            })
            .join(", ")}
        </div>
      )}
    </div>
  );
}
