import { styled } from "@mui/material/styles";
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Grid,
  Typography,
  Slider,
  Button,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { useState } from "react";
import { UserAvatar } from "@/entities/user";
import { PlayerArrayType, updatePlayerThunk } from "@/entities/player";
import { showAlert } from "@/features/alerts";
import { CircularProgress } from "@mui/material";
import { updateGameThunk } from "@/entities/game";
import { IRole } from "@/entities/role";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  flexGrow: 1,
}));

const YellowSlider = styled(Slider)(() => ({
  color: "#bdb141",
  height: 8,
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#d9d44a",
    border: "2px solid currentColor",
    "&:hover, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "& .MuiSlider-valueLabel": {
      background: "#d9d44a",
    },
  },
  "& .MuiSlider-track": {
    borderRadius: 4,
    backgroundColor: "#d9d44a",
  },
  "& .MuiSlider-rail": {
    borderRadius: 4,
    backgroundColor: "lightgray",
  },
}));
type Props = {
  players: PlayerArrayType;
  owner_id: number;
  game_id: number;
};

export default function WaitingGameWidget({
  players,
  owner_id,
  game_id,
}: Props) {
  const dispatch = useAppDispatch();
  const [timeLimit, setTimeLimit] = useState<number>(30);
  const user = useAppSelector((state) => state.user.user);
  const roles = useAppSelector((state) => state.roles.roles);


  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setTimeLimit(newValue as number);
    console.log(event);
  };

  const updateGame = () => {
    dispatch(
      updateGameThunk({
        id: game_id,
        updateData: {
          phase: "Знакомство",
          discussionTime: timeLimit,
          currentTime: timeLimit,
        },
      })
    )
      .unwrap()
      .catch((error) =>
        dispatch(
          showAlert({
            message: `Ошибка при старте игры: ${error.message}`,
            status: "error",
          })
        )
      );
  };

  const updateRolePlayersInServer = async () => {
    const playerRoles = roles
      .filter((role: IRole) => role.id !== 1)
      .map((role: IRole) => role.id);
    playerRoles.sort(() => Math.random() - 0.5);

    try {
      await Promise.all(
        players.map((player,index) =>
          dispatch(
            updatePlayerThunk({
              id: player.id,
              updateData: { role_id:playerRoles[index]  },
            })
          ).unwrap()
        )
      );
    } catch {
      dispatch(
        showAlert({
          message: `Ошибка при старте игры: `,
          status: "error",
        })
      );
    }
  };

 

  const updateStateGame = async () => {
    // if (players.length < 4) {
    //   dispatch(
    //     showAlert({
    //       message: `Для игры нужно больше 3 игроков`,
    //       status: "error",
    //     })
    //   );
    //   return;
    // }
    //! Закомментировал,что бы отключить проверку

 
    await updateGame();
    await updateRolePlayersInServer();

    dispatch(
      showAlert({
        message: `Игра начата с временем: ${timeLimit}`,
        status: "message",
      })
    );
    return;
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        padding: "0 30px",
      }}
    >
      <Box
        sx={{
          width: 300,
          maxHeight: "30vh", // Максимальная высота виджета
          backgroundColor: "gray",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          padding: 2,
          display: "flex",
          flexDirection: "column", // Устанавливаем вертикальное направление для содержимого
        }}
      >
        <Typography
          variant="h5"
          component="div"
          textAlign="center"
          sx={{ mb: 2 }}
        >
          Комната для игры
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              sx={{ m: 1, fontWeight: "bold" }}
              variant="h6"
              textAlign="center"
            >
              Список игроков
            </Typography>
            <Demo>
              <List
                sx={{
                  backgroundColor: "#f5f5f5",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  margin: "16px 0",
                  flexGrow: 1, // Позволяет списку занимать доступное пространство
                  minHeight: "50%", // Устанавливает минимальную высоту на 50%
                  maxHeight: "50%", // Максимальная высота списка, чтобы избежать переполнения
                  overflowY: "auto", // Добавляем прокрутку, если контент превышает высоту
                }}
              >
                {players.map((player, index) => (
                  <ListItem key={index}>
                    <ListItemAvatar>
                      <UserAvatar />
                    </ListItemAvatar>
                    <ListItemText primary={player.User.username} />
                  </ListItem>
                ))}
              </List>
            </Demo>
          </Grid>
        </Grid>

        {user?.id === owner_id && (
          <>
            <Box textAlign="center" mt={2}>
              <Typography variant="subtitle1" textAlign="center">
                Установите время:
              </Typography>
              <YellowSlider
                value={timeLimit}
                onChange={handleSliderChange}
                aria-labelledby="time-limit-slider"
                min={5}
                max={60}
                valueLabelDisplay="auto"
                sx={{ my: 3 }}
              />
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#bdb141",
                  color: "black",
                  "&:hover": { backgroundColor: "#7a732e" },
                }}
                onClick={updateStateGame}
              >
                Начать играть
              </Button>
            </Box>
          </>
        )}
        {user?.id !== owner_id && (
          <Box textAlign="center" mt={6}>
            <Typography>Ожидаем старта игры...</Typography>
            <CircularProgress
              sx={{
                color: "gold",
              }}
            />
          </Box>
        )}
      </Box>
    </div>
  );
}
