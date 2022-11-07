import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { dbService } from "../fbase";
import { getDoc, query, doc, getDocs, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Recommend } from "../components/Recommend";

import Top from "../components/Top";
import Top2 from "../components/Top2";
import CustomSlider, { TodaysSlider } from "../components/Slider";
import styles from "./css/Home.module.css";

const recommands = [
  {
    uri: "http://www.readersnews.com/news/photo/201707/73990_32707_616.jpg",
    id: 0,
    title: "범인없는 살인의 밤",
  },
  {
    uri:
      "https://img.daily.co.kr/@files/www.daily.co.kr/content_watermark/life/2017/20170504/859b9ec69dcef60de3606fd9eab7e29e.jpg",
    id: 1,
    title: "가면산장 살인사건",
  },
  {
    uri:
      "http://ojsfile.ohmynews.com/STD_IMG_FILE/2020/0418/IE002632888_STD.jpg",
    id: 2,
    title: "산매리 저수지",
  },
  {
    uri:
      "http://image.kyobobook.co.kr/images/book/xlarge/844/x9791158930844.jpg",
    id: 3,
    title: "도플갱어의 섬",
  },
  {
    uri: "https://newsimg.sedaily.com/2019/10/30/1VPQ0XY4RJ_1.jpg",
    id: 4,
    title: "동급생",
  },
];

const todays = [
  {
    uri:
      "http://image.kyobobook.co.kr/images/book/large/348/l9788960907348.jpg",
    title: "애쓰지 않아도",
    content: `사람의 마음은 좀처럼 지치지를 않나봐요. 자꾸만 노력하려 하고, 다가가려 해요. 나에게도 그 마음이 살아 있어요`,
    id: 0,
  },
  {
    uri:
      "http://image.kyobobook.co.kr/images/book/large/994/l9791188469994.jpg",
    title: "당신은 결국 무엇이든 해내는 사람",
    content:
      "흔들리고 떠밀리고 넘어져도 나는, 당신은, 우리는 결국 해낼 것이라는 믿음의 문장들",
    id: 1,
  },
  {
    uri:
      "http://image.kyobobook.co.kr/images/book/large/204/l9791165345204.jpg",
    title: "책들의 부엌",
    content:
      "갓 지은 맛있는 책 냄새가 폴폴 풍기는 여기는 ‘소양리 북스 키친’입니다",
    id: 2,
  },
  {
    uri:
      "http://image.kyobobook.co.kr/images/book/large/096/l9791191891096.jpg",
    title: "나로서 충분히 괜찮은 사람",
    content: "애써 노력하지 않아도 돼. 나는 나로서 충분히 괜찮은 사람이니까",
    id: 3,
  },
  {
    uri:
      "http://image.kyobobook.co.kr/images/book/large/497/l9791165213497.jpg",
    title: "우리는 조구만 존재야 ",
    content: "우리는 조구만 존재야. 조구맣지만 안 중요하단 건 아냐 ",
    id: 4,
  },
];

let booktitle = "";

