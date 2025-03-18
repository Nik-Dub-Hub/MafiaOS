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



// import { IPlayer, PlayerArrayType } from "@/entities/player";
// import { IUser, UserAvatar } from "@/entities/user";
// import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
// import {
//   ListItem,
//   ListItemAvatar,
//   ListItemText,
//   Typography,
// } from "@mui/material";
// import { useState } from "react";
// import { addVoteThunk } from "@/entities/game";

// type Props = {
//   players: PlayerArrayType;
//   currentUser: IUser;
//   game_id: number;
//   phase: string;
// };

// export default function DailyVotingWidget({
//   players,
//   currentUser,
//   game_id,
//   phase,
// }: Props) {
//   const dispatch = useAppDispatch();
//   const game = useAppSelector((state) =>
//     state.games.games.find((g) => g.id === game_id)
//   );
//   const [hasVoted, setHasVoted] = useState(false);

//   const currentPlayer = players.find(
//     (player) => player.User.id === currentUser.id
//   );

//   const eligiblePlayers = players.filter((player: IPlayer) => {
//     if (phase === "Ночное голосование") {
//       return (
//         player.isAlive &&
//         player.User.id !== currentUser?.id &&
//         player.Role.name !== "Мафия"
//       );
//     } else {
//       return player.isAlive && player.User.id !== currentUser?.id;
//     }
//   });

//   const canVote =
//     phase === "Дневное голосование" ||
//     (phase === "Ночное голосование" && currentPlayer?.Role.name === "Мафия");

//   const handlePlayerClick = (playerId: number) => {
//     if (hasVoted || !canVote) {
//       console.log("Вы не можете голосовать сейчас.");
//       return;
//     }

//     dispatch(addVoteThunk({ id: game_id, voteData: { vote: playerId } }))
//       .unwrap()
//       .then(() => {
//         setHasVoted(true);
//         console.log("Голос успешно добавлен");
//       })
//       .catch((error) => {
//         console.error("Ошибка при голосовании:", error);
//       });
//   };

//   if (!canVote) {
//     return <Typography>Сейчас не ваша очередь голосовать.</Typography>;
//   }

//   return (
//     <div>
//       <Typography variant="h6">
//         {phase === "Ночное голосование"
//           ? "Ночное голосование (только для мафии)"
//           : "Дневное голосование"}
//       </Typography>
//       {eligiblePlayers.map((player: IPlayer) => (
//         <ListItem key={player.id} onClick={() => handlePlayerClick(player.id)}>
//           <ListItemAvatar>
//             <UserAvatar />
//           </ListItemAvatar>
//           <ListItemText
//             primary={player.User.username}
//             secondary={
//               hasVoted ? "Вы уже голосовали" : "Нажмите, чтобы проголосовать"
//             }
//           />
//         </ListItem>
//       ))}
//       {game && (
//         <div>
//           Текущие голоса:{" "}
//           {game.voting
//             .map((votedId) => {
//               const votedPlayer = players.find(
//                 (player) => player.id === votedId
//               );
//               return votedPlayer
//                 ? votedPlayer.User.username
//                 : "Неизвестный игрок";
//             })
//             .join(", ")}
//         </div>
//       )}
//     </div>
//   );
// }
