import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  setDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { dbService } from "../fbase";
import { getAuth } from "firebase/auth";

import Top from "../components/Top";
import Top2 from "../components/Top2";
import styles from "./css/Library.module.css";
import Book from "../components/Book";
import { async } from "@firebase/util";

const Library = (props) => {
  const [books, setBooks] = useState([]);
  const auth = getAuth();
  const userWriteRef = doc(
    dbService,
    "userWriteNumber",
    `${auth.currentUser.uid}`
  );

  useEffect(() => {
    async function fetchData() {
      const q = query(
        collection(dbService, "reviews"),
        where("creatorId", "==", `${auth.currentUser.uid}`),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const count = querySnapshot.size;
      console.log("count: ", count);
      updateDoc(userWriteRef, {
        reviewsNumber: count,
      });
      querySnapshot.forEach((doc) => {
        setBooks((prev) => [
          ...prev,
          {
            id: doc.data().createdAt.seconds,
            cid: doc.id,
            title: doc.data().title,
            text: doc.data().text,
            star: doc.data().star,
            bookimg: doc.data().bookimg,
            author: doc.data().author,
            createdAt: Date(doc.data().createdAt),
          },
        ]);
      });
    }
    fetchData();

    setDoc(userWriteRef, {
      reviewsNumber: 0,
      lentsNumber: 0,
    });
  }, []);

  return (
    <div className={styles.container}>
      <Top2 />
      <div className={styles.content}>
        {" "}
        <ul>
          {books.map((book) => {
            return <Book bookInfo={book} key={book.id} />;
          })}
        </ul>
      </div>
    </div>
  );
};

export default Library;
