import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './css/Search.module.css';
import Top from '../components/Top';
import Top2 from '../components/Top2';

const Search = () => {
  const location = useLocation();
  let navigate = useNavigate();

  const data = location.state.data;
  const searchKeyword = location.state.search;
  const onClick = (bookinfo) => {
    try {
      navigate('/search/bookinfo', {
        state: {
          bookinfo,
          searchKeyword,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <Top2 />
      <div className={styles.settings}>
        <div className={styles.setting}>검색결과 </div>
        <hr className={styles.hr} />
        <div className={styles.message}>
          <span>검색 결과는 다음과 같습니다</span></div>
          
      {data.map((bookinfo) => {
        return (
          <div className={styles.content}>
          <div className={styles.bookContent}
              onClick={(e) => {onClick(bookinfo); }}>
        
              <div className={styles.cover}>
                <img src={bookinfo.cover} />
              </div>
              </div>

              <div className={styles.bookContent2}
              onClick={(e) => {onClick(bookinfo); }}>
              <span>{bookinfo.title}</span>
              <div className={styles.author}>
              <span>{bookinfo.author}</span></div>
         
            <div
              className={styles.bookContentRight}
              onClick={(e) => {
                onClick(bookinfo);
              }}
            >
              {bookinfo.description.length >= 80
                ? bookinfo.description.substr(0, 100) + '...'
                : bookinfo.description}
            </div>
          </div>   </div>
        );
      })}
    </div></div>
  );
};

export default Search;
