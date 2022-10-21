import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { dbService } from "../fbase";
import { doc, setDoc } from "firebase/firestore";
import styles from "./css/SelectGenre.module.css";

const $ = (type) => {
  return document.querySelector(type);
};

const SelectGenre = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]); //유저가 회원가입 시 최초로 선호하는 장르 선택: selected
  const auth = getAuth();
  //console에 제대로 체크 됐는지 확인하려고 사용한것
  useEffect(() => {
    const userRef = doc(dbService, "UserInfo", `${auth.currentUser.uid}`);
    setDoc(userRef, {
      genre1: 0,
      genre2: 0,
      genre3: 0,
      genre4: 0,
      genre5: 0,
      genre6: 0,
      genre7: 0,
      genre8: 0,
      genre9: 0,
      genre10: 0,
      genre11: 0,
      genre12: 0,
      genre13: 0,
      genre14: 0,
      genre15: 0,
      genre16: 0,
      genre17: 0,
      genre18: 0,
      genre19: 0,
      genre20: 0,
      genre21: 0,
      genre22: 0,
      genre23: 0,
      genre24: 0,
      genre25: 0,
      genre26: 0,
      genre27: 0,
      genre28: 0,
      genre29: 0,
      genre30: 0,
      genre31: 0,
      genre32: 0,
    });
    console.log(selected);
  }, [selected]);

  //완료 버튼 클릭시 우선 localStorage에 저장하게 했다
  //완료하면 main 화면으로 넘어간다.
  //이제 Submit부분에서 localStorage. ~~~이 부분을 삭제하고 firebase로 넘기는 부분 수행하면 된다.

  const onSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("selected", JSON.stringify(selected));
    navigate("/dogsbooks");
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
            value="homecook"
            onClick={onChecked}
          />
          <label className={styles.checkboxlabel} for="checkbox1"></label>
          가정/요리/뷰티
        </div>
        <div className={styles.input}>
          <input
            type="checkbox"
            id="checkbox2"
            value="health"
            onClick={onChecked}
            className={styles.checkbox}
          />
          <label className={styles.checkboxlabel} for="checkbox2"></label>
          건강/취미/레저
        </div>
        <div className={styles.input}>
          <input
            type="checkbox"
            id="checkbox3"
            value="economic"
            onClick={onChecked}
            className={styles.checkbox}
          />
          <label className={styles.checkboxlabel} for="checkbox3"></label>
          경제경영
        </div>
        <div className={styles.input}>
          <input
            type="checkbox"
            id="checkbox4"
            value="highschool"
            onClick={onChecked}
            className={styles.checkbox}
          />
          <label className={styles.checkboxlabel} for="checkbox4"></label>
          고등학교참고서
        </div>
        <div className={styles.input}>
          <input
            type="checkbox"
            id="checkbox5"
            value="classic"
            onClick={onChecked}
            className={styles.checkbox}
          />
          <label className={styles.checkboxlabel} for="checkbox5"></label>
          고전
        </div>
        <div className={styles.input}>
          <input
            type="checkbox"
            id="checkbox6"
            value="science"
            onClick={onChecked}
            className={styles.checkbox}
          />
          <label className={styles.checkboxlabel} for="checkbox6"></label>
          과학
        </div>
        <div className={styles.input}>
          <input
            type="checkbox"
            id="checkbox7"
            value="calendar"
            onClick={onChecked}
            className={styles.checkbox}
          />
          <label className={styles.checkboxlabel} for="checkbox7"></label>
          달력/기타
        </div>
        <div className={styles.input}>
          <input
            type="checkbox"
            id="checkbox8"
            value="professional"
            onClick={onChecked}
            className={styles.checkbox}
          />
          <label className={styles.checkboxlabel} for="checkbox8"></label>
          대학교재/전문서적
        </div>
        <div className={styles.input}>
          <input
            type="checkbox"
            id="checkbox9"
            value="manga"
            onClick={onChecked}
            className={styles.checkbox}
          />
          <label className={styles.checkboxlabel} for="checkbox9"></label>
          만화
        </div>
        <div className={styles.input}>
          <input
            type="checkbox"
            id="checkbox10"
            value="socialscience"
            onClick={onChecked}
            className={styles.checkbox}
          />
          <label className={styles.checkboxlabel} for="checkbox10"></label>
          사회과학
        </div>
        <div className={styles.input}>
          <input
            type="checkbox"
            id="checkbox11"
            value="novel"
            onClick={onChecked}
            className={styles.checkbox}
          />
          <label className={styles.checkboxlabel} for="checkbox11"></label>
          소설/시/희곡
        </div>
        <div className={styles.input}>
          <input
            type="checkbox"
            id="checkbox12"
            value="certificate"
            onClick={onChecked}
            className={styles.checkbox}
          />
          <label className={styles.checkboxlabel} for="checkbox12"></label>
          수험서/자격증
        </div>
        <div className={styles.input}>
          <input
            type="checkbox"
            id="checkbox13"
            value="child"
            onClick={onChecked}
            className={styles.checkbox}
          />
          <label className={styles.checkboxlabel} for="checkbox13"></label>
          어린이
        </div>
        <div className={styles.input}>
          <input
            type="checkbox"
            id="checkbox14"
            value="essay"
            onClick={onChecked}
            className={styles.checkbox}
          />
          <label className={styles.checkboxlabel} for="checkbox14"></label>
          에세이
        </div>
        <div className={styles.input}>
          <input
            type="checkbox"
            id="checkbox15"
            value="travel"
            onClick={onChecked}
            className={styles.checkbox}
          />
          <label className={styles.checkboxlabel} for="checkbox15"></label>
          여행
        </div>
        <div className={styles.input}>
          <input
            type="checkbox"
            id="checkbox16"
            value="history"
            onClick={onChecked}
            className={styles.checkbox}
          />
          <label className={styles.checkboxlabel} for="checkbox16"></label>
          역사
        </div>
        <div className={styles.input}>
          <input
            type="checkbox"
            id="checkbox17"
            value="art"
            onClick={onChecked}
            className={styles.checkbox}
          />
          <label className={styles.checkboxlabel} for="checkbox17"></label>
          예술/대중문화
        </div>
        <div className={styles.input}>
          <input
            type="checkbox"
            id="checkbox18"
            value="language"
            onClick={onChecked}
            className={styles.checkbox}
          />
          <label className={styles.checkboxlabel} for="checkbox18"></label>
          외국어
        </div>
        <div className={styles.input}>
          <input
            type="checkbox"
            id="checkbox19"
            value="infant"
            onClick={onChecked}
            className={styles.checkbox}
          />
          <label className={styles.checkboxlabel} for="checkbox19"></label>
          유아
        </div>
        <div className={styles.input}>
          <input
            type="checkbox"
            id="checkbox20"
            value="humanities"
            onClick={onChecked}
            className={styles.checkbox}
          />
          <label className={styles.checkboxlabel} for="checkbox20"></label>
          인문학
        </div>
        <div className={styles.input}>
          <input
            type="checkbox"
            id="checkbox21"
            value="japanese"
            onClick={onChecked}
            className={styles.checkbox}
          />
          <label className={styles.checkboxlabel} for="checkbox21"></label>
          일본도서
        </div>
        <div className={styles.input}>
          <input
            type="checkbox"
            id="checkbox22"
            value="selfdevelope"
            onClick={onChecked}
            className={styles.checkbox}
          />
          <label className={styles.checkboxlabel} for="checkbox22"></label>
          자기계발
        </div>
        <div className={styles.input}>
          <input
            type="checkbox"
            id="checkbox23"
            value="magazine"
            onClick={onChecked}
            className={styles.checkbox}
          />
          <label className={styles.checkboxlabel} for="checkbox23"></label>
          잡지
        </div>
        <div className={styles.input}>
          <input
            type="checkbox"
            id="checkbox24"
            value="genrefiction"
            onClick={onChecked}
            className={styles.checkbox}
          />
          <label className={styles.checkboxlabel} for="checkbox24"></label>
          장르소설
        </div>
        <div className={styles.input}>
          <input
            type="checkbox"
            id="checkbox25"
            value="collection"
            onClick={onChecked}
            className={styles.checkbox}
          />
          <label className={styles.checkboxlabel} for="checkbox25"></label>
          전집/중고전집
        </div>
        <div className={styles.input}>
          <input
            type="checkbox"
            id="checkbox26"
            value="religion"
            onClick={onChecked}
            className={styles.checkbox}
          />
          <label className={styles.checkboxlabel} for="checkbox26"></label>
          종교/역학
        </div>
        <div className={styles.input}>
          <input
            type="checkbox"
            id="checkbox27"
            value="parents"
            onClick={onChecked}
            className={styles.checkbox}
          />
          <label className={styles.checkboxlabel} for="checkbox27"></label>
          좋은부모
        </div>
        <div className={styles.input}>
          <input
            type="checkbox"
            id="checkbox28"
            value="middleschool"
            onClick={onChecked}
            className={styles.checkbox}
          />
          <label className={styles.checkboxlabel} for="checkbox28"></label>
          중학교참고서
        </div>
        <div className={styles.input}>
          <input
            type="checkbox"
            id="checkbox29"
            value="teenager"
            onClick={onChecked}
            className={styles.checkbox}
          />
          <label className={styles.checkboxlabel} for="checkbox29"></label>
          청소년
        </div>
        <div className={styles.input}>
          <input
            type="checkbox"
            id="checkbox30"
            value="teenrecommend"
            onClick={onChecked}
            className={styles.checkbox}
          />
          <label className={styles.checkboxlabel} for="checkbox30"></label>
          청소년 추천도서
        </div>
        <div className={styles.input}>
          <input
            type="checkbox"
            id="checkbox31"
            value="elementary"
            onClick={onChecked}
            className={styles.checkbox}
          />
          <label className={styles.checkboxlabel} for="checkbox31"></label>
          초등학교참고서
        </div>
        <div className={styles.input}>
          <input
            type="checkbox"
            id="checkbox32"
            value="computer"
            onClick={onChecked}
            className={styles.checkbox}
          />
          <label className={styles.checkboxlabel} for="checkbox32"></label>
          컴퓨터/모바일
        </div>
        <div id={styles.formbtn}>
          <input type="submit" value={"완료"} onClick={onSubmit}></input>
        </div>
      </form>
    </div>
  );
};

export default SelectGenre;
