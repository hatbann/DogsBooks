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

  console.log("change favorite: ", favorite);
  //선호하는 장르가 여러 개일 수 있으므로 그 중 하나만 랜덤으로 뽑아 randomGenre에 저장함
  const randomGenre = favorite[Math.floor(Math.random() * favorite.length)];
  console.log("randomGenre: ", randomGenre);

  switch (String(randomGenre)) {
    case "요리/살림":
      /*
      -사유식탁
      -만원으로 차리는 파인다이닝
      -올드패션 베이킹북
      -채소가득 이탈리아 가정식
      -프랑스자수 스티치200
      -커픽처스 커피 레시피101
      */
      break;
    case "건강/취미":
      /*
      -꿀단지곰의 레트로 게임 대백과
-백년 허리1
-당신은 사건 현장에 있습니다
-이게 다 호르몬 때문이야
-비비드 패션 연구실
-봄여름가을겨울 자수
*/
      break;
    case "경제경영":
      /*-트렌드 코리아 2023
-부자아빠 가난한 아빠
-유난한 도전
-부의 추월차선
-나의 월급 독립 프로젝트
-부자의 언어
*/
      break;
    case "고등학교참고서":
      /*
-신사고 쎈 고등수학(상)
-천일문 기본 베이직 1001
-EBS 수능특강 국어영역 독서
*/
      break;
    case "고전":
      /*
      -데미안
      -인간실격
      -군주론
      -종의 기원
      -호모 루덴스, 놀이하는 인간을 꿈꾸다
      -차라투스트라는 이렇게 말했다
      */
      break;
    case "과학":
      /*-물고기는 존재하지 않는다
-정리하는 뇌
-생물은 왜 죽는가
-이기적 유전자
-코스모스
-우리가 사랑에 빠질 수밖에 없는 이유
*/
      break;
    case "달력/기타":
      /*-오늘도 빵먹일력
-오늘을 채우는 일력
-오늘의 짤 일력
-어떻게 말해줘야 할까
-원페이지 가계부
-레버리지
*/
      break;
    case "대학교재/전문서적":
      /*-이기적 유전자
-점프 투 파이썬
-군중심리
-이것이 자바다
-서양미술사
-이기동 영어 구동사 연구
*/
      break;
    case "만화":
      /*-원피스
-주술회전
-이백오 상담소
-유희왕
-체인소맨
-망그러진 만화
*/
      break;
    case "사회과학":
      /*-여성, 경찰하는 마음
-계속 가보겠습니다
-타오르는 질문들
-말을 부수는 말
-제국의 충돌
-공정하다는 착각
*/
      break;
    case "소설/시/희곡":
      /*-아버지의 해방일지
-인생의 역사
-지구 끝의 온실
-참을 수 없는 존재의 가벼움
-이방인
-멋진 신세계
*/
      break;
    case "수험서/자격증":
      /*-써니 행정법총론
-전한길 한국사 합격생 
-민준호 독학 행정법
-강해준 경찰행정법
-문동균 한국사 기출은
-임용면접레시피기본서
*/
      break;
    case "어린이":
      /*
-마법천자문
-긴긴밤
-푸른 사자 와니니
-여름아이
-기소영의 친구들
-그리고 펌킨맨이 나타났다
*/
      break;
    case "에세이":
      /*
-인생의 역사
-진지하면 반칙이다
-마음세탁소
-땅콩일기
-아무튼, 사전
-계절의 위로
*/
      break;
    case "여행":
      /*
-미술관 읽는 시간
-뉴욕에 살고 있습니다
-제 마음대로 살아보겠습니다
-여행의 이유
-리얼교토
-디스이즈 스페인
*/
      break;
    case "역사":
      /*
-나의 문화유산 답사기
-사피엔스
-지리의 힘
-벌거벗은 한국사
-수학은 어떻게 문명을 만들었는가
-이순신의 바다
*/
      break;
    case "예술/대중문화":
      /*
-미술관 읽는 시간
-빌런의 공식
-딜레마 사전
-종이는 아름답다
-예술, 인간을 말하다
-방구석 미술관
*/
      break;
    case "외국어":
      /*
      -해커스 토익 기출보카
      -거의 모든 행동 표현의 영어
      -영어책
      -영어감정표현사전
      -세상 쉬운 영문법
      */
      break;
    case "유아":
      /*
      -오싹오싹 크레용!
      -알사탕
      -매일매일행복해
      -왼손에게
      -구름을 키우는 방법
      -사랑해 사랑해 사랑해
      */
      break;
    case "인문학":
      /*
      -인생의 허무를 어떻게 할 것인가
      -기억의 뇌과학
      -나의 문화유산답사기
      -마흔에 읽는 니체
      -위어드
      -총균쇠
      */
      break;
    case "자기계발":
      /*
      -합격공식
      -역행자
      -이 책은 돈 버는 법에 관한 이야기
      -조셉머피 부의 초월자
      -내 최고의 하루는 오늘부터 시작된다
      -우리, 편하게 말해요
      */
      break;
    case "잡지":
      break;
    case "장르소설":
      /*
      -외사랑
      -카미노 아일랜드
      -기묘한 이야기: 어둠의 날
      -해리포터와 불사조 기사단
      -내 동생의 무덤
      -노바
      */
      break;
    case "전집/중고전집":
      break;
    case "종교/역학":
      /*
      -나의 사주명리
      -잘 산다는 것
      -한국 교회 트렌드 2023
      -스크루테이프의 편지
      -조정민의 답답답
      -성육신
      */
      break;
    case "좋은부모":
      /*
      -세상에서 가장 쉬운 본질육아
      -이은경쌤의 초등어휘일력 365
      -올리버쌤의 미국식 아이 영어습관 365
      -엄마의 말 연습
      -어떻게 말해줘야 할까
      -어린이를 위한 초등 매일 글쓰기의 힘: 세줄쓰기
      */
      break;
    case "중학교참고서":
      break;
    case "청소년":
      /*
      -합격공식
      -마지막 이야기 전달자
      -코스모스
      -채리새우: 비밀글입니다
      -순례주택
      -위로의 미술관
      */
      break;
    case "초등학교참고서":
      break;
    case "컴퓨터/모바일":
      /*
      -진짜 스는 실무 엑셀
      -그림 잘 그리는 법
      -혼자 공부하는 파이썬
      -혼자 공부하는 컴퓨터 구조+운영체제
      -Do it! 점프 투 파이썬
      -클린코드
      */
      break;
    case "마이너":
      break;
  }
};

export default Recommend;
