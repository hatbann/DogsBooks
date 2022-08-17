import React from 'react';
import styles from './css/Switch.module.css';

const Switch = ({ onClick, options }) => {
  return (
    <div className={styles.switch}>
      <div onClick={onClick} className={styles.btn}>
        {options[0].label}
      </div>
      <div onClick={onClick} className={styles.btn}>
        {options[1].label}
      </div>
      <div onClick={onClick} className={styles.btn}>
        {options[2].label}
      </div>
    </div>
  );
};

export default Switch;
