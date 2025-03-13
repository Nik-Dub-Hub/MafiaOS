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
        sx={{
          // textAlign: "center",
          margin: "0px 30px",
          backgroundColor: "#222",
          color: "white",
          width: "300px",
          height: "430px",
          position: "relative",
          borderRadius: "12px",
          boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
        }}
        className={`${styles.flipCard} ${isOpened ? styles.flipped : ""}`}
      >
        {!isOpened ? (
          <CardContent
            sx={{
              padding: "2px 16px",
              backgroundColor: "#222",
              borderRadius: "12px",
              width: "90%",
              height: "250px",
            }}
          >
            <Button className="open_closed" onClick={handleOpen}>
              <VisibilityOffIcon
                sx={{
                  padding: "0px",
                  margin: "0px",
                  backgroundColor: "#222",
                  color: "gray",
                }}
              />
            </Button>
            <CardMedia
              sx={{
                backgroundColor: "#222",
                width: "100%",
                height: "200px",
              }}
              image={"/alt_role.jpg"}
            />
            <div className="info-content">
              <h3 className={styles.title}>Ваша карточка</h3>
              <h2 className={styles.role}>{selectedRole.name}</h2>
              <p className={styles.description}>{selectedRole.description}</p>
            </div>
          </CardContent>
        ) : (
          <CardContent
            sx={{
              padding: "2px 16px",
              backgroundColor: "#222",
              borderRadius: "12px",
              width: "90%",
              height: "250px",
            }}
          >
            <Button onClick={handleOpen}>
              <VisibilityIcon
                sx={{
                  padding: "0px",
                  margin: "0px",
                  backgroundColor: "#222",
                  color: "gray",
                }}
              />
            </Button>
            <div className={styles.closedCard}>
              <CardMedia
                sx={{
                  backgroundColor: "#222",
                  borderRadius: "12px",
                  width: "auto",
                  height: "90px",
                  paddingBottom: "min(100%, 240px)",
                  
                }}
                image={"/рубашка.png"}
              />
              <h2 className={styles.title}>ИДЕТ ИГРА</h2>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
