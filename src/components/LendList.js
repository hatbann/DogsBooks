import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
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
          },
        ]);
      });
    }
    console.log(lentBooks);
    fetchData();
  }, []);

  const onClick = (lentbook) => {
    navigate('/mypage/lendlist/lendBook', {
      state: {
        lentbook: lentbook,
      },
    });
  };
  return (
    <div className={styles.lendBooks}>
      <ul className={styles.lendBooks}>
        {lentBooks.map((lentbook) => {
          return (
            <li className={styles.lendBook} onClick={() => onClick(lentbook)}>
              <img src={lentbook.imgfile}></img>
              <span>{lentbook.title}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LendList;
