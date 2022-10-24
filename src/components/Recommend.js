import { dbService } from "../fbase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  onSnapshot,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Recommend = () => {
  const [genrePoint, setGenrePoint] = useState([]);
  const userRef = doc(dbService, "UserInfo", `${auth.currentUser.uid}`);

  useEffect(() => {
    const q = query(doc(userRef));
    onSnapshot(q, (snapshot) => {
      const genreArr = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setGenrePoint(genreArr);
    });
  }, []);
};
