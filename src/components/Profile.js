import React, { useState, useEffect, Component } from 'react';
import {
  getAuth,
  onAuthStateChanged,
  updateCurrentUser,
  signOut,
} from 'firebase/auth';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import userImg from '../assets/img1.png';
/*import rankImg1 from '../assets/05.png';
import rankImg2 from '../assets/06.png';*/
import styles from '../routes/css/Mypage.module.css';
import ProgressBar from '@ramonak/react-progress-bar';
import { dbService } from '../fbase';
import {
  getDoc,
  query,
  doc,
  getDocs,
  Firestore,
  collection,
} from 'firebase/firestore';
import ImageButton from 'react-image-button';


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
  const [writeNum, setWriteNum] = useState(0); //쓴횟수
  const [lentNum, setLentNum] = useState(0); //빌린 횟수
  const [pageNum, setPageNum] = useState(0);
  const [writelevelNum, setWriteLevelNum] = useState(1);
  const [lentlevelNum, setLentLevelNum] = useState(0);
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
        'userWriteNumber',
        `${auth.currentUser.uid}`
      );
      const getData = async () => {
        const docSnap = await getDoc(docRef);
        console.log(docSnap.data());
        setWriteNum(docSnap.data().reviewsNumber);
        setLentNum(docSnap.data().lentsNumber);
      };
      getData();
    }
    fetchData();

    //레벨 설정 (1-5: leve1 / 6-10: level2 / ....)
    if (0<writeNum <=5){
      setWriteLevelNum(2);
    }else if (5<writeNum <=10){
      setWriteLevelNum(2);
      setWriteNum(writeNum-5); //프로그래스바 맞추기
    }else if (10<writeNum <=15){
      setWriteLevelNum(3);
      setWriteNum(writeNum-10); //프로그래스바 맞추기
    }

  });

  
  console.log('writeNum: ', writeNum);//쓴횟수
  console.log('lentNum: ', lentNum);//빌린횟수
  console.log('writelevelNum: ', writelevelNum);
  console.log('lentlevelNum: ', lentlevelNum);

  


  const navigate = useNavigate();

  const onLogOutClick = () => {
    const auth = getAuth();
    signOut(auth);
    navigate('/');
  };

  const onclick = () => {
    navigate('/Mypage/ProfileUpdate');
  };

  const onclick2 = () => {
    navigate('/Home');
  };

  const isdisabled=() => {
    if(writelevelNum===1){
      setDisable(true);
    };

  }

  const onMain=()=>{
    alert('level1 독스를 선택!')
  }

  return (
    <div className={styles.settings}>
      <div className={styles.setting}>
        내 독스
        <img src="https://cdn-icons-png.flaticon.com/512/1076/1076877.png" />
      </div>

      <div className={styles.profile}>
        <div className={styles.profile_detail}>
          <div style={{ marginBottom: '1px', marginTop: '6px' }}>
            <span className={styles.name}>북스 기록하기</span>
            <span className={styles.level}>{writelevelNum} Lv</span>
          </div>
          <div style={{ marginBottom: '0px' }}></div>
        </div>
      </div>
      
      <div style={{ marginBottom: '1px' }}>
            <ProgressBar
              completed={writeNum*20}
              bgColor="skyblue"
              width="78vw"
              height="3.5vw"
              labelSize="10px"
              labelColor="#474747"
              marginBottom="7px"/>
          </div>

          <div className={styles.message}>
        <span>레벨업으로 새로운 독스를 만날 수 있어요!</span>
      </div>
          <div class={styles.dogscontainer}>
          <div className={styles.dogs}>
          <img src={require("../assets/01.png")} />
          <button id="1" onClick={onMain}>level 1</button>   </div>
          
          <div className={styles.dogs}>
          <img src={require("../assets/02.png")} />
          <button id="2" disabled={writelevelNum===1}>level 2</button> </div>
          
          <div className={styles.dogs}>
          <img src={require("../assets/03.png")} />
          <button id="3" disabled={writelevelNum<=2}>level 3</button> </div>
          </div>
          
          <div class={styles.dogscontainer}>
          <div className={styles.dogs}>
          <img src={require("../assets/04.png")} />
          <button id="4" disabled={writelevelNum<=3}>level 4</button> </div>

          <div className={styles.dogs}>
          <img src={require("../assets/05.png")} />
          <button id="4" disabled={writelevelNum<=4}>level 5</button> </div>

          <div className={styles.dogs}>
          <img src={require("../assets/06.png")} />
          <button id="4" disabled={writelevelNum<=5}>level 6</button> </div>
          </div>
          

          <div style={{ marginBottom: '10px' }}></div>

      <div className={styles.profile}>
        <div className={styles.profile_detail}>
          <div style={{ marginBottom: '1px', marginTop: '20px' }}>
            {' '}
            <span className={styles.name}>북스 빌려주기</span>
            <span className={styles.level}>{lentlevelNum} Lv</span>
          </div>
          <div style={{ marginBottom: '1px' }}>
            <ProgressBar
              completed={lentNum*0}
              bgColor="skyblue"
              width="80vw"
              height="3.5vw"
              labelSize="10px"
              labelColor="#474747"
              marginBottom="7px"/>
          </div>

          <div className={styles.message}>
            <span>빌려주고 싶은 책을 업로드해 히든 아이템을 얻으세요</span>
          </div>
          <div class={styles.dogscontainer}>
          <div className={styles.dogs}>
          <img src={require("../assets/001.png")} />
          <button id="1" disabled={lentlevelNum==0} >level 1</button>   </div>
          
          <div className={styles.dogs}>
          <img src={require("../assets/002.png")} />
          <button id="2" disabled={lentlevelNum<=1}>level 2</button> </div>
          
          <div className={styles.dogs}>
          <img src={require("../assets/003.png")} />
          <button id="3" disabled={lentlevelNum<=2}>level 3</button> </div>
          </div>
          
          <div class={styles.dogscontainer}>
          <div className={styles.dogs}>
          <img src={require("../assets/004.png")} />
          <button id="4" disabled={lentlevelNum<=3}>level 4</button> </div>

          <div className={styles.dogs}>
          <img src={require("../assets/005.png")} />
          <button id="4" disabled={lentlevelNum<=4}>level 5</button> </div>

          <div className={styles.dogs}>
          <img src={require("../assets/006.png")} />
          <button id="4" disabled={lentlevelNum<=5}>level 6</button> </div>
          </div>
          


          <div className={styles.settings2}>
            <div style={{ marginTop: '40px' }}>
              <span>{`지금까지 ${userObj.displayName}님이`}</span>
              <br></br>
              <span>평가한 북스</span>
              <div></div>
              <Link to="/Library" className={styles.total}>{writeNum}</Link>
            </div>
            <hr className={styles.hr} />
          </div>

          <div className={styles.settings2}>
            <div style={{ marginTop: '0px' }}>
              <span>가장 최근에 읽은 북스</span>
              <div></div>
              <Link to="/Library" className={styles.total}>
                <span>"인간실격"</span>
              </Link>
            </div>
            <hr className={styles.hr} />
          </div>

          <div className={styles.setting2}>
            <div style={{ marginTop: '30px' }}>
              <span>독서취향 모아보기</span>
            </div>{' '}
          </div>
          <div className={styles.taste}>
            <img src={require('../assets/t1.png')} />
            <img src={require('../assets/t2.png')} />
            <img src={require('../assets/t3.png')} />
          </div>
          <hr className={styles.hr} />


          <div className={styles.setting}>
            <img src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png"
              className={styles.setting_img}/>
            프로필 수정
          </div>

          <button
            className={`${styles.setting} ${styles.logout}`}
            onClick={onLogOutClick}
          >
            <img src="https://cdn-icons-png.flaticon.com/512/159/159707.png" />
            로그아웃
          </button>
        </div>{' '}
      </div>
    </div>
  );
};

export default Profile;
