import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./css/BookInfo.module.css";

const BookInfo = () => {
  const location = useLocation();
  const bookinfo = location.state.bookinfo;
  const searchKeyword = location.state.searchKeyword;
  console.log("bookInfo: ", bookinfo);
  const navigate = useNavigate();

  const onWrite = (bookinfo) => {
    try {
      navigate("/write", { state: bookinfo });
    } catch (error) {
      console.log(error);
    }
  };

  const onBookIn = () => {
    try {
      navigate("/writeBorrow", {
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
    <div className={styles.wrapper}>
      <section>
        <div className={styles.sectionTop}>
          <img src={bookinfo.cover} className={styles.coverImg} />
          <h2>{bookinfo.title}</h2>
          <span>저자 {bookinfo.author}</span>
        </div>
        <div className={styles.sectionBottom}>
          <div>{bookinfo.description}</div>
        </div>
      </section>
      <button className={styles.writeBtn} onClick={(e) => onWrite(bookinfo)}>
        읽은 책 기록하기
      </button>
    </div>
  );
};

export default BookInfo;
