import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ResultModal.module.css';

interface ResultModalProps {
    isOpen: boolean;
    onClose: () => void;
    winner: 'mafia' | 'civilians';
}

const ResultModal: React.FC<ResultModalProps> = ({ isOpen, onClose, winner }) => {
    const navigate = useNavigate();

    if (!isOpen) {
        return null;
    }

    const modalClass = winner === 'mafia' ? styles.mafiaWinModal : styles.civilianWinModal;
    const message = winner === 'mafia' ? 'Мафия победила!' : 'Мирные жители победили!';

    const handleGoHome = () => {
        navigate('/');
        onClose();
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={`${styles.modalContent} ${modalClass}`}>
                <span className={styles.closeButton} onClick={onClose}>
                    &times;
                </span>
                <h2 className={styles.modalTitle}>Результаты игры</h2>
                <p className={styles.modalMessage}>{message}</p>
                <button className={styles.homeButton} onClick={handleGoHome}>
                    На главную
                </button>
            </div>
        </div>
    );
};

export default ResultModal;