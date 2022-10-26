import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './css/BookReports.module.css';

const BookReports = () => {
  const bookreports = useLocation().state;
  console.log(bookreports);
  const time = String(bookreports.createdAt).split(' ');
  const timestr = `${time[3]}/${time[1]}/${time[2]}/${time[0]}`;
  return (
    <div className={styles.reportContainer}>
      <div className={styles.reportTop}>
        <img src={bookreports.bookimg}></img>
        <section>
          <h1
            className={
              bookreports.title.length > 15
                ? `${styles.longtitle}`
                : `${styles.shorttitle}`
            }
          >
            {bookreports.title}
          </h1>
          <span>{bookreports.author}</span>
          <span>날짜 : {timestr}</span>
          <span>별점 : {bookreports.star}</span>
        </section>
      </div>
      <section className={styles.review}>
        <p>{bookreports.text}</p>
      </section>
    </div>
  );
};

export default BookReports;
