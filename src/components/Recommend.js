import { dbService } from "../fbase";
import { getAuth } from "firebase/auth";
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
import React, { useEffect, useState } from "react";

const Recommend = () => {
  const [genreArr, setGenreArr] = useState([]);
  const [genrePoint, setGenrePoint] = useState([]);

  const auth = getAuth();

  useEffect(() => {
    async function fetchData() {
      const q = query(doc(dbService, "UserInfo", `${auth.currentUser.uid}`));
      const genreArr = await getDoc(q);
      let tempGenreArr = genreArr.data();
      setGenreArr(tempGenreArr);
    }
    fetchData();
  });
  console.log("genreArr: ", genreArr);

  let values = Object.values(genreArr);
  console.log("values: ", values);
  let maxValues = Math.max(...values);
  console.log("Max: ", maxValues);
  let key = Object.keys(genreArr);
  console.log("key: ", key);
};

export default Recommend;
