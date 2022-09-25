import React from 'react';
import { useLocation,useNavigate} from 'react-router-dom';
import styles from './css/Search.module.css';

const Search = () => {
  const {state} = useLocation();
  console.log(state);
  let navigate = useNavigate();



  return (
    <div className={styles.container}>
      <div className={styles.title}>검색결과</div>
      {
        state.map((bookinfo) =>{
          return (
            <div className={styles.bookContent}>
              <div className={styles.bookContentLeft}>
              <img src={bookinfo.cover}/>
              <span>{bookinfo.title}</span>
              </div>
              <div className={styles.bookContentRight}>
                {(bookinfo.description.length >= 80)? bookinfo.description.substr(0,80) + '...': bookinfo.description}
              </div>
            </div>
          )
        })
      }
    </div>
  );
};

export default Search;
