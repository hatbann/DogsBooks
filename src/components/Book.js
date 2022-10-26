import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '../routes/css/Library.module.css';

const Book = ({ bookInfo }) => {
  const navigate = useNavigate();
  const time = String(bookInfo.createdAt).split(' ');
  const timestr = `${time[3]}/${time[1]}/${time[2]}/${time[0]}`;

  const onClick = () => {
    navigate('/libary/reports', { state: bookInfo });
  };
  console.log(bookInfo);
  return (

  
    <div className={styles.settings}>

    <div className={styles.setting}>
      내 독스 </div>

    <div>
      <li className={styles.bookContainer} onClick={onClick}>
        <img className={styles.bookImg} src={bookInfo.bookimg} />
        <div className={styles.detail}>
          {' '}
          <div style={{ marginBottom: '8px' }}>
            {' '}
            <span className={styles.title}>{bookInfo.title}</span>
            <span className={styles.author}>{bookInfo.author}</span>
          </div>
          <div className={styles.detailInfo}>
            <div> {timestr}</div>
            <div>별점 : {bookInfo.star}</div>
          </div>
          <div>
            <span className={styles.BookReportTitle}>
              {bookInfo.BookReportTitle}
            </span>
          </div>
        </div>
      </li>
    </div> </div>
  );
};

export default Book;
