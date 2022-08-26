import React from 'react';
import styles from '../routes/css/Mypage.module.css';

const LendList = (props) => {
  return (
    <div className={styles.lendBooks}>
      <img
        src="http://image.kyobobook.co.kr/images/book/large/033/l9788937461033.jpg"
        className={styles.lendBook}
      />
      <img
        src="http://image.kyobobook.co.kr/images/book/large/909/l9791165341909.jpg"
        className={styles.lendBook}
      />
      <img
        src="http://image.kyobobook.co.kr/images/book/large/485/l9788954687485.jpg"
        className={styles.lendBook}
      />
      <img
        src="http://image.kyobobook.co.kr/images/book/large/518/l9791191043518.jpg"
        className={styles.lendBook}
      />
      <img
        src="http://image.kyobobook.co.kr/images/book/large/194/l9788972756194.jpg"
        className={styles.lendBook}
      />
    </div>
  );
};

export default LendList;
