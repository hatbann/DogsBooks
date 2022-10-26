import React from 'react';
import { Link } from 'react-router-dom';

import styles from './css/BottomTab.module.css';

const BottomTab = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.bottomTabs}>
        <Link to="/">
          <span className={styles.tab}>홈</span>
        </Link>
        <Link to="/library">
          <span className={styles.tab}>북스</span>
        </Link>
        <Link to="/bookneighbor">
          <span className={styles.tab}>이웃도서관</span>
        </Link>
        <Link to="/mypage">
          <span className={styles.tab}>마이페이지</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomTab;
