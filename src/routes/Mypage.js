import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { dbService } from "../fbase";
import {
  collection,
  addDoc,
  getDoc,
  query,
  onSnapshot,
  DocumentSnapshot,
  where,
  getDocs,
  doc,
  orderBy,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged, updateCurrentUser } from "firebase/auth";

import Top from "../components/Top";
import Top2 from "../components/Top2";
import styles from "./css/Mypage.module.css";
import Switch from "../components/Switch";
import Profile from "../components/Profile";
import Friend from "../components/Friends";
import LendList from "../components/LendList";

const options = [
  {
    label: "마이페이지",

    page: <Profile />,
    id: 0,
  },
  {
    label: "빌려준 책 목록",
    page: <LendList />,
    id: 1,
  },
];

const Mypage = ({ userObj }) => {
  let location = useLocation();
  const [pageNum, setPageNum] = useState(0);
  const auth = getAuth();

  console.log(pageNum);

  //만약 글쓰기에서 마이페이지로 넘어오면 빌려준 책 목록으로 바로가게
  useEffect(() => {
    if (location.state) {
      setPageNum(1);
    }
  }, [pageNum]);

  const onClick = (e) => {
    const text = e.target.textContent;
    options.map((option) => {
      if (option.label === text) {
        setPageNum(option.id);
        location.state = null;
      }
    });
  };

  return (
    <div className={styles.container}>
      <Top2 />

      <div className={styles.contents}>
        {" "}
        <Switch onClick={onClick} options={options} />
        <div>
          {options.map((option) => {
            if (option.id === pageNum) {
              option.user = userObj;
              return (
                // <div>

                // <h1 className={styles.pagename}>{option.label}</h1>
                <div key={option.id}>{option.page}</div>
                // </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Mypage;
