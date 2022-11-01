import { dbService } from "../fbase";
import { getAuth } from "firebase/auth";
import { getDoc, query, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Recommend = () => {
  const [genreArr, setGenreArr] = useState([]); //파이어베이스에 사용자 장르 객체 받아올 배열
  const auth = getAuth();

  useEffect(() => {
    async function fetchData() {
      const q = query(doc(dbService, "UserInfo", `${auth.currentUser.uid}`));
      const genreArr = await getDoc(q);
      let tempGenreArr = genreArr.data();
      setGenreArr(tempGenreArr); //파이어베이스에서 사용자 장르 정보 가져옴
    }
    fetchData();
  });

  console.log("genreArr: ", genreArr); //genreArr: {genre1: 0, genre2: 5, ...}

  let values = Object.values(genreArr); //genreArr객체의 값만 가져온 배열
  console.log("values: ", values);
  let maxValues = Math.max(...values); //values 중 최댓값
  console.log("Max: ", maxValues);

  let j = 0;
  let favorite = []; //최댓값을 가진 장르(다수일 수 있음)를 배열로 저장할 변수
  for (let i in genreArr) {
    if (genreArr[i] === maxValues) {
      favorite[j] = i;
      j++;
    } else {
      continue;
    }
  }
  console.log("favorite: ", favorite);

  for (let i in favorite) {
    //favorite에는 genre1, genre2 이런식으로 저장되어 있어서 바꿔줘야 함
    switch (String(favorite[i])) {
      case "genre1":
        favorite[i] = "가정/요리/뷰티";
        break;
      case "genre2":
        favorite[i] = "건강/취미/레저";
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
        favorite[i] = "일본도서";
        break;
      case "genre22":
        favorite[i] = "자기계발";
        break;
      case "genre23":
        favorite[i] = "잡지";
        break;
      case "genre24":
        favorite[i] = "장르소설";
        break;
      case "genre25":
        favorite[i] = "전집/중고전집";
        break;
      case "genre26":
        favorite[i] = "종교/역학";
        break;
      case "genre27":
        favorite[i] = "좋은부모";
        break;
      case "genre28":
        favorite[i] = "중학교참고서";
        break;
      case "genre29":
        favorite[i] = "청소년";
        break;
      case "genre30":
        favorite[i] = "청소년 추천도서";
        break;
      case "genre31":
        favorite[i] = "초등학교참고서";
        break;
      case "genre32":
        favorite[i] = "컴퓨터/모바일";
        break;
      case "minor":
        favorite[i] = "마이너";
        break;
    }
  }

  console.log("change favorite: ", favorite);
  //선호하는 장르가 여러 개일 수 있으므로 그 중 하나만 랜덤으로 뽑아 randomGenre에 저장함
  const randomGenre = favorite[Math.floor(Math.random() * favorite.length)];
  console.log("randomGenre: ", randomGenre);

  //선호하는 랜덤장르에 따라 Home에 표시되는 내용이 달라짐.
  switch (String(randomGenre)) {
    case "가정/요리/뷰티":
      console.log(
        "가정/요리/뷰티, ",
        `${auth.currentUser.displayName}`,
        "님의 추천도서"
      );
      break;
    case "건강/취미/레저":
      console.log(
        "건강/취미/레저, ",
        `${auth.currentUser.displayName}`,
        "님의 추천도서"
      );
      break;
    case "경제경영":
      console.log(
        "경제경영, ",
        `${auth.currentUser.displayName}`,
        "님의 추천도서"
      );
      break;
    case "고등학교참고서":
      console.log(
        "고등학교참고서, ",
        `${auth.currentUser.displayName}`,
        "님의 추천도서"
      );
      break;
    case "고전":
      console.log("고전, ", `${auth.currentUser.displayName}`, "님의 추천도서");
      break;
    case "과학":
      console.log("과학, ", `${auth.currentUser.displayName}`, "님의 추천도서");
      break;
    case "달력/기타":
      console.log(
        "달력/기타, ",
        `${auth.currentUser.displayName}`,
        "님의 추천도서"
      );
      break;
    case "대학교재/전문서적":
      console.log(
        "대학교재/전문서적, ",
        `${auth.currentUser.displayName}`,
        "님의 추천도서"
      );
      break;
    case "만화":
      console.log("만화, ", `${auth.currentUser.displayName}`, "님의 추천도서");
      break;
    case "사회과학":
      console.log(
        "사회과학, ",
        `${auth.currentUser.displayName}`,
        "님의 추천도서"
      );
      break;
    case "소설/시/희곡":
      console.log(
        "소설/시/희곡, ",
        `${auth.currentUser.displayName}`,
        "님의 추천도서"
      );
      break;
    case "수험서/자격증":
      console.log(
        "수험서/자격증, ",
        `${auth.currentUser.displayName}`,
        "님의 추천도서"
      );
      break;
    case "어린이":
      console.log(
        "어린이, ",
        `${auth.currentUser.displayName}`,
        "님의 추천도서"
      );
      break;
    case "에세이":
      console.log(
        "에세이, ",
        `${auth.currentUser.displayName}`,
        "님의 추천도서"
      );
      break;
    case "여행":
      console.log("여행, ", `${auth.currentUser.displayName}`, "님의 추천도서");
      break;
    case "역사":
      console.log("역사, ", `${auth.currentUser.displayName}`, "님의 추천도서");
      break;
    case "예술/대중문화":
      console.log(
        "예술/대중문화, ",
        `${auth.currentUser.displayName}`,
        "님의 추천도서"
      );
      break;
    case "외국어":
      console.log(
        "외국어, ",
        `${auth.currentUser.displayName}`,
        "님의 추천도서"
      );
      break;
    case "유아":
      console.log("유아, ", `${auth.currentUser.displayName}`, "님의 추천도서");
      break;
    case "인문학":
      console.log(
        "인문학, ",
        `${auth.currentUser.displayName}`,
        "님의 추천도서"
      );
      break;
    case "일본도서":
      console.log(
        "일본도서, ",
        `${auth.currentUser.displayName}`,
        "님의 추천도서"
      );
      break;
    case "자기계발":
      console.log(
        "자기계발, ",
        `${auth.currentUser.displayName}`,
        "님의 추천도서"
      );
      break;
    case "잡지":
      console.log("잡지, ", `${auth.currentUser.displayName}`, "님의 추천도서");
      break;
    case "장르소설":
      console.log(
        "장르소설, ",
        `${auth.currentUser.displayName}`,
        "님의 추천도서"
      );
      break;
    case "전집/중고전집":
      console.log(
        "전집/중고전집, ",
        `${auth.currentUser.displayName}`,
        "님의 추천도서"
      );
      break;
    case "종교/역학":
      console.log(
        "종교/역학, ",
        `${auth.currentUser.displayName}`,
        "님의 추천도서"
      );
      break;
    case "좋은부모":
      console.log(
        "좋은부모, ",
        `${auth.currentUser.displayName}`,
        "님의 추천도서"
      );
      break;
    case "중학교참고서":
      console.log(
        "중학교참고서, ",
        `${auth.currentUser.displayName}`,
        "님의 추천도서"
      );
      break;
    case "청소년":
      console.log(
        "청소년, ",
        `${auth.currentUser.displayName}`,
        "님의 추천도서"
      );
      break;
    case "청소년 추천도서":
      console.log(
        "청소년 추천도서, ",
        `${auth.currentUser.displayName}`,
        "님의 추천도서"
      );
      break;
    case "초등학교참고서":
      console.log(
        "초등학교참고서, ",
        `${auth.currentUser.displayName}`,
        "님의 추천도서"
      );
      break;
    case "컴퓨터/모바일":
      console.log(
        "컴퓨터/모바일, ",
        `${auth.currentUser.displayName}`,
        "님의 추천도서"
      );
      break;
    case "마이너":
      console.log(
        "마이너, ",
        `${auth.currentUser.displayName}`,
        "님의 추천도서"
      );
      break;
  }
};

export default Recommend;
