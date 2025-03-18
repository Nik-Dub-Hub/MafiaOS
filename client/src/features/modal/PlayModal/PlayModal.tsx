import React, { useId } from "react";
import styles from "./PlayModal.module.css";
import { useNavigate } from "react-router";
import { CLIENT_ROUTES } from "@/shared/enums/clientRoutes";
import { addGameThunk } from "@/entities/game";
import { useAppDispatch } from "@/shared/hooks/reduxHooks";
import { showAlert } from "@/features/alerts";

interface PlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PlayModal: React.FC<PlayModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const gameId = useId();
  if (!isOpen) {
    return null;
  }
  const handleStartGame = async () => {
    try {
      const response = await dispatch(
        addGameThunk({ key: `${gameId}`, discussionTime: 60 })
      );

      if (response.payload?.error) {
        dispatch(showAlert({ message: "Игра не создана", status: "error" }));
      }

      if (response.payload?.statusCode === 201) {
        navigate(`${CLIENT_ROUTES.GAME_ONE}/${response.payload.data?.id}`);
      }
    } catch {
      dispatch(
        showAlert({
          message: "Игра не создана по причине сервера",
          status: "error",
        })
      );
    }
  };
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <span className={styles.closeButton} onClick={onClose}>
          &times;
        </span>
        <button onClick={handleStartGame} className={styles.playButton}>
          Создать игру
        </button>
        <button
          className={styles.playButton}
          onClick={() => navigate(CLIENT_ROUTES.CHOICE_PAGE)}
        >
          Присоединиться к игре
        </button>
      </div>
    </div>
  );
};

export default PlayModal;
