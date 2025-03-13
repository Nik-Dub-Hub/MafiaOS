/* eslint-disable @typescript-eslint/no-unused-vars */
import { IRole, RoleArrayType } from "../model";
import styles from "./RoleCard.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Card, CardContent, CardMedia, Button } from '@mui/material';
import {
  Info,
  InfoEyebrow,
  InfoSubtitle,
  InfoTitle,
} from "./mui-treasury/info-basic";
import { getInfoN04Styles } from "./mui-treasury/info-n04";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/shared/hooks/reduxHooks";
import { getAllRolesThunk } from "../api";
import { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";

export default function RoleCard() {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpen = () => {
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
    <div className={`flip-card-container ${isOpened ? 'flipped' : ''}`}>
    <Card
      className="flip-card"
      sx={{
        width: 343,
        maxWidth: "100%",
        borderRadius: "12px",
        padding: 1.5,
        boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
      }}
    >
      <CardContent className="flip-card-front">
        <Button className="open_closed" onClick={handleOpen}>
          <VisibilityOffIcon />
        </Button>
        <CardMedia
          image={"/alt_role.jpg"}
          sx={{
            borderRadius: "6px",
            width: "100%",
            height: 0,
            paddingBottom: "min(75%, 240px)",
            backgroundColor: "rgba(0,0,0,0.08)",
          }}
        />
        <div className="info-content">
          <h5>Ваша карточка</h5>
          <h2>{selectedRole.name}</h2>
          <p>{selectedRole.description}</p>
        </div>
      </CardContent>
      <CardContent className="flip-card-back">
        <Button className="open_eyes" onClick={handleOpen}>
          <VisibilityIcon />
        </Button>
        <div className="closed_card"><img src="/10157-200x365.jpg"/></div>
      </CardContent>
    </Card>
  </div>
);
}
