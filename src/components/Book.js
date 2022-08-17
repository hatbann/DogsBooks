import React from 'react';

import styles from '../routes/css/Library.module.css';

const Book = ({ bookInfo }) => {
  return (
    <div className={styles.bookContainer}>
      <li>
        <img className={styles.bookImg} src={bookInfo.uri} />
        <div className={styles.detail}>
          {' '}
          <span className={styles.title}>{bookInfo.title}</span>
          <div className={styles.detailInfo}>
            {bookInfo.date}/{bookInfo.star}/{bookInfo.recommend}
          </div>
        </div>
      </li>
    </div>
  );
};

export default Book;
