import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { dbService } from "../fbase";
import { getAuth } from "firebase/auth";

import styles from "../routes/css/Mypage.module.css";

const LendList = (props) => {
  const [lentBooks, setLentBooks] = useState([]);
  const auth = getAuth();

  useEffect(() => {
    async function fetchData() {
      const q = query(
        collection(dbService, "lentContents"),
        where("creatorId", "==", `${auth.currentUser.uid}`),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setLentBooks((prev) => [
          ...prev,
          {
            id: doc.data().createdAt.seconds,
            creatorId: doc.data().creatorId,
            title: doc.data().title,
            content: doc.data().content,
            img: doc.data().imgfile,
            location: doc.data().location,
            createdAt: doc.data().createdAt.toDate(),
          },
        ]);
      });
    }
    fetchData();
  }, []);

  return (
    <div className={styles.lendBooks}>
      <img
        src="http://image.kyobobook.co.kr/images/book/large/033/l9788937461033.jpg"
        className={styles.lendBook}
      />
      <img
        src="http://image.kyobobook.co.kr/images/book/large/909/l9791165341909.jpg"
        className={styles.lendBook}
      />
      <img
        src="http://image.kyobobook.co.kr/images/book/large/485/l9788954687485.jpg"
        className={styles.lendBook}
      />
      <img
        src="http://image.kyobobook.co.kr/images/book/large/518/l9791191043518.jpg"
        className={styles.lendBook}
      />
      <img
        src="http://image.kyobobook.co.kr/images/book/large/194/l9788972756194.jpg"
        className={styles.lendBook}
      />
    </div>
  );
};

export default LendList;
