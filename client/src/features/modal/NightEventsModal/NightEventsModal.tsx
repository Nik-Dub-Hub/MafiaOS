import React from 'react';
import styles from './NightEventsModal.module.css';

interface NightEventsModalProps {
    isOpen: boolean;
    onClose: () => void;
    events: string[];
}

const NightEventsModal: React.FC<NightEventsModalProps> = ({ isOpen, onClose, events }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <span className={styles.closeButton} onClick={onClose}>
                    &times;
                </span>
                <h2 className={styles.modalTitle}>События ночи</h2>
                <ul className={styles.eventList}>
                    {events.map((event, index) => (
                        <li key={index}>{event}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default NightEventsModal;