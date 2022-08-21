import React from 'react';
import userImg from '../assets/img1.png';
import styles from '../routes/css/Mypage.module.css';
import ProgressBar from '@ramonak/react-progress-bar';

const user = {
  img: userImg,
  name: ' 조선영',
  level: 13,
  percentage: 70,
};

const Profile = (props) => {
  return (
    <div className={styles.content}>
      <div className={styles.profile}>
        <img src={user.img} className={styles.profileImg} />
        <div className={styles.profile_detail}>
          <div style={{ marginBottom: '7px' }}>
            {' '}
            <span className={styles.name}>{user.name}</span>
            <span className={styles.level}>{user.level} Lv</span>
          </div>
          <div>
            <ProgressBar
              completed={user.percentage}
              bgColor="#9bffe1"
              width="55vw"
              height="3vw"
              labelSize="10px"
              labelColor="#474747"
            />
          </div>
        </div>
      </div>
      <div className={styles.settings}>
        <div>프로필</div>
        <div>Dogs</div>
        <div>동네 설정</div>
        <div>로그아웃</div>
      </div>
    </div>
  );
};

export default Profile;
