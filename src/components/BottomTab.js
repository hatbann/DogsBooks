import React from 'react';
import { Link } from 'react-router-dom';

import styles from './css/BottomTab.module.css';

const BottomTab = ({ scrollactive }) => {
  return (
    <div className={styles.container}>
      <div className={scrollactive ? 'BottomTab fixed' : 'BottomTab'}>
        <Link to="/">
          <span className={styles.tab}>Home</span>
        </Link>
        <Link to="/library">
          <span className={styles.tab}>Library</span>
        </Link>
        <Link to="/bookneighbor">
          <span className={styles.tab}>책이웃</span>
        </Link>
        <Link to="/mypage">
          <span className={styles.tab}>Mypage</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomTab;
