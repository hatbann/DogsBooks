import React from 'react';

import styles from './css/Content.module.css';
const Content = ({ contentObj }) => {
  return (
    <div className={styles.container}>
      <img src={contentObj.uri} className={styles.img} />
      <span className={styles.title}>{contentObj.title}</span>
    </div>
  );
};

export default Content;
