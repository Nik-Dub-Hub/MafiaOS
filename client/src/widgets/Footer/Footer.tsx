import { signOutThunk, UserAvatar } from "@/entities/user";
import { showAlert } from "@/features/alerts";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { useState } from "react";
import styles from "./Footer.module.css"; 
import LoginModal from "@/features/modal/LoginModal/LoginModal";
import RegisterModal from "@/features/modal/RegisterModal/RegisterModal";
import { useNavigate } from "react-router";
import { CLIENT_ROUTES } from "@/shared/enums/clientRoutes";

export default function Footer() {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const toggleRulesModal = () => {
    setIsRulesModalOpen(!isRulesModalOpen);
  };

  const handleLogout = () => {
    dispatch(signOutThunk());
    dispatch(
      showAlert({
        message: "Вы успешно вышли, до встречи👋",
        status: "success",
      })
    )
    navigate(CLIENT_ROUTES.MAIN)
  };

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const openRegisterModal = () => setIsRegisterModalOpen(true);
  const closeRegisterModal = () => setIsRegisterModalOpen(false);

  return (
    <footer className={styles.footer}>
      {user ? (
        <div className={styles.userActions}>
          <div className={styles.iconContainer}>
            <img
              src="/public/question.svg"
              alt="question"
              className={styles.rulesButton}
              onClick={toggleRulesModal}
            />
            <span className={styles.iconText}>rules</span>
          </div>
          <div className={styles.iconContainer}>
            <UserAvatar user={user} />
            <span className={styles.iconText}>profile</span>
          </div>
          <div className={styles.iconContainer}>
            <img
              src="/public/logout.svg"
              alt="logout"
              className={styles.logoutButton}
              onClick={handleLogout}
            />
            <span className={styles.iconText}>sign out</span>
          </div>
        </div>
      ) : (
        <div className={styles.authButtons}>
          <div className={styles.iconContainer}>
            <img
              src="/public/login.svg"
              alt="login"
              className={styles.authButton}
              onClick={openLoginModal}
            />
            <span className={styles.iconText}>sign in</span>
          </div>
        </div>
      )}

      {isRulesModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.closeButton} onClick={toggleRulesModal}>
              &times;
            </span>
            <h2>Правила игры</h2>
            <p>Количество игроков: ...</p>
            <p>Количество фаз: ...</p>
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
    </footer>
  );
}
