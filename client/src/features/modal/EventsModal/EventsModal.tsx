import React, { useEffect } from "react";
import styles from "./EventsModal.module.css";
import { IGame } from "@/entities/game";

interface EventsModalProps {
  isOpen: boolean;
  onClose: () => void;
  DidPlayer: string;
  game: IGame;
}

const EventsModal: React.FC<EventsModalProps> = ({
  isOpen,
  onClose,
  DidPlayer,
  game,
}) => {
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen) {
      timer = setTimeout(() => {
        onClose();
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const getModalTitle = () => {
    if (game.phase === "Ночное голосование") {
      return "События ночи";
    } else if (game.phase === "Дневное голосование") {
      return "События дня";
    }
    return "События";
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <span className={styles.closeButton} onClick={onClose}>
          &times;
        </span>
        <h2 className={styles.modalTitle}>{getModalTitle()}</h2>
        <ul className={styles.eventList}>Был убит {DidPlayer}</ul>
      </div>
    </div>
  );
};

export default EventsModal;
