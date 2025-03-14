import React from 'react';
import styles from './PlayModal.module.css';

interface PlayModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const PlayModal: React.FC<PlayModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <span className={styles.closeButton} onClick={onClose}>
                    &times;
                </span>
                <button className={styles.playButton}>
                    Создать игру
                </button>
                <button className={styles.playButton}>
                    Присоединиться к игре
                </button>
            </div>
        </div>
    );
};

export default PlayModal;