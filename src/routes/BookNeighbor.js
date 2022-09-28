import React, { useState } from 'react';
import Top from '../components/Top';
import Top2 from '../components/Top2';
import styles from './css/BookNeighbor.module.css';
import Borrow from '../components/Borrow';
import Lend from '../components/Lend';
import Switch from '../components/Switch';

const options = [
  {
    label: '빌리기',
    page: <Borrow />,
    id: 0,
  },
  {
    label: '빌려준 목록',
    page: <Lend />,
    id: 1,
  },
];

const BookNeighbor = (props) => {
  const [pageNum, setPageNum] = useState(0);

  const onClick = (e) => {
    const text = e.target.textContent;
    options.map((option) => {
      if (option.label === text) {
        setPageNum(option.id);
      }
    });
  };

  return (
    <div className={styles.container}>
      <Top2/>
      <Top location={'책이웃'} />
      <div className={styles.top}>
        {' '}
        <div className={styles.location}>성산제2동</div>
        <div className={styles.switch}>
          <Switch
            onClick={onClick}
            options={options}
            className={styles.switch}
          />
        </div>
        <button className={styles.top_chat}>
          <img src="https://cdn-icons-png.flaticon.com/512/786/786205.png" />
        </button>
      </div>
      <div className={styles.page}>
        {options.map((option) => {
          if (option.id === pageNum) {
            return <div key={option.id}>{option.page}</div>;
          }
        })}
      </div>
    </div>
  );
};

export default BookNeighbor;
