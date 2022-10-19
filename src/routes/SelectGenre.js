import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { dbService } from '../fbase';
import { doc, setDoc } from 'firebase/firestore';
import styles from './css/SelectGenre.module.css';

const $ = (type) => {
  return document.querySelector(type);
};

const SelectGenre = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]); //유저가 회원가입 시 최초로 선호하는 장르 선택: selected
  const auth = getAuth();
  //console에 제대로 체크 됐는지 확인하려고 사용한것
  useEffect(() => {
    const userRef = doc(dbService, 'UserInfo', `${auth.currentUser.uid}`);
    setDoc(userRef, { genre1: 0, genre2: 0, genre3: 0, genre4: 0 });
    console.log(selected);
  }, [selected]);

  //완료 버튼 클릭시 우선 localStorage에 저장하게 했다
  //완료하면 main 화면으로 넘어간다.
  //이제 Submit부분에서 localStorage. ~~~이 부분을 삭제하고 firebase로 넘기는 부분 수행하면 된다.

  const onSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('selected', JSON.stringify(selected));
    navigate('/dogsbooks');
  };
  //체크 버튼 클릭시 해당 버튼의 값이 selected 배열에 들어가고,
  //체크버튼 비활성화시 배열에서 삭제된다
  const onChecked = (event) => {
    let checked = event.target.checked;
    let value = event.target.value;
    if (checked) {
      setSelected([...selected, value]);
    } else {
      let filtered = selected.filter((element) => element !== value);
      setSelected(filtered);
    }
  };
  return (
    <div className={styles.container}>
      <h1>장르선택</h1>
      <div>
        <span> 관심있는 장르를 선택해주세요!</span>
        <span>(중복 선택 가능합니다.)</span>
      </div>
      <form method="post">
        <div className={styles.input}>
          <input
            type="checkbox"
            id="checkbox1"
            value="koreanNovel"
            onClick={onChecked}
          />
          <label className={styles.checkboxlabel} for="checkbox1"></label>
          한국소설
        </div>
        <div className={styles.input}>
          <input
            type="checkbox"
            id="checkbox2"
            value="Humanities"
            onClick={onChecked}
            className={styles.checkbox}
          />
          <label className={styles.checkboxlabel} for="checkbox2"></label>
          인문학
        </div>
        <div className={styles.input}>
          <input
            type="checkbox"
            id="checkbox3"
            value="science"
            onClick={onChecked}
            className={styles.checkbox}
          />
          <label className={styles.checkboxlabel} for="checkbox3"></label>
          과학
        </div>
        <div className={styles.input}>
          <input
            type="checkbox"
            id="checkbox4"
            value="economics"
            onClick={onChecked}
            className={styles.checkbox}
          />
          <label className={styles.checkboxlabel} for="checkbox4"></label>
          경제/경영
        </div>
        <div id={styles.formbtn}>
          <input type="submit" value={'완료'} onClick={onSubmit}></input>
        </div>
      </form>
    </div>
  );
};

export default SelectGenre;
