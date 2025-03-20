import { IPlayer, PlayerArrayType } from "@/entities/player";
import { IUser, UserAvatar } from "@/entities/user";
import { useAppDispatch } from "@/shared/hooks/reduxHooks";
import { ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { useState } from "react";
import { addVoteThunk, IGame } from "@/entities/game";
import styles from "./DailyVoting.module.css";

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
      console.log("Ваш голос уже учтён.");
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
    <div className={styles.container}>
      {alivePlayers.map((player: IPlayer, index: number) => (
        <ListItem
          key={index}
          onClick={() => handlePlayerClick(player.id)}
          sx={{
            backgroundColor: "white",
            margin: "5px",
            borderRadius: "8px",
            boxShadow: "1px 2px 3px rgba(250, 163, 1, 0.57)",
            border: "1px rgba(250, 163, 1, 0.57) solid",
          }}
        >
          <ListItemAvatar>
            <UserAvatar user={player.User}/>
          </ListItemAvatar>
          <ListItemText
            primary={player.User.username}
            secondary={
              hasVoted ? "Ваш голос уже учтён" : "Нажмите, чтобы проголосовать"
            }
            sx={{
              color: "black",
              "& .MuiTypography-body2": {
                color: "grey",
              },
            }}
          />
        </ListItem>
      ))}
      {game && (
        <div className={styles.voted}>
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
