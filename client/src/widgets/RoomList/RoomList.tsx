import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import TextField from "@mui/material/TextField";
import Groups2Icon from "@mui/icons-material/Groups2";
import { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { useState, useEffect } from "react";
import { setGameThunk } from "@/entities/game";
import { useNavigate } from "react-router";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function RoomList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState({keys: ""});
  const games = useAppSelector((state) => state.games.games);

  useEffect(() => {
    dispatch(setGameThunk());
  }, [dispatch]);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleNavigate = (id: number) => {
    //дописать путь
    navigate(`/game/${id}`);
  };

  return (
    <div className="choicePage">
      <Box
        sx={{
          mt: 3,
          mb: 3,
          maxWidth: "100%",
          backgroundColor: "gray",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <TextField
          fullWidth
          label="Ключ комнаты"
          id="fullWidth"
          variant="outlined"
          type="keys"
          name="keys"
          value={input.keys}
          onChange={onChangeHandler}
        />
      </Box>
      <div className="roomList">
        <Box
          sx={{
            flexGrow: 1,
            width: "100%",
            backgroundColor: "gray",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            textAlign: "center",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Typography
                sx={{ m: 1, fontWeight: "bold" }}
                variant="h6"
                component="div"
              >
                Список доступных комнат
              </Typography>
              <Demo>
                <List
                  sx={{
                    backgroundColor: "#f5f5f5",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    margin: "16px 0",
                    color: "gray",
                  }}
                >
                  {games.map((game, id) => (
                    <ListItem
                      key={id}
                      sx={{
                        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ border: "1px solid yellow" }}>
                          <Groups2Icon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={`Комната номер ${game.id}`} />
                      <IconButton
                        edge="end"
                        onClick={() => handleNavigate(game.id)}
                      >
                        <ArrowCircleRightIcon />
                      </IconButton>
                    </ListItem>
                  ))}
                </List>
              </Demo>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
}
