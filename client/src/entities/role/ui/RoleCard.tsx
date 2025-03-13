import styles from "./RoleCard.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Card, CardContent, CardMedia, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/shared/hooks/reduxHooks";
import { getAllRolesThunk } from "../api";
import { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";

export default function RoleCard() {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsOpened((prevState) => !prevState);
  };

  const dispatch = useAppDispatch();

  const roles = useSelector((state: RootState) => state.roles.roles);

  useEffect(() => {
    dispatch(getAllRolesThunk());
  }, [dispatch]);

  const randomRole = () => {
    if (roles && roles.length > 0) {
      const randomIndex = Math.floor(Math.random() * roles.length);
      return roles[randomIndex];
    }
    return null;
  };
  const selectedRole = randomRole();

  if (!selectedRole) {
    return <div>Загружаем роли</div>;
  }

  return (
    <div className={styles.flipCardContainer}>
      <Card
        className={`${styles.flipCard} ${isOpened ? styles.flipped : ""}`}>    
        {!isOpened ? (
          <CardContent className={styles.flipCardFront}>
            <Button color="primary" className="open_closed" onClick={handleOpen}>
              <VisibilityOffIcon/>
            </Button>
            <CardMedia className={styles.cardImage}
              image={"/alt_role.jpg"}/>
            <div className="info-content">
              <h3 className={styles.title}>Ваша карточка</h3>
              <h2 className={styles.role}>{selectedRole.name}</h2>
              <p className={styles.description}>{selectedRole.description}</p>
            </div>
          </CardContent>
        ) : (
          <CardContent className={styles.flipCardFront}>
            <Button color="primary" className="open_closed" onClick={handleOpen}>
              <VisibilityIcon />
            </Button>
            <div className={styles.closedCard}>
              <CardMedia className={styles.closedCardMedia}
                image={"/рубашка.png"}
              />
              <h2 className={styles.title}>Игра идет</h2>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
