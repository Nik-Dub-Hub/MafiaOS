import { IPlayer, PlayerArrayType } from "@/entities/player";
import { IUser, UserAvatar } from "@/entities/user";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { useState } from "react";
import { addVoteThunk } from "@/entities/game"; 

type Props = {
  players: PlayerArrayType;
  currentUser: IUser;
  game_id: number;
};

export default function DailyVotingWidget({ players, currentUser, game_id }: Props) {
  const dispatch = useAppDispatch();
  const game = useAppSelector((state) =>
    state.games.games.find((g) => g.id === game_id)
  );
  const [hasVoted, setHasVoted] = useState(false);

  const alivePlayers = players.filter(
    (player: IPlayer) => player.isAlive && player.User.id !== currentUser?.id
  );

  const handlePlayerClick = (playerId: number) => {
    if (hasVoted) {
      console.log("Вы уже голосовали.");
      return;
    }

    dispatch(addVoteThunk({ id: game_id, voteData: { vote: playerId } }))
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
            <UserAvatar />
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
          {game.voting
            .map((votedId) => {
              const votedPlayer = players.find(
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
