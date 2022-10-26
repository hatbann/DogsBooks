import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from 'firebase/firestore';
import { dbService } from '../fbase';
import styles from './css/BookReports.module.css';

const BookReports = () => {
  const bookreports = useLocation();
  const [content, setConent] = useState();
  const [time, setTime] = useState(
    String(Date(bookreports.state.createdAt.seconds)).split(' ')
  );
  const timestr = `${time[3]}/${time[1]}/${time[2]}/${time[0]}`;
  const [title, setTitle] = useState(bookreports.state.title);
  const [review, setReview] = useState(bookreports.state.text);
  const [starNum, setStarNum] = useState(bookreports.state.star);

  const contentRef = doc(dbService, 'reviews', `${bookreports.state.cid}`);

  const navigate = useNavigate();

  //수정을 위한 변수
  const [edit, setEdit] = useState(false);
  //게시글 삭제
  const onDeleteClick = async () => {
    const ok = window.confirm('정말로 삭제하시겠습니까?');
    if (ok) {
      try {
        await deleteDoc(contentRef);
        navigate('/library');
      } catch (error) {
        window.alert('삭제에 실패했습니다');
      }
    }
  };

  //게시글 수정
  const onToggleEdit = () => {
    setEdit((prev) => !prev);
  };

  const onEdit = async (event) => {
    event.preventDefault();
    console.log(title, review, starNum);
    await updateDoc(contentRef, {
      title,
      text: review,
      star: starNum,
      createdAt: serverTimestamp(),
    });
    console.log('수정완');
    setEdit(false);
  };

  const onChange = (e) => {
    const {
      target: { value, name },
    } = e;
    if (name === 'title') {
      setTitle(value);
    }
    if (name === 'review') {
      setReview(value); //리뷰 작성
    }
    if (name === 'star') {
      setStarNum(value);
    }
  };

  return (
    <div className={styles.reportContainer}>
      {edit ? (
        <>
          <div className={styles.editContainer}>
            <img src={bookreports.state.bookimg}></img>
          </div>
          <form id="writeForm" className={styles.editForm}>
            <div>
              <label for="title">책 제목</label>
              <input
                onChange={onChange}
                name="title"
                id="title"
                type="text"
                value={title}
              ></input>
            </div>
            <div>
              <label for="review">독후감</label>
              <textarea
                onChange={onChange}
                name="review"
                form="writeForm"
                value={review}
              ></textarea>
            </div>
            <div className={styles.writeLent_Loc}>
              <label htmlFor="star">별점</label>
              <select id="star" name="star" onChange={onChange}>
                <option value="" disabled selected>
                  선택하세요
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div id={styles.editBtn}>
              <button onClick={onToggleEdit}>수정취소</button>
              <button onClick={onEdit}>수정완료</button>
            </div>
          </form>
        </>
      ) : (
        <>
          <div className={styles.reportTop}>
            <img src={bookreports.state.bookimg}></img>
            <section>
              <h1
                className={
                  title.length > 15
                    ? `${styles.longtitle}`
                    : `${styles.shorttitle}`
                }
              >
                {title}
              </h1>
              <span>{bookreports.state.author}</span>
              <span>날짜 : {timestr}</span>
              <span>별점 : {starNum}</span>
            </section>
          </div>
          <section className={styles.review}>
            <p>{review}</p>
          </section>
          <div className={styles.editDeleteBtn}>
            <button onClick={onToggleEdit}>수정</button>
            <button onClick={onDeleteClick}>삭제</button>
          </div>
        </>
      )}
    </div>
  );
};

export default BookReports;
