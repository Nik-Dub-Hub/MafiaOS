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
  CircularProgress,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { useCallback, useState } from "react";
import {  UserAvatar } from "@/entities/user";
import { PlayerArrayType, updatePlayerThunk } from "@/entities/player";
import { showAlert } from "@/features/alerts";
import { updateGameThunk } from "@/entities/game";
import { IRole } from "@/entities/role";
import { Counter } from "../Counter/Counter";

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

const marks = [
  { value: 0, label: "10s" },
  { value: 1, label: "30s" },
  { value: 2, label: "60s" },
];

const indexToValue = (index: number) => {
  switch (index) {
    case 0:
      return 10;
    case 1:
      return 30;
    case 2:
      return 60;
    default:
      return 30; 
  }
};

const valueToIndex = (value: number) => {
  switch (value) {
    case 10:
      return 0;
    case 30:
      return 1;
    case 60:
      return 2;
    default:
      return 1; 
  }
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
  
const handleSliderChange = useCallback(
  (_event: Event, newValue: number | number[]) => {
    const newIndex = Array.isArray(newValue) ? newValue[0] : newValue;
    const newTime = indexToValue(newIndex);
    setTimeLimit(newTime);
  },
  []
);

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
        players.map((player, index) =>
          dispatch(
            updatePlayerThunk({
              id: player.id,
              updateData: { role_id: playerRoles[index] },
            })
          ).unwrap(),
          
        )
      );
    } catch {
      dispatch(
        showAlert({
          message: `Ошибка при старте игры`,
          status: "error",
        })
      );
    }
  };

  const updateStateGame = async () => {
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
        flexDirection: "column",
        gap: "30px",
        height: "100vh",
        padding: "0 30px",
        position: "relative",
        top: "-50px",
      }}
    >
      <Counter />
      <Box
        sx={{
          width: 300,
          backgroundColor: "gray",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(255, 171, 14, 0.99)",
          padding: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h5"
          component="div"
          textAlign="center"
          sx={{ mb: 2 }}
        >
          Комната для игры №{game_id}
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
                  backgroundColor: "gray",
                  margin: "16px 0",
                  flexGrow: 1,
                  minHeight: "50%",
                  maxHeight: "50%",
                  overflowY: "auto",
                }}
              >
                {players.map((player, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      backgroundColor: "#f5f5f5",
                      color: "black",
                      border: "1px rgba(250, 163, 1, 0.57) solid",
                      borderRadius: "8px",
                      margin: "5px 0px",
                      boxShadow: "1px 2px 3px rgba(250, 163, 1, 0.57)",
                    }}
                  >
                    <ListItemAvatar>
                      <UserAvatar user={player.User}/>
                    </ListItemAvatar>
                    <ListItemText
                      primary={player.User.username}
                      sx={{ color: "black" }}
                    />
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
              <Box sx={{ mt: 0, mb: '0px', pt: 0, pb: '0px' }}>
                <YellowSlider
                  value={valueToIndex(timeLimit)}
                  onChange={handleSliderChange}
                  aria-labelledby="time-limit-slider"
                  min={0}
                  max={2}
                  step={1}
                  valueLabelDisplay="auto"
                  marks={marks}
                  scale={(index) => indexToValue(index)}
                />
              </Box>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: players.length >= 4 ? "#bdb141" : "#d3d3d3",
                  color: players.length >= 4 ? "black" : "#a9a9a9",
                  "&:hover": { backgroundColor: "#7a732e" },
                }}
                onClick={updateStateGame}
                disabled={players.length < 4}
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
