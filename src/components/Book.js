import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '../routes/css/Library.module.css';

const Book = ({ bookInfo }) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate('/libary/reports', { state: bookInfo });
  };
  console.log(bookInfo);
  return (
    <div>
      <li className={styles.bookContainer} onClick={onClick}>
        <img className={styles.bookImg} src={bookInfo.uri} />
        <div className={styles.detail}>
          {' '}
          <div style={{ marginBottom: '8px' }}>
            {' '}
            <span className={styles.title}>{bookInfo.title}</span>
            <span className={styles.author}>{bookInfo.author}</span>
          </div>
          <div className={styles.detailInfo}>
            {bookInfo.createdAt}/{bookInfo.star}/{bookInfo.recommend}
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
