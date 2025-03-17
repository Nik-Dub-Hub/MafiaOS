import { signOutThunk, UserAvatar } from "@/entities/user";
import { showAlert } from "@/features/alerts";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { useState } from "react";
import styles from "./Footer.module.css";
import LoginModal from "@/features/modal/LoginModal/LoginModal";
import RegisterModal from "@/features/modal/RegisterModal/RegisterModal";
import { useNavigate } from "react-router";
import { CLIENT_ROUTES } from "@/shared/enums/clientRoutes";
import Statistics from "../../features/modal/StatisticsModal/Statistics";
import RulesGame from "@/features/modal/RulesModal/Rules";

export default function Footer() {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);

  const toggleRulesModal = () => {
    setIsRulesModalOpen((prev) => !prev);
  };
  const toggleStatsModal = () => setIsStatsModalOpen((prev) => !prev);
  const toggleLoginModal = () => setIsLoginModalOpen((prev) => !prev);
  const toggleRegisterModal = () => setIsRegisterModalOpen((prev) => !prev);

  const handleLogout = () => {
    dispatch(signOutThunk());
    dispatch(
      showAlert({
        message: "Вы успешно вышли, до встречи👋",
        status: "success",
      })
    );
    navigate(CLIENT_ROUTES.MAIN);
  };

  return (
    <footer className={styles.footer}>
      {user ? (
        <div className={styles.userActions}>
          <div className={styles.iconContainer}onClick={() => setIsRulesModalOpen(true)}>
            <img
              src="/question.svg"
              alt="question"
              className={styles.rulesButton}
              
            />
            <span className={styles.iconText}>rules</span>
          </div>
          <div
            className={styles.iconContainer}
            onClick={() => setIsStatsModalOpen(true)}
          >
            <UserAvatar />
            <span className={styles.iconText}>{user.username}</span>
          </div>
          <div className={styles.iconContainer}>
            <img
              src="/logout.svg"
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
              src="/login.svg"
              alt="login"
              className={styles.authButton}
              onClick={toggleLoginModal}
            />
            <span className={styles.iconText}>sign in</span>
          </div>
        </div>
      )}
      <RulesGame
        open={isRulesModalOpen}
        onClose={toggleRulesModal}
        onOpenStatisticsModal={toggleRulesModal}
      />
      <Statistics
        open={isStatsModalOpen}
        onClose={toggleStatsModal}
        onOpenStatisticsModal={toggleStatsModal}
      />
      <LoginModal
        open={isLoginModalOpen}
        onClose={toggleLoginModal}
        onOpenRegisterModal={toggleRegisterModal}
      />
      <RegisterModal
        open={isRegisterModalOpen}
        onClose={toggleRegisterModal}
        openLoginModal={toggleLoginModal}
      />
    </footer>
  );
}
