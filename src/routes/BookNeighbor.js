import React, { useState, useEffect } from 'react';
import Top from '../components/Top';
import Top2 from '../components/Top2';
import styles from './css/BookNeighbor.module.css';
import { useLocation, useNavigate } from 'react-router-dom';

import NeighborContent from '../components/NeighborContent';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { dbService } from '../fbase';

const LIMIT = 100;

const BookNeighbor = (props) => {
  const [search, setSearch] = useState('');
  const [contents, setContents] = useState([]);
  const navigate = useNavigate();
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const q = query(
        collection(dbService, 'lentContents'),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setContents((prev) => [
          ...prev,
          {
            id: doc.id,
            cid: doc.data().creatorId,
            title: doc.data().title,
            content: doc.data().content,
            imgfile: doc.data().imgfile,
            location: doc.data().location,
            createdAt: doc.data().createdAt,
            comments: doc.data().comments,
            available: doc.data().available,
          },
        ]);
      });
    }
    fetchData();
  }, []);

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setSearch(value);
  };

  const onSearch = async (e) => {
    try {
      async function fetchData() {
        const q = query(
          collection(dbService, 'lentContents'),
          where('title', '>=', `${search}`),
          where('title', '<=', search + '\uf8ff')
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const result = {
            title: doc.data().title,
            createdAt: doc.data().createdAt,
            imgfile: doc.data().imgfile,
            location: doc.data().location,
            creatorId: doc.data().creatorId,
            content: doc.data().content,
            cid: doc.id,
            commnets: doc.data().comments,
            available: doc.data().available,
          };
          searchResult.push(result);
        });
        navigate('/bookneighbor/searchResult', {
          state: {
            searchResult,
          },
        });
      }
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const onClickLent = (e) => {
    try {
      navigate('/writeLent');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <Top2 />

      <div className={styles.settings}>
        <div className={styles.setting}>이웃도서관 </div>

        <div className={styles.search}>
          <form>
            <input
              type="text"
              placeholder="빌리고 싶은 책 검색"
              value={search}
              onChange={onChange}
            ></input>
            <button type="button" id={styles.bookSearchBtn} onClick={onSearch}>
              검색
            </button>
          </form>
        </div>
        <section>
          <div className={styles.contents_Container}>
            {contents.map((content) => {
              return <NeighborContent key={content.id} content={content} />;
            })}
          </div>
        </section>
        <div className={styles.writeBtn}>
          <button onClick={onClickLent}>책 빌려주기</button>
        </div>
      </div>
    </div>
  );
};

const BookNeighborSearchResult = () => {
  const location = useLocation();
  const searchResult = location.state.searchResult;
  console.log(searchResult);

  return (
    <div className={styles.searchContainer}>
      {searchResult.map((content) => {
        return <NeighborContent key={content.cid} content={content} />;
      })}
    </div>
  );
};

export { BookNeighborSearchResult };

export default BookNeighbor;
