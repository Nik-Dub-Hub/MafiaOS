import Logo from "./Logo";
import styles from "./Header.module.css";
import { JSX } from "react";
import { useNavigate } from "react-router";
import { CLIENT_ROUTES } from "@/shared/enums/clientRoutes";
import { useParams } from "react-router-dom";
import { useAppSelector } from "@/shared/hooks/reduxHooks";

export default function Header(): JSX.Element {
  const navigate = useNavigate();
  const { id } = useParams();
  const game = useAppSelector((state) =>
    state.games.games.find((g) => g.id === +(id || 0))
  );

  const handleLogoClick = () => {
    if (!id || game?.phase === "Ожидание" || !game?.phase) {
      navigate(CLIENT_ROUTES.MAIN);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent} onClick={handleLogoClick}>
        <Logo className="header-logo" />
      </div>
    </header>
  );
}
