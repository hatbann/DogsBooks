import React from 'react';

import styles from '../routes/css/Library.module.css';

const Book = ({ bookInfo }) => {
  return (
    <div>
      <li className={styles.bookContainer}>
        <img className={styles.bookImg} src={bookInfo.uri} />
        <div className={styles.detail}>
          {' '}
          <div style={{ marginBottom: '8px' }}>
            {' '}
            <span className={styles.title}>{bookInfo.title}</span>
            <span className={styles.author}>{bookInfo.author}</span>
          </div>
          <div className={styles.detailInfo}>
            {bookInfo.date}/{bookInfo.star}/{bookInfo.recommend}
          </div>
          <div>
            <span className={styles.BookReportTitle}>
              {bookInfo.BookReportTitle}
            </span>
          </div>
        </div>
      </li>
    </div>
  );
};

export default Book;
