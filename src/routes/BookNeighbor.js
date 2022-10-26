import React, { useState, useEffect } from "react";
import Top from "../components/Top";
import Top2 from "../components/Top2";
import styles from "./css/BookNeighbor.module.css";
import { useLocation, useNavigate } from "react-router-dom";

import NeighborContent from "../components/NeighborContent";
import { collection, getDocs, orderBy, query , where} from "firebase/firestore";
import { dbService } from "../fbase";

const LIMIT = 100;

const BookNeighbor = (props) => {
  const [search, setSearch] = useState("");
  const [contents, setContents] = useState([]);
  const navigate = useNavigate();
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const q = query(
        collection(dbService, "lentContents"),
        orderBy("createdAt", "desc")
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
      async function fetchData(){
        const q = query(collection(dbService, "lentContents"),
        where("title", ">=", `${search}`),
        where("title", "<=", search + '\uf8ff'),
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) =>{
          const result = {
            title : doc.data().title,
            createdAt : doc.data().createdAt,
            img: doc.data().imgfile,
            location : doc.data().location,
            creatorId : doc.data().creatorId,
            content : doc.data().content,
            cid : doc.id,
          }
          searchResult.push(result);
        });
        navigate('/bookneighbor/searchResult', {
          state: {
            searchResult
          }})
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const onClickLent = (e) => {
    try {
      navigate("/writeLent");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <Top2 />

      <div className={styles.settings}>

    <div className={styles.setting}>
      이웃도서관 </div>
      
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
    </div></div>
  );
};

const BookNeighborSearchResult = ()=>{
  const location = useLocation();
  const searchResult = location.state.searchResult;
  console.log(searchResult);

  return(
<div className={styles.searchContainer}>
{
  searchResult.map((value)=>{
    const time = String(Date(value.createdAt.seconds)).split(' ')
    const timestr = `${time[3]}/${time[1]}/${time[2]}/${time[0]}`;
    const summary = value.content.slice(0,LIMIT);
    let region = '';
   
      switch (Number(value.location)) {
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
       
    return(
      <div className={styles.searchContent}>
      <img src={value.img}/>
      <div className={styles.searchContent_right}>
        <h1>{value.title}</h1>
        <p>{region}</p>
        <div className={styles.searchContent_date}>{timestr}</div>
        {
          value.content.length < LIMIT ? (
            <p>{value.content}</p>
          ) : (
            <>
            <p>
              {summary}...더보기
            </p>
            </>
          )
        }
      </div>
    </div>
    );
})
}
</div>
  )
}

export {BookNeighborSearchResult};

export default BookNeighbor;
