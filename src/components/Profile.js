import React, { useState, useEffect, Component } from "react";
import {
  getAuth,
  onAuthStateChanged,
  updateCurrentUser,
  signOut,
} from "firebase/auth";
import { Link, useNavigate, useLocation } from "react-router-dom";

import userImg from "../assets/img1.png";
/*import rankImg1 from '../assets/05.png';
import rankImg2 from '../assets/06.png';*/
import styles from "../routes/css/Mypage.module.css";
import ProgressBar from "@ramonak/react-progress-bar";
import { dbService } from "../fbase";

import {
  getDoc,
  query,
  doc,
  getDocs,
  Firestore,
  collection,
} from "firebase/firestore";
import { async } from "@firebase/util";

/*const user = {
  img: userImg,
  name: " 조선영",
  level: 1,
  percentage: 70,
};



/*class Image extends Component {
  state = {
      imgA : rankImg1,
      imgB : rankImg2
  }
  render() {
      return (
          <div>
              <img src={this.state.imgA} alt="rankImg1" />
              <img src={this.state.imgB} alt="rankImg2" /><br/>
          </div>
      );
  }
}*/

// 버튼으로 만들기
// 레벨이 되어야 눌리게 + 색 변경
// 레벨 값 받아오기 아니 왜 다 undefined 나옴? 이해불가

