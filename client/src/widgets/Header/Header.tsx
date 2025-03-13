import { JSX, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../shared/hooks/reduxHooks';
import { selectUser } from '../../entities/user/slice/userSlice';
import Logo from './Logo';
import './Header.css';
import { UserAvatar } from '../../entities/user/ui/UserAvatar/UserAvatar';
import { signOutThunk } from "../../entities/user/api/index";
import LoginModal from '../../features/modal/LoginModal';
import RegisterModal from '../../features/modal/RegisterModal';
import { showAlert } from '@/features/alerts';

//interface HeaderProps {}

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
      dispatch(showAlert({ message: "Вы успешно вышли,до встречи 👋",status:'success' }));
    };

    const openLoginModal = () => setIsLoginModalOpen(true);
    const closeLoginModal = () => setIsLoginModalOpen(false);

    const openRegisterModal = () => setIsRegisterModalOpen(true);
    const closeRegisterModal = () => setIsRegisterModalOpen(false);


    return (
        <header className="header">
            <div className="header-content">
                <Logo className="header-logo" />

                {user ? (
                    <div className="user-actions">
                        <button className="rules-button" onClick={toggleRulesModal}>
                            ?
                        </button>
                        <UserAvatar user={user} />
                        <button className="logout-button" onClick={handleLogout}>
                            Выйти
                        </button>
                    </div>
                ) : (
                    <div className="auth-buttons">
                        <button className="auth-button" onClick={openLoginModal}>
                            Войти
                        </button>
                        <button className="auth-button" onClick={openRegisterModal}>
                            Регистрация
                        </button>
                    </div>
                )}
            </div>

            {isRulesModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={toggleRulesModal}>
                            &times;
                        </span>
                        <h2>Правила игры</h2>
                        <p>Количество игроков: ...</p>
                        <p>КОличество фаз: ...</p>
                    </div>
                </div>
            )}

            <LoginModal open={isLoginModalOpen} onClose={closeLoginModal} />
            <RegisterModal open={isRegisterModalOpen} onClose={closeRegisterModal} />
        </header>
    );
}