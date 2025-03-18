import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import TextField from "@mui/material/TextField";
import Groups2Icon from "@mui/icons-material/Groups2";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { useState, useEffect } from "react";
import { setGameThunk } from "@/entities/game";
import { useNavigate } from "react-router";
import styles from "./RoomList.module.css";

export default function RoomList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState({ keys: "" });
  const games = useAppSelector((state) => state.games.games);

  useEffect(() => {
    dispatch(setGameThunk());
  }, [dispatch]);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleNavigate = (id: number) => {
    navigate(`/game/${id}`);
  };

  const waitingGames = games.filter((game) => game.phase === "Ожидание");

  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
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
      </div>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.gridItem}>
            <h6 className={styles.header}>Список доступных комнат</h6>
            <div className={styles.demo}>
              <ul className={styles.list}>
                {waitingGames.map((game, id) => (
                  <li className={styles.listItem} key={id}>
                    <div className={styles.listItemAvatar}>
                      <div className={styles.avatar}>
                        <Groups2Icon className={styles.icon} />
                      </div>
                    </div>
                    <span className={styles.listItemText}>
                      Комната номер {game.id}
                    </span>
                    <button
                      className={styles.iconButton}
                      onClick={() => handleNavigate(game.id)}
                    >
                      <ArrowCircleRightIcon />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
