import Logo from "./Logo";
import styles from "./Header.module.css";
import { JSX } from "react";

export default function Header(): JSX.Element {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Logo className="header-logo" />
      </div>
    </header>
  );
}
