import { Modal, Box, Typography, Button } from "@mui/material";
import FormStat from "./FormStat";
import Profile from "@/widgets/Profile/ProfileForm";
import { useAppSelector } from "@/shared/hooks/reduxHooks";
import { useState } from "react";

interface StatisticsModalProps {
  open: boolean;
  onClose: () => void;
  onOpenStatisticsModal: () => void;
}

export default function Statistics({ open, onClose }: StatisticsModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const user = useAppSelector((state) => state.user.user);
  console.log(user);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleProfileClose = () => {
    setIsEditing(false);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          bgcolor: "#343E40",
          boxShadow: 34,
          p: 3,
          borderRadius: 8,
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{ color: "#E1CC4F" }}
        >
          Ваша статистика
        </Typography>
        <FormStat />
        {!isEditing ? (
          <>
            <Box>
              <Typography
                variant="h5"
                component="h2"
                gutterBottom
                sx={{ color: "#E1CC4F" }}
              >
                Ваши данные
              </Typography>
              <Typography
                variant="h6"
                component="h4"
                gutterBottom
                sx={{ color: "#DDDDDD" }}
              >
                Имя: {user?.username}
              </Typography>
              <Typography
                variant="h6"
                component="h4"
                gutterBottom
                sx={{ color: "#DDDDDD" }}
              >
                Электронная почта: {user?.email}
              </Typography>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 2,
                  width: "100%",
                  background: "#E1CC4F",
                  color: "#343E40",
                }}
                onClick={handleEditClick}
              >
                Изменить
              </Button>
            </Box>
          </>
        ) : (
          <Profile onClose={handleProfileClose} userId={0}          
          />
        )}
      </Box>
    </Modal>
  );
}
