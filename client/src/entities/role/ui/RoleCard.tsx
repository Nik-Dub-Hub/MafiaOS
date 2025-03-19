import styles from "./RoleCard.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Card, CardContent, CardMedia, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/shared/hooks/reduxHooks";
import { getAllRolesThunk } from "../api";
import { IRole } from "../model";

type Props = {
  role?: IRole;
};

export default function RoleCard({ role }: Props) {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsOpened((prevState) => !prevState);
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllRolesThunk());
  }, [dispatch]);

   return (
     <div className={styles.flipCardContainer}>
       <Card
         sx={{
           margin: "60px 30px",
           backgroundColor: "#222",
           color: "white",
           width: "100%",
           maxWidth: "400px",
           minWidth: "300px",
           height: "auto",
           minHeight: "500px", //Setting the minimum height
           position: "relative",
           border: "1px white solid",
           borderRadius: "12px",
           boxShadow: "0px 14px 80px rgba(247, 190, 32, 0.29)",
         }}
       >
         {!isOpened ? (
           <CardContent
             sx={{
               padding: "20px",
               backgroundColor: "#222",
               borderRadius: "12px",
               width: "100%",
               height: "auto",
             }}
           >
             <Button
               className="open_closed"
               onClick={handleOpen}
               sx={{ marginRight: "5px" }}
             >
               <VisibilityOffIcon
                 sx={{
                   padding: "0px",

                   backgroundColor: "#222",
                   color: "gray",
                 }}
               />
             </Button>
             <CardMedia
               sx={{
                 backgroundColor: "#222",
                 width: "100%",
                 height: "250px", // Устанавливаем высоту
                 aspectRatio: "1 / 1", // Сохраняем пропорции
                 margin: "5px",
                 objectFit: "contain", // Изображение полностью помещается в контейнер
               }}
               component="img" // Указываем, что это img-тег
               image={`/cards/${role?.image}`}
               alt={role?.name}
             />
             <div className={styles.infoContent}>
               <h3 className={styles.title}>Ваша карточка</h3>
               <h2 className={styles.role}>{role?.name}</h2>
               <p className={styles.description}>{role?.description}</p>
             </div>
           </CardContent>
         ) : (
           <CardContent
             sx={{
               padding: "20px",
               backgroundColor: "#222",
               borderRadius: "12px",
               width: "100%",
               height: "auto",
             }}
           >
             <Button onClick={handleOpen} sx={{ marginRight: "5px" }}>
               <VisibilityIcon
                 sx={{
                   backgroundColor: "#222",
                   color: "gray",
                 }}
               />
             </Button>
             <div className="closedCard">
               <CardMedia
                 sx={{
                   backgroundColor: "#222",
                   width: "100%",
                   height: "360px",
                   aspectRatio: "1 / 1",
                 }}
                 image={"/рубашка.png"}
               />
               <h2 className={styles.titleClosed}>идет игра</h2>
             </div>
           </CardContent>
         )}
       </Card>
     </div>
   );
}
