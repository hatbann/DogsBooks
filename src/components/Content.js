import React from 'react';

import styles from './css/Content.module.css';
const Content = ({ contentObj }) => {
  return (
    <div className={styles.container}>
      <img src={contentObj.uri} className={styles.img} />
    </div>
  );
};

export default Content;
