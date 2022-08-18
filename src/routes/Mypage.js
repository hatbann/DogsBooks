import React from 'react';
import Top from '../components/Top';
import styles from './css/Mypage.module.css';

import userImg from '../assets/img1.png';

const user = {
  img: userImg,
};

const Mypage = (props) => {
  return (
    <div>
      <Top location={'마이페이지'} />
      <div className={styles.content}>
        <div>
          <img src={user.img} className={styles.profileImg} />
        </div>
      </div>
    </div>
  );
};

export default Mypage;
