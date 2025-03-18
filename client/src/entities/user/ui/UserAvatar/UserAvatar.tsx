import styles from "./UserAvatar.module.css";
import { useAppSelector } from "@/shared/hooks/reduxHooks";

export function UserAvatar() {
  const user = useAppSelector((state) => state.user.user);

  return (
    <div className={styles.container}>
      <div className={styles.circle}>
        <img
          className={styles.avatar}
          src={
            user?.img
              ? `http://localhost:3000${user.img}?${new Date().getTime()}`
              : "/user.jpg"
          }
          alt="avatar"
        />
      </div>
    </div>
  );
}