import styles from "./UserAvatar.module.css";



export function UserAvatar() {
  return (
    <div className={styles.container}>
      <div className={styles.circle}>
        <img className={styles.avatar} src="/user.jpg" alt='avatar' />
      </div>
    </div>
  );
}