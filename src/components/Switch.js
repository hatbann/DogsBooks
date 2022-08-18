import React from 'react';
import styles from './css/Switch.module.css';

const Switch = ({ onClick, options }) => {
  return (
    <div className={styles.switch}>
      {options.map((option) => {
        return (
          <div onClick={onClick} className={styles.btn}>
            {option.label}
          </div>
        );
      })}
    </div>
  );
};

export default Switch;
