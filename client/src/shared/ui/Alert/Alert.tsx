import React from 'react';
import styles from './Alert.module.css';

interface AlertProps {
  type: 'success' | 'error' | 'warning';
  message: string;
}

export const Alert: React.FC<AlertProps> = ({ type, message }) => {
  const alertClass = `${styles.alert} ${styles[type]}`;

  return (
    <div className={alertClass}>
      {message}
    </div>
  );
};