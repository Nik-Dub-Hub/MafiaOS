import { JSX, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../shared/hooks/reduxHooks';
import { selectUser } from '../../entities/user/slice/userSlice';
import Logo from './Logo';
import styles from'./Header.module.css';
import { UserAvatar } from '../../entities/user/ui/UserAvatar/UserAvatar';
import { signOutThunk } from "../../entities/user/api/index";
import LoginModal from '../../features/modal/LoginModal';
import RegisterModal from '../../features/modal/RegisterModal';
import { showAlert } from '@/features/alerts';


export default function Header(): JSX.Element {
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();

    const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

    const toggleRulesModal = () => {
        setIsRulesModalOpen(!isRulesModalOpen);
    };

    const handleLogout = () => {
      dispatch(signOutThunk());
      dispatch(showAlert({ message: "Вы успешно вышли,до встречи👋" ,status:'success'}));
    };

    const openLoginModal = () => setIsLoginModalOpen(true);
    const closeLoginModal = () => setIsLoginModalOpen(false);

    const openRegisterModal = () => setIsRegisterModalOpen(true);
    const closeRegisterModal = () => setIsRegisterModalOpen(false);


    return (
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Logo className="header-logo" />

          {user ? (
            <div className={styles.userActions}>
              <img
                src="/public/question.svg"
                alt="question"
                className={styles.rulesButton}
                onClick={toggleRulesModal}
              />
              <UserAvatar user={user} />
              <img
                src="/public/logout.svg"
                alt="logout"
                className={styles.logoutButton}
                onClick={handleLogout}
              />
            </div>
          ) : (
            <div className={styles.authButtons}>
                <img
                  src="/public/login.svg"
                  alt="login"
                  className={styles.authButton}
                  onClick={openLoginModal}
                />
            </div>
          )}
        </div>

        {isRulesModalOpen && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <span className={styles.closeButton} onClick={toggleRulesModal}>
                &times;
              </span>
              <h2>Правила игры</h2>
              <p>Количество игроков: ...</p>
              <p>КОличество фаз: ...</p>
            </div>
          </div>
        )}

        <LoginModal
          open={isLoginModalOpen}
          onClose={closeLoginModal}
          onOpenRegisterModal={openRegisterModal}
        />
        <RegisterModal
          open={isRegisterModalOpen}
          onClose={closeRegisterModal}
          openLoginModal={openLoginModal}
        />
      </header>
    );
}