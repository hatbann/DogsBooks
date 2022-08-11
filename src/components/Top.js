import React from 'react';

import styles from './css/Top.module.css';

const Top = ({ location }) => {
  return (
    <div className={styles.container}>
      <span className={styles.content}>{location}</span>
    </div>
  );
};

export default Top;
