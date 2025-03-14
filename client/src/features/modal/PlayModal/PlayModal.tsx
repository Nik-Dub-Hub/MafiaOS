import React from 'react';
import styles from './PlayModal.module.css';
import { useNavigate } from 'react-router';
import { CLIENT_ROUTES } from '@/shared/enums/clientRoutes';

interface PlayModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const PlayModal: React.FC<PlayModalProps> = ({ isOpen, onClose }) => {
    const navigate = useNavigate()
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
                <button className={styles.playButton} onClick={()=> navigate(CLIENT_ROUTES.CHOICE_PAGE)}>
                    Присоединиться к игре
                </button>
            </div>
        </div>
    );
};

export default PlayModal;