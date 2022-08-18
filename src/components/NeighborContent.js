import React, { useState } from 'react';
import styles from '../routes/css/BookNeighbor.module.css';

const LIMIT = 100;

const NeighborContent = ({ content }) => {
  const [limit, setLimit] = useState(LIMIT);
  const summary = content.detail.slice(0, LIMIT);
  return (
    <div>
      <div className={styles.content}>
        <img src={content.userImg} className={styles.userImg} />
        <div>
          <div className={styles.content_title}>
            {content.title}
            <span
              style={{
                marginLeft: '5px',
                fontSize: '10px',
                fontWeight: '400',
                color: '#a8a8a8',
              }}
            >
              {content.location}
            </span>
          </div>
          <div className={styles.date}>{content.date}</div>
          {content.detail.length < LIMIT ? (
            <p className={styles.content_detail}>{content.detail}</p>
          ) : (
            <>
              <p className={styles.content_detail}>{summary}...더보기</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NeighborContent;
