import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../routes/css/Mypage.module.css';

const LendBook = () => {
  const location = useLocation();
  const title = location.state.lentbook.title;
  const content = location.state.lentbook.content;
  const img = location.state.lentbook.img;
  const regionNum = location.state.lentbook.location;
  const time = location.state.lentbook.createdAt;
  console.log(regionNum);
  const [region, setRegion] = useState('');
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
  }, []);
  return (
    <div className={styles.LendBookContainer}>
      <img src="https://t1.daumcdn.net/thumb/R720x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/1Uyx/image/dqojGXuupTck8nXTGHAsPYRjlaM.jpeg"></img>

      <h1>{title}</h1>
      <span>{region}</span>
      <p>{content}</p>
    </div>
  );
};

export default LendBook;
