import { Modal, Box, Typography, Button } from "@mui/material";
import FormStat from "./FormStat";
import Profile from "@/widgets/Profile/ProfileForm";
import { useAppSelector } from "@/shared/hooks/reduxHooks";
import { useState } from "react";
import { updateUserThunk } from "../../../entities/user/api/index";
import { useAppDispatch } from "@/shared/hooks/reduxHooks";
import { ChangeEvent } from "react";

interface StatisticsModalProps {
  open: boolean;
  onClose: () => void;
  onOpenStatisticsModal: () => void;
}

export default function Statistics({ open, onClose }: StatisticsModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const user = useAppSelector((state) => state.user.user);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const dispatch = useAppDispatch();

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleProfileClose = () => {
    setIsEditing(false);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  const handleUpload = async () => {
    if (!selectedFile || !user) {
      return;
    }

    const formData = new FormData();
    formData.append("avatar", selectedFile);
    formData.append("username", user.username);
    formData.append("email", user.email);

    try {
      await dispatch(
        updateUserThunk({ id: user.id, updateData: formData })
      ).unwrap();

      onClose();
    } catch (error) {
      console.error("Upload error:", error);
    }
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
              <input type="file" accept="image/*" onChange={handleFileChange} />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 2,
                  width: "100%",
                  background: "#E1CC4F",
                  color: "#343E40",
                }}
                onClick={handleUpload}
              >
                Загрузить аватар
              </Button>
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
          <Profile onClose={handleProfileClose} user={user!} />
        )}
      </Box>
    </Modal>
  );
}