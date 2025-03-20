import React from "react";
import styles from "./UserAvatar.module.css";
import { IUserForProps } from "../../model";

type Props = {
  user: IUserForProps;
};

export const UserAvatar = React.memo(
  function UserAvatar({ user }: Props) {
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
  },
  (prevProps, nextProps) => {
    return (
      prevProps.user.id === nextProps.user.id &&
      prevProps.user.img === nextProps.user.img
    );
  }
);
