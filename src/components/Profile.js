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
  const [writeNum, setWriteNum] = useState(); //쓴횟수,,?
  const [lentNum, setLentNum] = useState(); //빌린 횟수
  const [pageNum, setPageNum] = useState(0);
  const [writelevelNum, setWriteLevelNum] = useState(1);
  const [lentlevelNum, setLentLevelNum] = useState(1);
  const [disable, setDisable] = React.useState(true);

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
        setLentNum(docSnap.data().lentNumber);
      };
      getData();
    }
    fetchData();
  });

  console.log('writeNum: ', writeNum);
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

  return (
    <div className={styles.settings}>
      <div className={styles.setting}>
        내 독스
        <img src="https://cdn-icons-png.flaticon.com/512/1076/1076877.png" />
      </div>

      <div className={styles.profile}>
        <div className={styles.profile_detail}>
          <div style={{ marginBottom: '3px', marginTop: '6px' }}>
            {' '}
            <span className={styles.name}>북스 기록하기</span>
            <span className={styles.level}>{writelevelNum} Lv</span>
          </div>
          <div style={{ marginBottom: '7px' }}></div>
        </div>{' '}
      </div>
      <div className={styles.message}>
        <span>레벨업으로 새로운 독스를 만날 수 있어요!</span>
      </div>

      <div className={styles.profile}>
        <div className={styles.profile_detail}>
          <div style={{ marginBottom: '3px', marginTop: '20px' }}>
            {' '}
            <span className={styles.name}>북스 빌려주기</span>
            <span className={styles.level}>{lentlevelNum} Lv</span>
          </div>
          <div style={{ marginBottom: '7px' }}>
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

          <div className={styles.settings}>
            <div style={{ marginTop: '20px' }}>
              <span>{`지금까지 ${userObj.displayName}님이`}</span>
              <br></br>
              <span>평가한 북스</span>
              <div></div>
              <Link to="/Library" className={styles.total}></Link>
            </div>
            <hr className={styles.hr} />
          </div>

          <div className={styles.settings}>
            <div style={{ marginTop: '20px' }}>
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
            <div style={{ marginTop: '20px' }}>
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
        </div>{' '}
      </div>
    </div>
  );
};

export default Profile;
