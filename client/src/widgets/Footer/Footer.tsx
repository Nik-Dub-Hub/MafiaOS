import { signOutThunk, UserAvatar } from "@/entities/user";
import { showAlert } from "@/features/alerts";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import { useState } from "react";
import styles from "./Footer.module.css";
import LoginModal from "@/features/modal/LoginModal/LoginModal";
import RegisterModal from "@/features/modal/RegisterModal/RegisterModal";

export default function Footer() {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

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
    );
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
            <h2>Правила игры Мафия</h2>
            <p className="intro">
              Настоящая история начинается здесь...
            </p>
            <h3>Участники</h3>
            <ul className="participants">
              <li>
                <strong>Доктор:</strong>
                каждый вечер может вылечить одного игрока, спасая его от верной гибели.
              </li>
              <li>
                <strong>Мафия:</strong> каждую ночь собирается на тайной встрече,
                чтобы решить, чья жизнь будет прервана. Их задача – оставаться в
                тени и устранить всех тех, кто мешает их планам.
              </li>
              <li>
                <strong>Проститутка:</strong> женщина, которой не страшен ночной
                город. Она может помочь мирным, но в руках мафии её обаяние
                становится оружием против правосудия.
              </li>
              <li>
                <strong>Мирный житель:</strong> простой житель города, который
                хочет лишь одного – жить спокойно. Эти люди должны доверять
                своему чутью и вывести мафию на чистую воду.
              </li>
            </ul>
            <h3>Как проходит игра</h3>
            <h4>1 фаза. Наступает ночь и город запсыпает...</h4>
            <ul>
              <li>Мафия решает, кто никогда больше не увидит рассвет.</li>
              <li>Проститутка: кого пленят её чары этой ночью?"</li>
              <li>Но только доктор может спасти от пули мафии</li>
            </ul>
            <h4>2 фаза. Город просыпается.</h4>
            <p>
              Становистя ясно, кто не дожил до нового дня (или чудом был
              спасён). Нужно сделать выбор.
            </p>
            <p>
              Время обсуждения ограничено выбором участников. После этого игроки
              выносят свой вердикт.
            </p>
            <h4>3 фаза. Голосование – решающий момент</h4>
            <p>
              Игрок с наибольшим количеством голосов оказывается "ликвидирован".
              Только в конце игры откроется его роль. Возможно, вы избавились от
              мирного, а может, это был один из членов клана.
            </p>
            <h3>Завершение игры</h3>
            <p>
              Конец истории наступит либо с победой мирных жителей, либо мафии.
            </p>

            <p className="final-note">
              Играйте стильно, как настоящие гангстеры!
            </p>
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