const Profile = () => {
  const auth = getAuth();
  const userObj = auth.currentUser;
  let location = useLocation();
  const [genreArr, setGenreArr] = useState([]);
  const [writeNum, setWriteNum] = useState(0); //쓴횟수
  const [lentNum, setLentNum] = useState(0); //빌린 횟수
  const [pageNum, setPageNum] = useState(0);
  const [writelevelNum, setWriteLevelNum] = useState(1);
  const [lentlevelNum, setLentLevelNum] = useState(1);
  const [disable, setDisable] = React.useState(true);
  //useEffect 밖으로 변수데이터 가져가려면
  //데이터를 useState 변수로 사용하기.
  //그리고 setData함수를 useEffect 내부 호출.

  useEffect(() => {
    if (location.state) {
      setPageNum(1);
    }

    async function fetchData() {
      const docRef = doc(
        dbService,
        "userWriteNumber",
        `${auth.currentUser.uid}`
      );

      const q = query(doc(dbService, "UserInfo", `${auth.currentUser.uid}`));
      const genreArr = await getDoc(q);
      let tempGenreArr = genreArr.data();
      setGenreArr(tempGenreArr);

      let docSnap;
      const getData = async () => {
        docSnap = await getDoc(docRef);
        console.log(docSnap.data());
        setLentNum(docSnap.data().lentsNumber);
        leveling(docSnap.data().reviewsNumber);
        leveling2(docSnap.data().lentsNumber);
      };

      getData();
    }
    fetchData();
  }, []);

  let values = Object.values(genreArr || {});
  let maxValues = Math.max(...values);
  let j = 0;
  let favorite = [];
  for (let i in genreArr) {
    if (genreArr[i] === maxValues) {
      favorite[j] = i;
      j++;
    } else {
      continue;
    }
  }
  for (let i in favorite) {
    switch (String(favorite[i])) {
      case "genre1":
        favorite[i] = "요리/살림";
        break;
      case "genre2":
        favorite[i] = "건강/취미";
        break;
      case "genre3":
        favorite[i] = "경제경영";
        break;
      case "genre4":
        favorite[i] = "고등학교참고서";
        break;
      case "genre5":
        favorite[i] = "고전";
        break;
      case "genre6":
        favorite[i] = "과학";
        break;
      case "genre7":
        favorite[i] = "달력/기타";
        break;
      case "genre8":
        favorite[i] = "대학교재/전문서적";
        break;
      case "genre9":
        favorite[i] = "만화";
        break;
      case "genre10":
        favorite[i] = "사회과학";
        break;
      case "genre11":
        favorite[i] = "소설/시/희곡";
        break;
      case "genre12":
        favorite[i] = "수험서/자격증";
        break;
      case "genre13":
        favorite[i] = "어린이";
        break;
      case "genre14":
        favorite[i] = "에세이";
        break;
      case "genre15":
        favorite[i] = "여행";
        break;
      case "genre16":
        favorite[i] = "역사";
        break;
      case "genre17":
        favorite[i] = "예술/대중문화";
        break;
      case "genre18":
        favorite[i] = "외국어";
        break;
      case "genre19":
        favorite[i] = "유아";
        break;
      case "genre20":
        favorite[i] = "인문학";
        break;
      case "genre21":
        favorite[i] = "자기계발";
        break;
      case "genre22":
        favorite[i] = "잡지";
        break;
      case "genre23":
        favorite[i] = "장르소설";
        break;
      case "genre24":
        favorite[i] = "전집/중고전집";
        break;
      case "genre25":
        favorite[i] = "종교/역학";
        break;
      case "genre26":
        favorite[i] = "좋은부모";
        break;
      case "genre27":
        favorite[i] = "중학교참고서";
        break;
      case "genre28":
        favorite[i] = "청소년";
        break;
      case "genre29":
        favorite[i] = "초등학교참고서";
        break;
      case "genre30":
        favorite[i] = "컴퓨터/모바일";
        break;
      case "minor":
        favorite[i] = "마이너";
        break;
    }
  }
  console.log("독서취향모아보기: favorite: ", favorite);

  /*
  console.log('writeNum: ', writeNum);//쓴횟수
  console.log('lentNum: ', lentNum);//빌린횟수
  console.log('writelevelNum: ', writelevelNum);
  console.log('lentlevelNum: ', lentlevelNum);

  */

  console.log("genreArr: ", genreArr);
  console.log("favoriteGenre: ", favorite);

  const leveling = function(num) {
    if (num > 0 && num <= 5) {
      // console.log('here');
      setWriteLevelNum(1);
    } else if (num > 5 && num <= 10) {
      setWriteLevelNum(2);
      console.log("here");
      setWriteNum(num - 5); //프로그래스바 맞추기
    } else if (num > 10 && num <= 15) {
      setWriteLevelNum(3);

      // console.log('here');
      setWriteNum(num - 10);
    } else if (num > 15 && num <= 20) {
      setWriteLevelNum(4);
      // console.log('here');
      setWriteNum(num - 15);
    } else if (num > 20 && num <= 25) {
      setWriteLevelNum(5);
      // console.log('here');
      setWriteNum(num - 20);
    } else if (num > 25 && num <= 30) {
      setWriteLevelNum(6);
      //console.log('here');
      setWriteNum(num - 25);
    }
  };

  const leveling2 = function(num) {
    if (num > 0 && num <= 5) {
      console.log("here");
      setLentLevelNum(1);
    } else if (num > 5 && num <= 10) {
      setLentLevelNum(2);
      console.log("here");
      setLentNum(num - 5);
    } else if (num > 10 && num <= 15) {
      setLentLevelNum(3);
      console.log("here");
      setLentNum(num - 10);
    } else if (num > 15 && num <= 20) {
      setLentLevelNum(4);
      // console.log('here');
      setLentNum(num - 15);
    } else if (num > 20 && num <= 25) {
      setLentLevelNum(5);
      // console.log('here');
      setLentNum(num - 20);
    } else if (num > 25 && num <= 30) {
      setLentLevelNum(6);
      //console.log('here');
      setLentNum(num - 25);
    }
  };

  const navigate = useNavigate();

  const onLogOutClick = () => {
    const auth = getAuth();
    signOut(auth);
    navigate("/");
  };

  const onclick = () => {
    navigate("/Mypage/ProfileUpdate");
  };

  const onclick2 = () => {
    navigate("/Home");
  };

  const isdisabled = () => {
    if (writelevelNum === 1) {
      setDisable(true);
    }
  };

  const onMain = () => {
    alert("level1 독스를 선택!");
  };

  return (
    <div className={styles.settings}>
      <div className={styles.setting}>
        내 독스
        <img src="https://cdn-icons-png.flaticon.com/512/1076/1076877.png" />
      </div>

      <div className={styles.profile}>
        <div className={styles.profile_detail}>
          <div style={{ marginBottom: "1px", marginTop: "6px" }}>
            <span className={styles.name}>북스 기록하기</span>
            <span className={styles.level}>{writelevelNum} Lv</span>
          </div>
          <div style={{ marginBottom: "0px" }}></div>
        </div>
      </div>

      <div style={{ marginBottom: "1px" }}>
        <ProgressBar
          completed={writeNum * 20}
          bgColor="skyblue"
          width="78vw"
          height="3.5vw"
          labelSize="10px"
          labelColor="#474747"
          marginBottom="7px"
        />
      </div>

      <div className={styles.message}>
        <span>레벨업으로 새로운 독스를 만날 수 있어요!</span>
      </div>

      <div class={styles.dogscontainer}>
        <div className={styles.dogs}>
          <img src={require("../assets/01.png")} />
          <Link to={"/"} state={{ imgNum: 1 }}>
            <button id="1" onClick={onMain}>
              level 1
            </button>{" "}
          </Link>{" "}
        </div>

        <div className={styles.dogs}>
          <img src={require("../assets/02.png")} />
          <Link to={"/"} state={{ imgNum: 2 }}>
            <button id="2" disabled={writelevelNum === 1}>
              level 2
            </button>{" "}
          </Link>{" "}
        </div>

        <div className={styles.dogs}>
          <img src={require("../assets/03.png")} />
          <button id="3" disabled={writelevelNum <= 2}>
            level 3
          </button>{" "}
        </div>
      </div>

      <div className={styles.dogscontainer}>
        <div className={styles.dogs}>
          <img src={require("../assets/04.png")} />
          <button id="4" disabled={writelevelNum <= 3}>
            level 4
          </button>{" "}
        </div>

        <div className={styles.dogs}>
          <img src={require("../assets/05.png")} />
          <button id="4" disabled={writelevelNum <= 4}>
            level 5
          </button>{" "}
        </div>

        <div className={styles.dogs}>
          <img src={require("../assets/06.png")} />
          <button id="4" disabled={writelevelNum <= 5}>
            level 6
          </button>{" "}
        </div>
      </div>

      <div style={{ marginBottom: "10px" }}></div>

      <div className={styles.profile}>
        <div className={styles.profile_detail}>
          <div style={{ marginBottom: "1px", marginTop: "20px" }}>
            {" "}
            <span className={styles.name}>북스 빌려주기</span>
            <span className={styles.level}>{lentlevelNum} Lv</span>
          </div>
          <div style={{ marginBottom: "1px" }}>
            <ProgressBar
              completed={lentNum * 20}
              bgColor="skyblue"
              width="80vw"
              height="3.5vw"
              labelSize="10px"
              labelColor="#474747"
              marginBottom="7px"
            />
          </div>

          <div className={styles.message}>
            <span>빌려주고 싶은 책을 업로드해 히든 아이템을 얻으세요</span>
          </div>
          <div className={styles.dogscontainer}>
            <div className={styles.dogs}>
              <img src={require("../assets/001.png")} />
              <button id="1" disabled={lentlevelNum == 0}>
                level 1
              </button>{" "}
            </div>

            <div className={styles.dogs}>
              <img src={require("../assets/002.png")} />
              <button id="2" disabled={lentlevelNum <= 1}>
                level 2
              </button>{" "}
            </div>

            <div className={styles.dogs}>
              <img src={require("../assets/003.png")} />
              <button id="3" disabled={lentlevelNum <= 2}>
                level 3
              </button>{" "}
            </div>
          </div>

          <div className={styles.dogscontainer}>
            <div className={styles.dogs}>
              <img src={require("../assets/004.png")} />
              <button id="4" disabled={lentlevelNum <= 3}>
                level 4
              </button>{" "}
            </div>

            <div className={styles.dogs}>
              <img src={require("../assets/005.png")} />
              <button id="4" disabled={lentlevelNum <= 4}>
                level 5
              </button>{" "}
            </div>

            <div className={styles.dogs}>
              <img src={require("../assets/006.png")} />
              <button id="4" disabled={lentlevelNum <= 5}>
                level 6
              </button>{" "}
            </div>
          </div>

          <div className={styles.settings2}>
            <div style={{ marginTop: "50px" }}>
              <span>{`지금까지 ${userObj.displayName}님이`}</span>
              <br></br>
              <span>평가한 북스</span>
              <div></div>

              <Link to="/Library">
                <div className={styles.total1}>
                  {(writelevelNum - 1) * 5 + writeNum}
                </div>
              </Link>
            </div>
            <hr className={styles.hr} />
          </div>

          <div className={styles.settings2}>
            <div style={{ marginTop: "0px" }}>
              <span>{`지금까지 ${userObj.displayName}님이`}</span>
              <br></br>
              <span>빌려준 북스</span>

              <div></div>
              <Link to="/Library">
                <div className={styles.total2}>
                  {(lentlevelNum - 1) * 5 + lentNum}
                </div>{" "}
              </Link>
            </div>
            <hr className={styles.hr} />
          </div>

          <div className={styles.settings2}>
            <div style={{ marginTop: "0px" }}>
              <span>{`${userObj.displayName}님의`}</span>
              <br></br>
              <span>독서취향은?</span>
              <div></div>
              <div className={styles.total3}>{favorite}</div>
            </div>
            <hr className={styles.hr} />
          </div>

          <div className={styles.setting}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png"
              className={styles.setting_img}
            />
            프로필 수정
          </div>

          <button
            className={`${styles.setting} ${styles.logout}`}
            onClick={onLogOutClick}
          >
            <img src="https://cdn-icons-png.flaticon.com/512/159/159707.png" />
            로그아웃
          </button>
        </div>{" "}
      </div>
    </div>
  );
};

export default Profile;
