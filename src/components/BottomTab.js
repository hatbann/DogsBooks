import React from 'react';
import { useState } from 'react';
import Home from '../routes/Home';
import BookNeighbor from '../routes/BookNeighbor';
import Library from '../routes/Library';
import Mypage from '../routes/Mypage';

import styles from './css/BottomTab.module.css';
const Components = {
  0: { page: <Home />, pagename: '홈' },
  1: { page: <Library />, pagename: '도서관' },
  2: { page: <BookNeighbor />, pagename: '책이웃' },
  3: { page: <Mypage />, pagename: '마이페이지' },
};

const BottomTab = (props) => {
  const [page, setPage] = useState(0);

  const onClick = (id) => {
    setPage(id);
    console.log(id);
  };

  return (
    <div className={styles.container}>
      <div className={styles.pagename}>{Components[page].pagename}</div>
      <div className={styles.currentPage}>{Components[page].page}</div>
      <div className={styles.bar_line}></div>
      <div className={styles.bottomTabs}>
        <span onClick={() => onClick(0)} className={styles.tab}>
          Home
        </span>
        <span onClick={() => onClick(1)} className={styles.tab}>
          Library
        </span>
        <span onClick={() => onClick(2)} className={styles.tab}>
          책이웃
        </span>
        <span onClick={() => onClick(3)} className={styles.tab}>
          Mypage
        </span>
      </div>
    </div>
  );
};

export default BottomTab;