const Home = ({ userObj }) => {
  let location = useLocation();
  const [pageNum, setPageNum] = useState(0);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [genreArr, setGenreArr] = useState([]);
  const [recommendBook, setRecommendBook] = useState([]);
  const auth = getAuth();

  useEffect(() => {
    if (location.state) {
      setPageNum(1);
    }

    async function fetchData() {
      const q = query(doc(dbService, "UserInfo", `${auth.currentUser.uid}`));
      const genreArr = await getDoc(q);
      let tempGenreArr = genreArr.data();

      setGenreArr(tempGenreArr);
    }
    fetchData();
  }, [pageNum]);

  console.log("genreArr: ", genreArr);

  let values = Object.values(genreArr || {});
  console.log("values: ", values);
  let maxValues = Math.max(...values);
  console.log("maxValue: ", maxValues);

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

  console.log("favoriteGenre: ", favorite);

  const randomGenre = favorite[Math.floor(Math.random() * favorite.length)];
  console.log("randomFavorite: ", randomGenre);
  let recommendName;

  switch (String(randomGenre)) {
    case "요리/살림":
      recommendName = "가정에 충실한, ";
      async function fetchData() {
        const rq = query(
          collection(dbService, "recommendData", "cook", "book")
        );
        const rquerySnapshot = await getDocs(rq);
        rquerySnapshot.forEach((doc) => {
          setRecommendBook((prev) => [
            ...prev,
            {
              title: doc.data().title,
              author: doc.data().author,
              genre: doc.data().genre,
              description: doc.data().description,
              cover: doc.data().cover,
            },
          ]);
        });
      }
      fetchData();
      break;
    case "건강/취미":
      recommendName = "건강튼튼이 최고!, ";
      break;
    case "경제경영":
      recommendName = "경제는 내손에, ";
      break;
    case "고등학교참고서":
      recommendName = "1등을 코앞에 둔, ";
      break;
    case "고전":
      recommendName = "근본 클래식파, ";
      break;
    case "과학":
      recommendName = "과학이 흥미로운, ";
      break;
    case "달력/기타":
      recommendName = "스케줄 정리 달인, ";
      break;
    case "대학교재/전문서적":
      recommendName = "놀 시간 없는, ";
      break;
    case "만화":
      recommendName = "만화세상에 사는, ";
      break;
    case "사회과학":
      recommendName = "세상소식이 궁금한, ";
      break;
    case "소설/시/희곡":
      recommendName = "흥미진진한 감성러, ";
      break;
    case "수험서/자격증":
      recommendName = "오늘도 열정적인, ";
      break;
    case "어린이":
      recommendName = "상큼한 새싹, ";
      break;
    case "에세이":
      recommendName = "에세이 수집가, ";
      break;
    case "여행":
      recommendName = "떠나고 싶은, ";
      break;
    case "역사":
      recommendName = "과거로부터 배움을 얻는, ";
      break;
    case "예술/대중문화":
      recommendName = "예술적인, ";
      break;
    case "외국어":
      recommendName = "오늘도 progress하는, ";
      break;
    case "유아":
      recommendName = "새싹키우미, ";
      break;
    case "인문학":
      recommendName = "박학다식, ";
      break;
    case "자기계발":
      recommendName = "성장하고 있는, ";
      break;
    case "잡지":
      recommendName = "감각적인, ";
      break;
    case "장르소설":
      recommendName = "소설은 장르가 중요한, ";
      break;
    case "전집/중고전집":
      recommendName = "모든 걸 보고싶은, ";
      break;
    case "종교/역학":
      recommendName = "독실한, ";
      break;
    case "좋은부모":
      recommendName = "좋은 부모, ";
      break;
    case "중학교참고서":
      recommendName = "학교 가기 싫은, ";
      break;
    case "청소년":
      recommendName = "무궁무진한, ";
      break;
    case "초등학교참고서":
      recommendName = "무궁무진한, ";
      break;
    case "컴퓨터/모바일":
      recommendName = "이게 왜 되는지 모르겠는, ";
      break;
    case "마이너":
      recommendName = "유니크한, ";
      break;
  }

  let navigate = useNavigate();
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setSearch(value);
  };

  const onSearch = async (e) => {
    try {
      const URL = `https://cors-anywhere.herokuapp.com/http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=ttblcyeon461605002&Query=${search}&QueryType=Title&MaxResults=3&start=1&Sort=Accuracy&SearchTarget=Book&output=js&Version=20131101`;
      const response = await axios.get(URL);
      const arr = response.data.item;
      arr.map((info) => data.push(info));

      navigate("/search", {
        state: {
          data,
          search,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.container}>
      <Top2 />

      <div className={styles.bookSearchForm}>
        <form>
          <label htmlFor="bookSearch"></label>
          <input
            type="text"
            id="bookSearch"
            placeholder="책을 기록해볼까요?"
            value={search}
            onChange={onChange}
          />
          <button type="button" id={styles.bookSearchBtn} onClick={onSearch}>
            검색
          </button>
        </form>
      </div>

      <div className={styles.profile}>
        <div
          className={styles.profile_comment}
        >{`${recommendName} ${userObj.displayName}님의 세계`}</div>
        <img
          src={require("../assets/titledog.png")}
          className={styles.profile_img}
        ></img>
        <Link to="/mypage" className={styles.plant}>
          <span>내가 모은 독스들 보기</span>
        </Link>
      </div>
      <div className={styles.recommands}>
        <span>{`${userObj.displayName}님을 위한 추천도서`}</span>
        <CustomSlider contents={recommands} className={styles.slider} />
      </div>
      <div className={styles.todays}>
        <span>오늘의 독스북스</span>
        <TodaysSlider contents={todays} />
      </div>
    </div>
  );
};

export default Home;
