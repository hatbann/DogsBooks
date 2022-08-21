import React, { useState } from 'react';
import Top from '../components/Top';
import styles from './css/Mypage.module.css';
import Switch from '../components/Switch';
import Profile from '../components/Profile';
import Friend from '../components/Friends';
import LendList from '../components/LendList';

const options = [
  {
    label: '프로필',
    page: <Profile />,
    id: 0,
  },
  {
    label: '친구목록',
    page: <Friend />,
    id: 1,
  },
  {
    label: '빌려준 책 목록',
    page: <LendList />,
    id: 2,
  },
];

const Mypage = (props) => {
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
    <div>
      <Top location={'설정'} />
      <div className={styles.content}>
        {' '}
        <Switch onClick={onClick} options={options} />
        <div>
          {options.map((option) => {
            if (option.id === pageNum) {
              return <div key={option.id}>{option.page}</div>;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Mypage;
