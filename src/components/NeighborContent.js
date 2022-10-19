import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from '../routes/css/BookNeighbor.module.css';
import { getAuth } from 'firebase/auth';

import Comment from './Comment';

const LIMIT = 100;

const NeighborContent = ({ content }) => {
  const [limit, setLimit] = useState(LIMIT);
  const [region, setRegion] = useState('');
  const time = String(Date(content.createdAt)).split(' ');
  const timestr = `${time[3]}/${time[1]}/${time[2]}/${time[0]}`;

  const navigate = useNavigate();

  const summary = content.content.slice(0, LIMIT);
  const regionNum = content.location;

  useEffect(() => {
    switch (Number(regionNum)) {
      case 1:
        setRegion('강남구');
        break;
      case 2:
        setRegion('강동구');
        break;
      case 3:
        setRegion('강서구');
        break;
      case 4:
        setRegion('강북구');
        break;
      case 5:
        setRegion('관악구');
        break;
      case 6:
        setRegion('광진구');
        break;
      case 7:
        setRegion('구로구');
        break;
      case 8:
        setRegion('금천구');
        break;
      case 9:
        setRegion('노원구');
        break;
      case 10:
        setRegion('동대문구');
        break;
      case 11:
        setRegion('도봉구');
        break;
      case 12:
        setRegion('동작구');
        break;
      case 13:
        setRegion('마포구');
        break;
      case 14:
        setRegion('서대문구');
        break;
      case 15:
        setRegion('성동구');
        break;
      case 16:
        setRegion('성북구');
        break;
      case 17:
        setRegion('서초구');
        break;
      case 18:
        setRegion('송파구');
        break;
      case 19:
        setRegion('영등포구');
        break;
      case 20:
        setRegion('용산구');
        break;
      case 21:
        setRegion('양천구');
        break;
      case 22:
        setRegion('은평구');
        break;
      case 23:
        setRegion('종로구');
        break;
      case 24:
        setRegion('중구');
        break;
      case 25:
        setRegion('중랑구');
        break;
      default:
        break;
    }
  });

  const onClick = (e) => {
    navigate('/bookneighbor/neighborContent', {
      state: {
        region,
        timestr,
        content: content.content,
        title: content.title,
        img: content.imgfile,
      },
    });
  };

  return (
    <div>
      <div className={styles.content} onClick={onClick}>
        <img src={content.imgfile} className={styles.userImg} />
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
              {region}
            </span>
          </div>
          <div className={styles.date}>{timestr}</div>
          {content.content.length < LIMIT ? (
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

const BookNeighborDetailPage = () => {
  const location = useLocation();
  const region = location.state.region;
  const timestr = location.state.timestr;
  const content = location.state.content;
  const title = location.state.title;
  const img = location.state.img;

  const auth = getAuth();
  const userobj = auth.currentUser;
  return (
    <div className={styles.bookNeighborDetailPage}>
      <img src={img} />
      <h1>{title}</h1>
      <div>
        <span>{region}</span>
        <span>{timestr}</span>
      </div>
      <p>{content}</p>
      <Comment user={userobj} />
    </div>
  );
};

export { BookNeighborDetailPage };

export default NeighborContent;
