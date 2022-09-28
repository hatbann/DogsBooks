import React from 'react';

import styles from './css/Top2.module.css';



const Top2 = ({ location }) => {
  return (
    <div className={styles.container}>
    <div className={styles.content}>
      <img
          src={require("../assets/logo.png")}
          className={styles.img}
        ></img>
    </div></div>
  );
};

export default Top2;
