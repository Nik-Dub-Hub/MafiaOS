import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../shared/hooks/reduxHooks';
import { updateUserThunk } from '@/entities/user';
import { selectUser} from '@/entities/user/slice/userSlice';
import styles from './ModalProfile.module.css';
import { Alert } from '../../shared/ui/Alert/Alert';
import { reformatId } from '../../shared/lib/reformatId'; 

interface ModalProfileProps {
    isOpen: boolean;
    onClose: () => void;
}

const ModalProfile: React.FC<ModalProfileProps> = ({ isOpen, onClose }) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const [isEditNameVisible, setIsEditNameVisible] = useState(false);
    const [newUsername, setNewUsername] = useState('');
    const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
    const [alert, setAlert] = useState<{message:string,type:'success'|'error'|'warning'} | null>(null);


    const handleEditNameClick = () => {
        setIsEditNameVisible(true);
        setNewUsername(user?.username || '');
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewUsername(e.target.value);
    };

    const handleSaveName = async () => {
        if (!user?.id) {
            setAlert({message: 'User ID not found', type: 'error'});
            return;
        }

        if(newUsername.trim() === ''){
            setAlert({message: 'Username can not be empty', type:'error'});
            return;
        }

        const userId = reformatId(user.id);
        console.log("Dispatching update with:", { id: userId, updateData: { username: newUsername } });
        try {
            await dispatch(updateUserThunk({ id: userId, updateData: { username: newUsername } })).unwrap();
            setIsEditNameVisible(false);
            setAlert({message: 'Username updated successfully', type: 'success'});
        } catch  {
          setAlert({message: 'Failed to update username', type: 'error'});
        }
    };

    const handleViewStatsClick = () => {
        setIsStatsModalOpen(true);
    };

    const handleCloseStatsModal = () => {
        setIsStatsModalOpen(false);
    };

    const renderStatsModal = () => {
      return (
        <div className={styles.modalOverlay}>
          <div className={styles.statsModal}>
            <span className={styles.closeButton} onClick={handleCloseStatsModal}>&times;</span>
            <h2>Статистика</h2>
            {user && (
              <div>
                <p>Civilian Count: {user.civilianCount}</p>
                <p>Mafia Count: {user.mafiaCount}</p>
                <p>Doctor Count: {user.doctorCount}</p>
                <p>Lady Count: {user.ladyCount}</p>
              </div>
            )}
          </div>
        </div>
      )
    }


    if (!isOpen || !user) {
        return null;
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <span className={styles.closeButton} onClick={onClose}>
                    &times;
                </span>
                <h2>Профиль</h2>
                {alert && <Alert type={alert.type} message={alert.message} />}
                <button className={styles.profileButton} onClick={handleEditNameClick}>
                    Изменить имя
                </button>
                {isEditNameVisible && (
                    <div className={styles.editNameSection}>
                        <input type="text" value={newUsername} onChange={handleNameChange} />
                        <button onClick={handleSaveName}>Подтвердить</button>
                    </div>
                )}
                <button className={styles.profileButton} disabled>
                    Изменить аватар (В разработке)
                </button>
                <button className={styles.profileButton} onClick={handleViewStatsClick}>
                    Посмотреть статистику
                </button>
                {isStatsModalOpen && renderStatsModal()}
            </div>
        </div>
    );
};

export default ModalProfile;