import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { dbService } from "../fbase";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  doc,
  orderBy,
} from "firebase/firestore";
import styles from "./css/Write.module.css";

const Write = ({ userObj }) => {
  const { state } = useLocation();
  const [title, setTitle] = useState("");
  const dateObj = new Date();
  const today = `${dateObj.getFullYear()}/${dateObj.getMonth()}/${dateObj.getDate()}`;
  const [review, setReview] = useState(""); //review하는 거, form
  const [reviews, setReviews] = useState([]); //review들을 가져오는 것
  console.log(state);

  useEffect(() => {
    //작성한 review들을 firesotre 내에서 정렬하는 것. 그런데 정렬이 안 되는 것 같음... nweete에서도 안 됨 ㅠㅠ
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
    //reviews에 생성된 doc들 제목이 너무 중구난방인데 userObj.uid로 설정하는 게 나을까?
    const docRef = addDoc(collection(dbService, "reviews"), {
      text: review, //독서록 내용
      createdAt: dateObj, //독서록 작성한 날짜
      creatorId: userObj.uid, //독서록 작성한 유저의 아이디
      title: title, //책 제목
      star: star, //책에 준 별점
      CID: state.categoryId, //책의 카테고리 아이디
    });
    console.log(title, date, star, review);
    setReview("제출함(임시)"); //디비에 제출 됐는지 확인하려고 설정해둠. 문제 없으면 ""로 바꿀 예정
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

      <form id="writeForm" onSubmit={onSubmit}>
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

export default Write;
