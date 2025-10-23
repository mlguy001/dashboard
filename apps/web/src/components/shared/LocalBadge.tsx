import React from 'react';
import styles from './LocalBadge.module.css';

interface LocalBadgeProps {
  isLocal: boolean;
  isOnline?: boolean;
}

const LocalBadge: React.FC<LocalBadgeProps> = ({ isLocal, isOnline = true }) => {
  if (isLocal) {
    return <span className={`${styles.badge} ${styles.local}`}>Local</span>;
  }

  // if (!isOnline) {
  //   return <span className={`${styles.badge} ${styles.offline}`}>Offline</span>;
  // }

  // return <span className={`${styles.badge} ${styles.local}`}>Local</span>;
};

export default LocalBadge;
