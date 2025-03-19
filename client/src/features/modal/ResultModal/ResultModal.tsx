import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ResultModal.module.css";
import { IPlayer } from "@/entities/player";

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  winner: "mafia" | "civilians" | null;
  player: IPlayer;
}

const ResultModal: React.FC<ResultModalProps> = ({
  isOpen,
  onClose,
  winner,
  player,
}) => {
  const navigate = useNavigate();

  if (!isOpen) {
    return null;
  }

  let modalClass = styles.defaultModal;
  let message = "Игра завершена";

  if (winner) {
    modalClass =
      winner === "mafia" ? styles.mafiaWinModal : styles.civilianWinModal;
    message =
      winner === "mafia" ? "Мафия победила!" : "Мирные жители победили!";
  } else if (!player.isAlive) {
    modalClass = styles.playerDeadModal;
    message = "Тебя прикончили";
  }

  const handleGoHome = () => {
    navigate("/");
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={`${styles.modalContent} ${modalClass}`}>
        <span className={styles.closeButton} onClick={onClose}>
          &times;
        </span>
        <h2 className={styles.modalTitle}>Статус игры</h2>
        <p className={styles.modalMessage}>{message}</p>
        <button className={styles.homeButton} onClick={handleGoHome}>
          На главную
        </button>
      </div>
    </div>
  );
};

export default ResultModal;
