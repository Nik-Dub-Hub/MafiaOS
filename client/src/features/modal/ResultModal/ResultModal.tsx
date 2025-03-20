import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ResultModal.module.css";
import { IPlayer } from "@/entities/player";

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  winner: "mafia" | "civilians" | "";
  player: IPlayer;
}

const ResultModal: React.FC<ResultModalProps> = ({
  isOpen,
  onClose,
  winner,
  player,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen) {
      timer = setTimeout(() => {
        handleGoHome();
      }, 20000); // 20 секунд
    }
    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleGoHome = () => {
    navigate("/");
    onClose();
  };

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

  return (
    <div className={styles.modalOverlay}>
      <div className={`${styles.modalContent} ${modalClass}`}>
        <span className={styles.closeButton} onClick={handleGoHome}>
          &times;
        </span>
        <h2 className={styles.modalTitle}>Конец игры</h2>
        <p className={styles.modalMessage}>{message}</p>
        <button className={styles.homeButton} onClick={handleGoHome}>
          На главную
        </button>
      </div>
    </div>
  );
};

export default ResultModal;
