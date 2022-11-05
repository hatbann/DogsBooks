import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { dbService } from "../fbase";
import { getAuth } from "firebase/auth";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  doc,
  orderBy,
  updateDoc,
  increment,
  getDoc,
} from "firebase/firestore";
import styles from "./css/Write.module.css";
import like from "../assets/like.png";
import dislike from "../assets/dislike.png";
import { faL } from "@fortawesome/free-solid-svg-icons";

const Write = ({ userObj }) => {
  const { state } = useLocation();
  const [title, setTitle] = useState("");
  const dateObj = new Date();
  const today = `${dateObj.getFullYear()}/${dateObj.getMonth()}/${dateObj.getDate()}`;
  const [review, setReview] = useState(""); //review하는 거, form
  const [reviews, setReviews] = useState([]); //review들을 가져오는 것
  const [recommend, setRecommend] = useState(true);
  console.log(state);

  const auth = getAuth();
  const userRef = doc(dbService, "UserInfo", `${auth.currentUser.uid}`);

  const navigate = useNavigate();

  //추천 알고리즘을 위해 장르 1depth로 설정해주는 거
  const categoryName = state.categoryName;
  const cnSplit = categoryName.split(">");
  const genre = cnSplit[1];

  useEffect(() => {
    const q = query(
      collection(dbService, "reviews"), //collection "reviwes"을 사용함
      orderBy("createdAt", "desc") //내림차순
    );
    onSnapshot(q, (snapshot) => {
      //새로운 스냅샷을 받을 때 배열을 만든다
      const reviewArr = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setReviews(reviewArr); //그런 다음 state에 배열을 집어 넣는다
    });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    const date = e.target[1].value;
    const star = e.target[2].value;
    const review = e.target[3].value;
    const bookimg = state.cover;
    const author = state.author;

    //reviews에 생성된 doc들 제목이 너무 중구난방인데 userObj.uid로 설정하는 게 나을까?
    const docRef = addDoc(collection(dbService, "reviews"), {
      text: review, //독서록 내용
      createdAt: dateObj, //독서록 작성한 날짜
      creatorId: userObj.uid, //독서록 작성한 유저의 아이디
      title: title, //책 제목
      star: star, //책에 준 별점
      bookimg: bookimg, // 책 이미지
      author: author, //저자
      CID: state.categoryId, //책의 카테고리 아이디
      genre: genre,
    });

    switch (String(genre)) {
      case "요리/살림":
        updateDoc(userRef, {
          genre1: increment(3),
        });
        break;
      case "건강/취미":
        updateDoc(userRef, {
          genre2: increment(3),
        });
        break;
      case "경제경영":
        updateDoc(userRef, {
          genre3: increment(3),
        });
        break;
      case "고등학교참고서":
        updateDoc(userRef, {
          genre4: increment(3),
        });
        break;
      case "고전":
        updateDoc(userRef, {
          genre5: increment(3),
        });
        break;
      case "과학":
        updateDoc(userRef, {
          genre6: increment(3),
        });
        break;
      case "달력/기타":
        updateDoc(userRef, {
          genre7: increment(3),
        });
        break;
      case "대학교재/전문서적":
        updateDoc(userRef, {
          genre8: increment(3),
        });
        break;
      case "만화":
        updateDoc(userRef, {
          genre9: increment(3),
        });
        break;
      case "사회과학":
        updateDoc(userRef, {
          genre10: increment(3),
        });
        break;
      case "소설/시/희곡":
        updateDoc(userRef, {
          genre11: increment(3),
        });
        break;
      case "수험서/자격증":
        updateDoc(userRef, {
          genre12: increment(3),
        });
        break;
      case "어린이":
        updateDoc(userRef, {
          genre13: increment(3),
        });
        break;
      case "에세이":
        updateDoc(userRef, {
          genre14: increment(3),
        });
        break;
      case "여행":
        updateDoc(userRef, {
          genre15: increment(3),
        });
        break;
      case "역사":
        updateDoc(userRef, {
          genre16: increment(3),
        });
        break;
      case "예술/대중문화":
        updateDoc(userRef, {
          genre17: increment(3),
        });
        break;
      case "외국어":
        updateDoc(userRef, {
          genre18: increment(3),
        });
        break;
      case "유아":
        updateDoc(userRef, {
          genre19: increment(3),
        });
        break;
      case "인문학":
        updateDoc(userRef, {
          genre20: increment(3),
        });
        break;
      case "일본도서":
        updateDoc(userRef, {
          genre21: increment(3),
        });
        break;
      case "자기계발":
        updateDoc(userRef, {
          genre22: increment(3),
        });
        break;
      case "잡지":
        updateDoc(userRef, {
          genre23: increment(3),
        });
        break;
      case "장르소설":
        updateDoc(userRef, {
          genre24: increment(3),
        });
        break;
      case "전집/중고전집":
        updateDoc(userRef, {
          genre25: increment(3),
        });
        break;
      case "종교/역학":
        updateDoc(userRef, {
          genre26: increment(3),
        });
        break;
      case "좋은부모":
        updateDoc(userRef, {
          genre27: increment(3),
        });
        break;
      case "중학교참고서":
        updateDoc(userRef, {
          genre28: increment(3),
        });
        break;
      case "청소년":
        updateDoc(userRef, {
          genre29: increment(3),
        });
        break;
      case "청소년 추천도서":
        updateDoc(userRef, {
          genre30: increment(3),
        });
        break;
      case "초등학교참고서":
        updateDoc(userRef, {
          genre31: increment(3),
        });
        break;
      case "컴퓨터/모바일":
        updateDoc(userRef, {
          genre32: increment(3),
        });
        break;
      default:
        updateDoc(userRef, {
          minor: increment(1),
        });
        break;
    }

    setReview("");
    navigate("/library/*");
  };

  const onChange = (e) => {
    const {
      target: { value, name },
    } = e;
    if (name === "title") {
      setTitle(value);
    }
    if (name === "review") {
      setReview(value); //리뷰 작성
    }
  };

  return (
    <div className={styles.wrapper}>
      <section>
        <div className={styles.sectionTop}>
          <img src={state.cover} className={styles.coverImg} />
          <h2>{state.title}</h2>
          <span>저자 {state.author}</span>
        </div>
        <div className={styles.sectionBottom}>
          <div>{state.description}</div>
        </div>
      </section>

      <form id="writeForm" onSubmit={onSubmit} className={styles.writeForm}>
        <div className={styles.title}>
          <label for="title">책 제목</label>
          <input
            type="text"
            placeholder={state ? `${state.title}` : "제목"}
            value={state ? `${state.title}` : `${title}`}
            onChange={onChange}
            name="title"
            id="title"
          ></input>
        </div>

        <div className={styles.title}>
          <label for="date">날짜</label>
          <input type="date" name="date" id="date"></input>
        </div>

        <div className={styles.title}>
          <label for="star">별점</label>
          <select name="star">
            <option value="">선택하세요</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>

        <div className={styles.title}>
          <label for="review">독후감</label>
          <textarea name="review" form="writeForm"></textarea>
        </div>

        <input className={styles.Btn} type="submit" value="제출"></input>
      </form>
    </div>
  );
};

/*      <div className={styles.recommendSection}>
<label>Recommend</label>
<img
  src={like}
  className={`${styles.recommend} ${styles.Btn2} ${styles.setRecommend}`}
  name="recommend"
/>
<img
  src={dislike}
  className={`${styles.unrecommend} ${styles.Btn2}`}
  name="unrecommend"
/>
</div>
*/
export default Write;
