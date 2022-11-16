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
import { getDoc, query, doc, getDocs, Firestore } from "firebase/firestore";

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
  const [writeNum, setWriteNum] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [writelevelNum, setWriteLevelNum]= useState(1);
  const [lentlevelNum, setLentLevelNum]= useState(1);
  const [disable, setDisable] = React.useState(true);

  const userWriteRef = doc(
    dbService,
    "userWriteNumber",
    `${auth.currentUser.uid}`
  );


  useEffect(() => {
    if (location.state) {
      setPageNum(1);
    }
    async function fetchData() {
      const q = query(userWriteRef);
      const writeNum = await getDocs(q);
      let tempWriteNum = writeNum.data();
      setWriteNum(tempWriteNum);
    }
    fetchData();
  }, [pageNum]);

console.log("writeNum: ", writeNum);
console.log("writelevelNum: ", writelevelNum);
console.log("lentlevelNum: ", lentlevelNum);

useEffect(() =>{
  if (5<= writeNum <= 9){
    setWriteLevelNum(2)
    setDisable(false)
  }else if (10<= writeNum <= 14){
    setWriteLevelNum(3)
  }else if (15<= writeNum <= 19){
    setWriteLevelNum(4)
  }else if (20<= writeNum <= 24){
    setWriteLevelNum(4)
  }else if (25<= writeNum <= 29){
    setWriteLevelNum(5)
  }
}, [writeNum]);


  let evaluateNum;
  let lentNum;
  for (let i in writeNum) {
    if (i === "reviewsNumber") {
      evaluateNum = writeNum[i];
      break;
    } else {
      lentNum = writeNum[i];
    }
  }
  console.log("evaluateNum: ", evaluateNum);
  console.log("lentNum: ", lentNum);



  if (evaluateNum === undefined) {
    evaluateNum = 20;
  } 
  if (lentNum === undefined) {
    lentNum = 20;
  } // elseif +20씩 하면되는데 Undefined 어케 고치는지 모르겠음

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


  const rankup1 = () => {
    alert("레벨 1 독스 가져오기");
};

const level2= () => {
  if ((evaluateNum) == 2){
    setDisable(false)
  }
}
const level3= () => {
  if ((evaluateNum) == 3){
    setDisable(false)
  }
}

let [like, like_change] = useState(0);


  //evaluateNum: 독서록 작성한 개수(삭제한 것까지 반영)
  //lentNum: 책 빌려주기 글 작성 개수(삭제한 것까지 반영)

  return (
    <div className={styles.settings}>
      <div className={styles.setting}>
        내 독스
        <img src="https://cdn-icons-png.flaticon.com/512/1076/1076877.png" />
      </div>

      <div className={styles.profile}>
        <div className={styles.profile_detail}>
          <div style={{ marginBottom: "3px", marginTop: "6px" }}>
            {" "}
            <span className={styles.name}>북스 기록하기</span>
            <span className={styles.level}>{writelevelNum} Lv</span>
          </div>
          <div style={{ marginBottom: "7px" }}>
            <ProgressBar
              completed={evaluateNum}
              bgColor="skyblue"
              width="80vw"
              height="3vw"
              labelSize="10px"
              labelColor="#474747"
              marginBottom="7px"
            />
          </div>
        </div>{" "}
      </div>
      <div className={styles.message}>
        <span>레벨업으로 새로운 독스를 만날 수 있어요!</span>
      </div>
      <div className={styles.dogs}>
        <img src={require("../assets/01.png")} />
        <Link to="/" > 
        <button disabled={false} onClick={rankup1}>LV 1 </button></Link>

        <img src={require("../assets/02.png")} />
        
        <button disabled={true} level2={() => setDisable(false)}> LV 2 </button>
        <img src={require("../assets/03.png")} />
        <button disabled={true} level3={() => setDisable(false)}> LV 3 </button>
      </div>

      <div className={styles.dogs}>
        <img src={require("../assets/04.png")} />
        <button disabled={true} level3={() => setDisable(false)}> LV 4</button>
        <img src={require("../assets/05.png")} />
        <button disabled={true} level3={() => setDisable(false)}> LV 5 </button>
        <img src={require("../assets/06.png")} />
        <button disabled={true} level3={() => setDisable(false)}> LV 6 </button>
      </div>

      <div className={styles.profile}>
        <div className={styles.profile_detail}>
          <div style={{ marginBottom: "3px", marginTop: "20px" }}>
            {" "}
            <span className={styles.name}>북스 빌려주기</span>
            <span className={styles.level}>{lentlevelNum} Lv</span>
          </div>
          <div style={{ marginBottom: "7px" }}>
            <ProgressBar
              completed={lentNum}
              bgColor="skyblue"
              width="80vw"
              height="3vw"
              labelSize="10px"
              labelColor="#474747"
              marginBottom="7px"
            />
          </div>

          <div className={styles.message}>
            <span>빌려주고 싶은 책을 업로드해 히든 아이템을 얻으세요</span>
          </div>

         
          <div className={styles.dogs} id="testImg">
            <img src={require("../assets/01.png")}  />
            <Link to="/bookneighbor" > 
        <button disabled={false}>LV 1 </button></Link>
            <img src={require("../assets/02.png")} />
            <button disabled={true} level3={() => setDisable(false)}> LV 2</button>
            <img src={require("../assets/03.png")} />
            <button disabled={true} level3={() => setDisable(false)}> LV 3</button>
          </div>

          <div className={styles.settings}>
            <div style={{ marginTop: "20px" }}>
              <span>{`지금까지 ${userObj.displayName}님이`}</span>
              <br></br>
              <span>평가한 북스</span>
              <div></div>
              <Link to="/Library" className={styles.total}>
                <span>{`${evaluateNum}`}</span>
              </Link>
            </div>
            <hr className={styles.hr} />
          </div>

          <div className={styles.settings}>
            <div style={{ marginTop: "20px" }}>
              <span>{`최근`}</span>
              <br></br>
              <span>최고 별점작!</span>
              <div></div>
              <Link to="/Library" className={styles.total}>
                <span>"인간실격"</span>
              </Link>
            </div>
            <hr className={styles.hr} />
          </div>

          <div className={styles.setting}>
            <div style={{ marginTop: "20px" }}>
              <span>독서취향 모아보기</span>
            </div>{" "}
          </div>
          <div className={styles.taste}>
            <img src={require("../assets/t1.png")} />
            <img src={require("../assets/t2.png")} />
            <img src={require("../assets/t3.png")} />
          </div>
          <hr className={styles.hr} />

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
