import React from 'react';
import { useLocation,useNavigate} from 'react-router-dom';
import styles from './css/Search.module.css';
import Top from "../components/Top";
import Top2 from "../components/Top2";

const Search = () => {
  const {state} = useLocation();
  let navigate = useNavigate();

  const onClick =(bookinfo)=>{
    try {
      navigate('/search/bookinfo', {state : bookinfo});
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className={styles.container}>
      <Top2/>
      <div className={styles.title}>( 검색결과 )</div>
      {
        state.map((bookinfo) =>{
          return (
            <div className={styles.bookContent}>
              <div className={styles.bookContentLeft} onClick={(e)=> {onClick(bookinfo)}}>
              <div className= {styles.cover}><img src={bookinfo.cover}/></div>
              <span>{bookinfo.title}</span>
              </div>
              <div className={styles.bookContentRight}  onClick={(e)=> {onClick(bookinfo)}}>
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
