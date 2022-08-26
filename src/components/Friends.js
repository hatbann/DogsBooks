import React from 'react';
import styles from '../routes/css/Mypage.module.css';

const Friends = (props) => {
  return (
    <div>
      <ul className={styles.frined_list}>
        <li className={styles.friend}>
          <div className={styles.friend_profile}>
            {' '}
            <img
              src={require('../assets/profile11.jpg')}
              className={styles.friend_img}
            />
            <span>조혜빈</span>
          </div>

          <div>
            <a
              href="http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&linkClass=01&barcode=9791161571188"
              className={styles.book}
            >
              {' '}
              <img src="http://image.kyobobook.co.kr/images/book/large/379/l9791161571379.jpg" />
            </a>
            <a
              href="http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&linkClass=01&barcode=9791160408331"
              className={styles.book}
            >
              {' '}
              <img src="http://image.kyobobook.co.kr/images/book/large/331/l9791160408331.jpg" />
            </a>
            <a
              href="http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&linkClass=01&barcode=9791191043976"
              className={styles.book}
            >
              {' '}
              <img src="http://image.kyobobook.co.kr/images/book/large/976/l9791191043976.jpg" />
            </a>
          </div>
        </li>
        <li className={styles.friend}>
          <div className={styles.friend_profile}>
            {' '}
            <img
              src={require('../assets/profile12.png')}
              className={styles.friend_img}
            />
            <span>이채연</span>
          </div>

          <div>
            <a
              href="http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&linkClass=01&barcode=9788936438753"
              className={styles.book}
            >
              {' '}
              <img src="http://image.kyobobook.co.kr/images/book/large/753/l9788936438753.jpg" />
            </a>
            <a
              href="http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&linkClass=01&barcode=9788937461033"
              className={styles.book}
            >
              {' '}
              <img src="http://image.kyobobook.co.kr/images/book/large/033/l9788937461033.jpg" />
            </a>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Friends;
