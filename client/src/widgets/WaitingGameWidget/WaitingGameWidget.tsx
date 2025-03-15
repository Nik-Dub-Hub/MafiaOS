import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { useEffect, useState } from "react";
import { UserAvatar } from "@/entities/user";
import { PlayerArrayType } from "@/entities/player";

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
  gameId: number;
  players:PlayerArrayType;
};

export default function WaitingGameWidget({players }: Props) {
  const dispatch = useAppDispatch();
  const [timeLimit, setTimeLimit] = useState<number>(30);

  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {}, [dispatch]);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setTimeLimit(newValue as number);
    console.log(event);
  };

  const startGame = () => {
    console.log("Игра начата с временем:", timeLimit);
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
                      <UserAvatar user={user!} />
                    </ListItemAvatar>
                    <ListItemText primary={player.User.username} />
                  </ListItem>
                ))}
              </List>
            </Demo>
          </Grid>
        </Grid>

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
            onClick={startGame}
          >
            Начать играть
          </Button>
        </Box>
      </Box>
    </div>
  );
}
