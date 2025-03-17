import Logo from "./Logo";
import styles from "./Header.module.css";
import { JSX } from "react";
import { useNavigate } from "react-router";
import { CLIENT_ROUTES } from "@/shared/enums/clientRoutes";

export default function Header(): JSX.Element {
 const navigate = useNavigate()
  return (
    <header className={styles.header}>
      <div className={styles.headerContent} onClick={() => navigate(CLIENT_ROUTES.MAIN)}>
        <Logo className="header-logo" />
      </div>
    </header>
  );
}
