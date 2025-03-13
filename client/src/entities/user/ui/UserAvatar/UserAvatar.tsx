import { IUser } from "../../model";
import styles from "./UserAvatar.module.css";

type Props = {
  user: IUser;
};

export function UserAvatar({ user }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.circle}>
        <img className={styles.avatar} src="/user.jpg" alt={user.username} />
      </div>
      <span>{user.username}</span>
    </div>
  );
}