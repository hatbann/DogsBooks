import React from 'react';

import styles from './css/TodaysBooks.module.css';
const TodaysBooks = ({ contentObj }) => {
  return (
    <div className={styles.container}>
      <img src={contentObj.uri} className={styles.img} />
      <span className={styles.title}>{contentObj.title}</span>
      <p className={styles.content}>{contentObj.content}</p>
    </div>
  );
};
export default TodaysBooks;
