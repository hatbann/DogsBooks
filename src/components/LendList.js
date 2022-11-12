import React, { useState, useEffect } from 'react';
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  doc,
  getDoc,
} from 'firebase/firestore';
import { dbService } from '../fbase';
import { getAuth } from 'firebase/auth';

import styles from '../routes/css/Mypage.module.css';
import { useNavigate } from 'react-router-dom';

const LendList = ({ userobj }) => {
  const [lentBooks, setLentBooks] = useState([]);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    async function fetchData() {
      const q = query(
        collection(dbService, 'lentContents'),
        where('creatorId', '==', `${auth.currentUser.uid}`),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        setLentBooks((prev) => [
          ...prev,
          {
            id: doc.data().createdAt.seconds,
            creatorId: doc.data().creatorId,
            title: doc.data().title,
            content: doc.data().content,
            img: doc.data().imgfile,
            location: doc.data().location,
            createdAt: doc.data().createdAt,
            comments: doc.data().comments,
            cid: doc.id,
          },
        ]);
      });
    }
    fetchData();
  }, []);

  const onClick = (lentbook) => {
    const time = String(Date(lentbook.createdAt)).split(' ');
    const timestr = `${time[3]}/${time[1]}/${time[2]}/${time[0]}`;
    let region = '';
    switch (Number(lentbook.location)) {
      case 1:
        region = '강남구';
        break;
      case 2:
        region = '강동구';
        break;
      case 3:
        region = '강서구';
        break;
      case 4:
        region = '강북구';
        break;
      case 5:
        region = '관악구';
        break;
      case 6:
        region = '광진구';
        break;
      case 7:
        region = '구로구';
        break;
      case 8:
        region = '금천구';
        break;
      case 9:
        region = '노원구';
        break;
      case 10:
        region = '동대문구';
        break;
      case 11:
        region = '도봉구';
        break;
      case 12:
        region = '동작구';
        break;
      case 13:
        region = '마포구';
        break;
      case 14:
        region = '서대문구';
        break;
      case 15:
        region = '성동구';
        break;
      case 16:
        region = '성북구';
        break;
      case 17:
        region = '서초구';
        break;
      case 18:
        region = '송파구';
        break;
      case 19:
        region = '영등포구';
        break;
      case 20:
        region = '용산구';
        break;
      case 21:
        region = '양천구';
        break;
      case 22:
        region = '은평구';
        break;
      case 23:
        region = '종로구';
        break;
      case 24:
        region = '중구';
        break;
      case 25:
        region = '중랑구';
        break;
      default:
        break;
    }
    navigate('/mypage/lendlist/lendBook', {
      state: {
        region,
        timestr,
        content: lentbook.content,
        title: lentbook.title,
        img: lentbook.img,
        uid: lentbook.creatorId,
        id: lentbook.cid,
        comments: lentbook.comments,
        page: 'profile',
      },
    });
    console.log(lentbook);
  };
  return (
    <div className={styles.lendBooks}>
      <ul className={styles.lendBooks}>
        {lentBooks.map((lentbook) => {
          return (
            <li className={styles.lendBook} onClick={() => onClick(lentbook)}>
              <img src={lentbook.img}></img>
              <h1>{lentbook.title}</h1>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LendList;
