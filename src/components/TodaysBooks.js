import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './css/TodaysBooks.module.css';
const TodaysBooks = ({ contentObj }) => {
  const navigate = useNavigate();

  const onClick = () => {
    const bookinfo = {
      ...contentObj,
    };
    try {
      navigate('/search/bookinfo', {
        state: {
          bookinfo,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container} onClick={onClick}>
      <img src={contentObj.cover} className={styles.img} />
      <span className={styles.title}>{contentObj.title}</span>
    </div>
  );
};
export default TodaysBooks;
