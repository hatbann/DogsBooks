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

const cook = [
  {
    uri:
      "https://image.aladin.co.kr/product/30393/39/coversum/k582830065_1.jpg",
    id: 0,
    title:
      "사유 식탁 - 양장, 영혼의 허기를 달래는 알랭 드 보통의 132가지 레시피",
    author: "알랭 드 보통",
    dscr:
      "연애와 철학을 접목한 독특한 글쓰기로 ‘닥터 러브’라는 별칭까지 얻은 알랭 드 보통이 뜻밖…‘인생학교’를 통해 출간한 이 책에서 알랭 드 보통은 요리와 식사를 철학으로 사유한다.\n",
  },
  {
    uri:
      "https://image.aladin.co.kr/product/30328/13/coversum/k782839137_1.jpg",
    id: 1,
    title:
      "만 원으로 차리는 파인 다이닝 - 식비 걱정 NO! 요리용디 가성비 레시피",
    author: "요리용디",
    dscr:
      "87만 구독자가 인정한 푸드 크리에이터 요리용디의 ‘만 원으로 차리는 파인 다이닝’은 만 …쉽게 찾을 수 있는 재료로 파인 다이닝 레스토랑에서나 볼 법한 근사한 요리를 만들어낸다.",
  },
];
const health = [
  {
    uri:
      "https://image.aladin.co.kr/product/26952/44/coversum/k872730815_2.jpg",
    id: 0,
    title: "백년 허리 1 : 진단편 - 내 허리 통증 해석하기",
    author: "정선근",
    dscr:
      "서울대 의대 재활의학과 정선근 교수의 스테디셀러인 '백년허리'의 개정증보판이다. 백년허리의…을 뿐 아니라, 허리 통증은 진화의 축복이라는 요통에 대한 새로운 관점을 제시하고 있다.",
  },
  {
    uri:
      "https://image.aladin.co.kr/product/30083/38/coversum/k472839475_1.jpg",
    id: 1,
    title:
      "이게 다 호르몬 때문이야 - 내 몸과 마음이 달라지는 49가지 호르몬 법칙",
    author: "마쓰무라 게이코 (지은이), 이은혜 (옮긴이)",
    dscr:
      "불면증, 만성피로, 두통, 냉증, 어깨결림, 변비 등 신체 증상부터 우울, 무기력, 자기혐…활에서 흔히 겪는 불편함의 원인과 그 대처법을 그림과 함께 알기 쉽고 간결하게 정리했다.",
  },
];
const economy = [
  {
    uri:
      "https://image.aladin.co.kr/product/30169/22/coversum/8959897094_3.jpg",
    id: 0,
    title: "트렌드 코리아 2023 - 서울대 소비트렌드 분석센터의 2023 전망",
    author:
      "김난도, 전미영, 최지혜, 이수진, 권정윤, 이준영, 이향은, 한다혜, 이혜원, 추예린",
    dscr:
      "2년이 넘는 시간 동안 지속된 코로나19 사태를 거치면서 우리의 삶은 큰 변화를 맞이했다.…수는 없었다. 그렇다면 우리는 무엇을 무기로 삼아 변화로 가득한 세상을 헤쳐나갈 것인가?",
  },
  {
    uri:
      "https://image.aladin.co.kr/product/23616/25/coversum/k652638520_2.jpg",
    id: 1,
    title: "부자의 언어 - 어떻게 살아야 부자가 되는지 묻는 아들에게",
    author: "존 소포릭 (지은이), 이한이 (옮긴이)",
    dscr:
      "가난했던 한 아빠가 부자가 되기까지 지녔던 소신과 개념, 원칙을 솔직하고 다정한 목소리로 …은 인생에서 ‘경제적 자유’를 얻기 위해 노력한 한 아빠의 스펙터클한 여정이 담겨 있다.",
  },
];
const highschool = [
  {
    uri:
      "https://image.aladin.co.kr/product/27800/72/coversum/8928333369_1.jpg",
    id: 0,
    title: "신사고 쎈 고등 수학 (상) (2023년용)",
    author:
      "홍범준, 김의석, 김형정, 김형균, 김윤희, 신사고수학콘텐츠연구회 (지은이)",
    dscr:
      "전국 고등학교 내신 기출 문제와 평가원.수능 기출 문제는 물론 수많은 기본서, 내신서, 수…어 수준별로 구성하고, 유형 뽀개기에서는 이를 다시 하, 중, 상의 난이도로 세분하였다.",
  },
  {
    uri:
      "https://image.aladin.co.kr/product/28101/59/coversum/8968062285_1.jpg",
    id: 1,
    title:
      "천일문 기본 Basic 1001 Sentences - 2021년 최신개정판/고1 대상/천일비급 별책포함",
    author: "김기훈, 쎄듀 영어교육연구센터 (지은이)",
    dscr:
      "체계적인 구문 개념 학습을 원하는 학생을 위해 제작되었다. 총 1,001개 문장으로 구성되…어 읽기와 구문 분석을 제공하고 있기 때문에 혼자서도 기초를 체계적으로 학습할 수 있다.",
  },
];
const classic = [
  {
    uri: "https://image.aladin.co.kr/product/26/0/coversum/s742633278_1.jpg",
    id: 0,
    title: "데미안",
    author: "헤르만 헤세 (지은이), 전영애 (옮긴이)",
    dscr:
      "2차 세계대전 중 많은 독일 젊은이들이 전장에 나가면서 군복 주머니 속에 품고 갔던 책. …이들을 그렸다. 지금까지도 젊은이들에게 '통과의례'처럼 읽히고 있는 명작을 새로 옮겼다.",
  },
  {
    uri: "https://image.aladin.co.kr/product/49/16/coversum/893746103x_3.jpg",
    id: 1,
    title: "인간 실격",
    author: "다자이 오사무 (지은이), 김춘미 (옮긴이)",
    dscr:
      "자살 미수와 약물 중독, 39세의 젊은 나이에 자살로 생을 마감한 다자이 오사무의 작품 <…타임스는 '인간의 나약함을 드러내는 데 있어 다자이보다 뛰어난 작가는 드물다'고 평했다.",
  },
];
const science = [
  {
    uri:
      "https://image.aladin.co.kr/product/30275/28/coversum/k962839725_1.jpg",
    id: 0,
    title: "생물은 왜 죽는가",
    author: "고바야시 다케히코",
    dscr:
      "노화는 죽음을 향해 다가가고 있다는 신호로서 우리에게 죽음에 대한 공포를 불러일으킨다. 도…인 저자가 우리에게 절대 공포로 남아 있는 ‘죽음’의 의미를 생물학의 관점에서 풀어낸다.",
  },
  {
    uri: "https://image.aladin.co.kr/product/54/7/coversum/898371154x_2.jpg",
    id: 1,
    title: "코스모스",
    author: "칼 세이건 (지은이), 홍승수 (옮긴이)",
    dscr:
      "<콘택트>, <창백한 푸른 점> 등의 지은이 칼 세이건의 저작 중에서 가장 유명한 이 책은…어, 출간 20년이 훌쩍 넘은 지금도 가장 읽을만한 교양서 중 하나로 자리매김하고 있다.",
  },
];
const calendar = [
  {
    uri:
      "https://image.aladin.co.kr/product/30382/27/coversum/8925577364_1.jpg",
    id: 0,
    title: "2023 오늘도 빵먹일력 (스프링)",
    author: "주쓰",
    dscr:
      "밥 없이는 살아도, 빵 없이는 못 사는 전국의 빵순이들을 위해 준비한 '다운타운믹스주쓰' …, 귀엽지만 어딘가 이상하면서 파괴적인 캐릭터들이 특징인 다믹주 세계관을 기반으로 한다.",
  },
  {
    uri: "https://image.aladin.co.kr/product/30314/1/coversum/k572839130_1.jpg",
    id: 1,
    title: "2023 인생일력",
    author: "민음사 편집부 (지은이)",
    dscr:
      "2018년부터 많은 사랑을 받아온 민음사 인생일력이 올해에도 찾아왔다. 민음사의 동양고전 …에 편지를 쓰거나, 그날그날 마음을 적어 보자. 당신의 하루가 소중한 기록이 될 것이다.",
  },
];
const university = [
  {
    uri:
      "https://image.aladin.co.kr/product/19338/44/coversum/k892635608_1.jpg",
    id: 0,
    title: "이기적 유전자, 반격의 사피엔스 - 진화생물학에서 찾은 행복의 기원",
    author: "권행백 (지은이)",
    dscr:
      "나의 개성과 존재의 근원은 무엇인가?”라는 물음에서 출발하는 인문서이며,  ‘자기답게 살기’의 노하우를 진화생물학에서 구하는 행복론이다.",
  },
  {
    uri: "https://image.aladin.co.kr/product/2499/38/coversum/8931007329_1.jpg",
    id: 1,
    title: "군중심리",
    author: "귀스타브 르 봉 (지은이), 이재형 (옮긴이)",
    dscr:
      "군중의 심리를 일찍이 간파한 이들은 손쉽게 군중의 지배자가 될 수 있다. 세계의 모든 지배… 어리석고 우매한 군중의 심리를 본능적으로 확실하게 알고 있는 무의식적 심리학자들이었다.",
  },
];
const comic = [
  {
    uri:
      "https://image.aladin.co.kr/product/30342/47/coversum/k382839443_1.jpg",
    id: 0,
    title: "주술회전 20",
    author: "아쿠타미 게게 (지은이), 이정운 (옮긴이)",
    dscr:
      "서로의 술식으로 인해 압사 직전에 놓인 후시구로와 레지. 대치 상황을 타파하기 위해 레지가… 무너뜨리고, 과거 주술사와 특급 주령을 끼워 넣은 치열하기 그지없는 싸움을 펼치는데?!",
  },
  {
    uri:
      "https://image.aladin.co.kr/product/30154/21/coversum/k302839487_1.jpg",
    id: 1,
    title: "체인소 맨 : 버디 스토리즈",
    author: "히시카와 사카쿠 (지은이), 후지모토 타츠키 (원작)",
    dscr:
      "방약무인한 자칭 명탐정 파워와 조수 신세가 된 덴지. 콤비 결성 후 9년 차, 공안에서의 …버디를 주제로 한 세 가지 이야기에, 보너스 트랙으로 꿈의 에노시마 스토리까지 수록했다.",
  },
];
const socialScience = [
  {
    uri: "https://image.aladin.co.kr/product/30217/0/coversum/k462839495_1.jpg",
    id: 0,
    title: "말을 부수는 말 - 왜곡되고 둔갑되는 권력의 언어를 해체하기",
    author: "이라영",
    dscr:
      "한국 사회의 뜨거운 논제들을 치밀하고 날카롭게 다뤄오며, 시대를 통찰하는 저서를 집필해온 예술사회학자 이라영의 2년 만의 단독 저서이다.",
  },
  {
    uri:
      "https://image.aladin.co.kr/product/30313/93/coversum/k212839130_1.jpg",
    id: 1,
    title: "제국의 충돌 - ‘차이메리카’에서 ‘신냉전’으로",
    author: "훙호펑 (지은이), 하남석 (옮긴이)",
    dscr:
      "미국과 중국 기업들 사이의 변화가 두 나라의 정치적 관계 변화의 기저에 있다는 것을 논증한…관계 악화를 민주주의 체제-권위주의 체제의 대립으로 설명하는 것과는 차별화되는 지점이다.",
  },
];
const novel = [
  {
    uri:
      "https://image.aladin.co.kr/product/27692/63/coversum/s772839857_2.jpg",
    id: 0,
    title: "지구 끝의 온실",
    author: "김초엽",
    dscr:
      "김초엽 첫 장편소설. 『우리가 빛의 속도로 갈 수 없다면』을 통해 이미 폭넓은 독자층을 형…을 받고 있는 김초엽 작가는 더스트로 멸망한 이후의 세계를 첫 장편소설의 무대로 삼았다.",
  },
  {
    uri: "https://image.aladin.co.kr/product/610/30/coversum/8937462346_3.jpg",
    id: 1,
    title: "참을 수 없는 존재의 가벼움",
    author: "밀란 쿤데라 (지은이), 이재룡 (옮긴이)",
    dscr:
      "역사의 상처에서 태어나 단 한 번도 존재의 가벼움을 느껴 보지 못한 현대인, 그들의 삶과 … 약한 테레자, 사비나의 외로운 삶. 토마시에게 테레자는 무거움이요 사비나는 가벼움이다.",
  },
];
/*
const test=[
  {
    uri:
    id: 0,
    title:
    author:
    dscr:
  },
  {
    uri:
    id: 1,
    title:
    author:
    dscr:
  },
];
const kid=[
  {
    uri:
    id: 0,
    title:
    author:
    dscr:
  },
  {
    uri:
    id: 1,
    title:
    author:
    dscr:
  },
];
*/
const essay = [
  {
    uri:
      "https://image.aladin.co.kr/product/30328/61/coversum/k362839230_1.jpg",
    id: 0,
    title: "인생의 역사 - '공무도하가'에서 '사랑의 발명'까지",
    author: "신형철 ",
    dscr:
      "우리 문학을 향한 '정확한 사랑'이자 시대를 읽는 탁월한 문장, 평론가 신형철이 4년 만의…를 읽고 시를 나누는 이야기, 그리하여 시에서 인생을 배우고 인생을 시로 이루는 글이다.",
  },
  {
    uri:
      "https://image.aladin.co.kr/product/28388/33/coversum/k732835819_1.jpg",
    id: 1,
    title: "땅콩일기 - 쩡찌 그림 에세이",
    author: "쩡찌",
    dscr:
      "작가 쩡찌가 ‘땅콩’을 통해 일상에서 겪는 마음의 일들을 진솔하게 담아낸 그림일기. 201…롭게 편집해 선보이는 소장판이다. 이에 더해 추가컷, 미공개 에피소드 등을 다수 담았다.",
  },
];
/*
const travel=[
  {
    uri:
    id: 0,
    title:
    author:
    dscr:
  },
  {
    uri:
    id: 1,
    title:
    author:
    dscr:
  },
];
*/
const history = [
  {
    uri:
      "https://image.aladin.co.kr/product/30354/12/coversum/8936479202_1.jpg",
    id: 0,
    title: "[세트] 나의 문화유산답사기 11~12 서울편 세트 - 전2권",
    author: "유홍준",
    dscr:
      "도서 '나의 문화유산답사기 서울편 11'과 '나의 문화유산답사기 서울편 12' 세트 상품이다.",
  },
  {
    uri: "https://image.aladin.co.kr/product/5686/87/coversum/s702536164_1.jpg",
    id: 1,
    title:
      "사피엔스 - 유인원에서 사이보그까지, 인간 역사의 대담하고 위대한 질문",
    author: "유발 하라리 (지은이), 조현욱 (옮긴이), 이태수 (감수)",
    dscr:
      "재레드 다이아몬드, 대니얼 카너먼, 마크 저커버그가 격찬한 베스트셀러. 멀고먼 인류의 시원…거쳐 끊임없이 진화해온 인간의 역사를 다양하고 생생한 시각으로 조명한 전인미답의 문제작.",
  },
];
const art = [
  {
    uri:
      "https://image.aladin.co.kr/product/30119/96/coversum/s592839818_1.jpg",
    id: 0,
    title: "미술관을 빌려드립니다 : 프랑스 편 - 당신을 위한 특별한 초대",
    author: "이창용",
    dscr:
      "루브르 박물관을 비롯해 오르세, 오랑주리, 로댕 미술관 등 프랑스를 대표하는 미술관을 돌아…를 거쳐 인상주의까지 서양 미술사조의 주요 흐름을 꿰뚫는 걸작들을 만나는 미술 기행서다.",
  },
  {
    uri: "https://image.aladin.co.kr/product/30374/6/coversum/k042839959_1.jpg",
    id: 1,
    title: "미술관 읽는 시간 - 도슨트 정우철과 거니는 한국의 미술관 7선",
    author: "정우철",
    dscr:
      "손안에서 펼쳐지는 한국의 미술관들을 도슨트 정우철과 함께 읽는 시간. 환기미술관, 장욱진미…관 7곳을 엄선해 ‘미술관의 피리 부는 남자’, ‘미술관의 아이돌’ 정우철이 도슨트한다.",
  },
];
/*
const language=[
  {
    uri:
    id: 0,
    title:
    author:
    dscr:
  },
  {
    uri:
    id: 1,
    title:
    author:
    dscr:
  },
];
const baby=[
  {
    uri:
    id: 0,
    title:
    author:
    dscr:
  },
  {
    uri:
    id: 1,
    title:
    author:
    dscr:
  },
];
*/
const humanities = [
  {
    uri:
      "https://image.aladin.co.kr/product/30382/55/coversum/k272830862_1.jpg",
    id: 0,
    title: "인생의 허무를 어떻게 할 것인가",
    author: "김영민",
    dscr:
      "사상사 연구자이자 칼럼니스트인 김영민 서울대 교수가 들려주는 인생의 허무와 더불어 사는 법…인 ‘허무’에 대한 오래된 사유의 결과물을 그만의 독특한 시선으로 포착해내고 재해석했다.",
  },
  {
    uri: "https://image.aladin.co.kr/product/30192/3/coversum/k142839095_1.jpg",
    id: 1,
    title: "총 균 쇠",
    author: "재레드 다이아몬드 (지은이), 김진준 (옮긴이)",
    dscr:
      "왜 어떤 민족들은 다른 민족들의 정복과 지배의 대상으로 전락하고 말았는가. 왜 원주민들은 …가. “인간 사회의 다양한 문명은 어디서 비롯되는가?”라는 의문을 명쾌하게 분석한 명저.",
  },
];
/*
const selfDevelope=[
  {
    uri:
    id: 0,
    title:
    author:
    dscr:
  },
  {
    uri:
    id: 1,
    title:
    author:
    dscr:
  },
];
const allbook=[
  {
    uri:
    id: 0,
    title:
    author:
    dscr:
  },
  {
    uri:
    id: 1,
    title:
    author:
    dscr:
  },
];
const religion=[
  {
    uri:
    id: 0,
    title:
    author:
    dscr:
  },
  {
    uri:
    id: 1,
    title:
    author:
    dscr:
  },
];
const goodParent=[
  {
    uri:
    id: 0,
    title:
    author:
    dscr:
  },
  {
    uri:
    id: 1,
    title:
    author:
    dscr:
  },
];
const middleschool=[
  {
    uri:
    id: 0,
    title:
    author:
    dscr:
  },
  {
    uri:
    id: 1,
    title:
    author:
    dscr:
  },
];
const teen=[
  {
    uri:
    id: 0,
    title:
    author:
    dscr:
  },
  {
    uri:
    id: 1,
    title:
    author:
    dscr:
  },
];
const elementary=[
  {
    uri:
    id: 0,
    title:
    author:
    dscr:
  },
  {
    uri:
    id: 1,
    title:
    author:
    dscr:
  },
];
*/
const computer = [
  {
    uri:
      "https://image.aladin.co.kr/product/25155/25/coversum/k282633473_1.jpg",
    id: 0,
    title: "모던 자바스크립트 Deep Dive - 자바스크립트의 기본 개념과 동작 원리",
    author: "이웅모",
    dscr:
      "자바스크립트를 둘러싼 기본 개념을 정확하고 구체적으로 설명하고, 자바스크립트 코드의 동작 …코드가 컴퓨터 내부에서 어떻게 동작할 것인지 예측하고, 명확히 설명할 수 있도록 돕는다.",
  },
  {
    uri:
      "https://image.aladin.co.kr/product/28819/83/coversum/k152836497_2.jpg",
    id: 1,
    title:
      "진짜 쓰는 실무 엑셀 - 유튜브 대표 엑셀 채널, 오빠두가 알려 주는 엑셀 함수, 보고서 작성, 데이터 분석 노하우!",
    author: "오빠두(전진권)",
    dscr:
      "대기업 직장 생활 10년의 실무 노하우와 엑셀 유튜브 채널을 운영하면서 들은 수많은 직장인…는 실무 엑셀' 한 권이면 빠른 일 처리로 워라밸을 실현하고, 일잘러로 거듭날 수 있다!",
  },
];
/*
const minor=[
  {
    uri:
    id: 0,
    title:
    author:
    dscr:
  },
  {
    uri:
    id: 1,
    title:
    author:
    dscr:
  },
];
*/

const recommands = [
  {
    uri:
      "https://image.aladin.co.kr/product/30393/39/coversum/k582830065_1.jpg",
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
  //위에 주소: 베스트셀러 받아오는 주소... today에 뜨게 해주세요
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
  const auth = getAuth();
  const [bestseller, setBestseller] = useState([]);

  useEffect(() => {
    if (location.state) {
      setPageNum(1);
    }
    async function fetchData() {
      const q = query(doc(dbService, "UserInfo", `${auth.currentUser.uid}`));
      const time = new Date();
      const year = Number(time.getFullYear());
      const month = Number(time.getMonth());

      const bestsellerURL = `https://cors-anywhere.herokuapp.com/https://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=ttblcyeon461605002&QueryType=Bestseller&MaxResults=5&start=1&SearchTarget=Book&output=js&Version=20131101`;
      const genreArr = await getDoc(q);
      let tempGenreArr = genreArr.data();
      setGenreArr(tempGenreArr);
      const response = await axios.get(bestsellerURL);
      const arr = response.data.item;
      setBestseller(arr);
      console.log(arr);
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
  let recommendBook = []; //사용자 선호 장르 별 추천 책(1권씩 나오게)->recommand위치에 뜨게 하면 됨
  //아래 switch문에서 주석 처리 되어 있는 장르는 아직 책 등록 안 해 놓음
  switch (String(randomGenre)) {
    case "요리/살림":
      recommendName = "가정에 충실한, ";
      recommendBook = cook[Math.floor(Math.random() * cook.length)];
      console.log("recommendBook: ", recommendBook);
      break;
    case "건강/취미":
      recommendName = "건강튼튼 최고!, ";
      recommendBook = health[Math.floor(Math.random() * cook.length)];
      console.log("recommendBook: ", recommendBook);
      break;
    case "경제경영":
      recommendName = "경제는 내손에, ";
      recommendBook = economy[Math.floor(Math.random() * cook.length)];
      console.log("recommendBook: ", recommendBook);
      break;
    case "고등학교참고서":
      recommendName = "1등을 코앞에 둔, ";
      recommendBook = highschool[Math.floor(Math.random() * cook.length)];
      break;
    case "고전":
      recommendName = "근본 클래식파, ";
      recommendBook = classic[Math.floor(Math.random() * cook.length)];
      break;
    case "과학":
      recommendName = "과학이 흥미로운, ";
      recommendBook = science[Math.floor(Math.random() * cook.length)];
      console.log("recommendBook: ", recommendBook);
      break;
    case "달력/기타":
      recommendName = "스케줄 정리 달인, ";
      recommendBook = calendar[Math.floor(Math.random() * cook.length)];
      break;
    case "대학교재/전문서적":
      recommendName = "놀 시간 없는, ";
      recommendBook = university[Math.floor(Math.random() * cook.length)];
      break;
    case "만화":
      recommendName = "만화세상에 사는, ";
      recommendBook = comic[Math.floor(Math.random() * cook.length)];
      break;
    case "사회과학":
      recommendName = "세상소식이 궁금한, ";
      recommendBook = socialScience[Math.floor(Math.random() * cook.length)];
      break;
    case "소설/시/희곡":
      recommendName = "흥미진진한 감성러, ";
      recommendBook = novel[Math.floor(Math.random() * cook.length)];
      break;
    case "수험서/자격증":
      recommendName = "오늘도 열정적인, ";
      //recommendBook = cook[Math.floor(Math.random() * cook.length)];
      break;
    case "어린이":
      recommendName = "상큼한 새싹, ";
      //recommendBook = cook[Math.floor(Math.random() * cook.length)];
      break;
    case "에세이":
      recommendName = "에세이 수집가, ";
      recommendBook = essay[Math.floor(Math.random() * cook.length)];
      break;
    case "여행":
      recommendName = "떠나고 싶은, ";
      //recommendBook = travel[Math.floor(Math.random() * cook.length)];
      break;
    case "역사":
      recommendName = "과거로부터 배우는, ";
      recommendBook = history[Math.floor(Math.random() * cook.length)];
      break;
    case "예술/대중문화":
      recommendName = "예술적인, ";
      recommendBook = art[Math.floor(Math.random() * cook.length)];
      break;
    case "외국어":
      recommendName = "오늘도 progress하는, ";
      //recommendBook = cook[Math.floor(Math.random() * cook.length)];
      break;
    case "유아":
      recommendName = "새싹키우미, ";
      //recommendBook = cook[Math.floor(Math.random() * cook.length)];
      break;
    case "인문학":
      recommendName = "박학다식, ";
      recommendBook = humanities[Math.floor(Math.random() * cook.length)];
      break;
    case "자기계발":
      recommendName = "성장하고 있는, ";
      //recommendBook = cook[Math.floor(Math.random() * cook.length)];
      break;
    case "잡지":
      recommendName = "감각적인, ";
      //recommendBook = cook[Math.floor(Math.random() * cook.length)];
      break;
    case "장르소설":
      recommendName = "소설은 장르지!, ";
      //recommendBook = cook[Math.floor(Math.random() * cook.length)];
      break;
    case "전집/중고전집":
      recommendName = "모든 걸 보고싶은, ";
      //recommendBook = cook[Math.floor(Math.random() * cook.length)];
      break;
    case "종교/역학":
      recommendName = "독실한, ";
      //recommendBook = cook[Math.floor(Math.random() * cook.length)];
      break;
    case "좋은부모":
      recommendName = "좋은 부모, ";
      //recommendBook = cook[Math.floor(Math.random() * cook.length)];
      break;
    case "중학교참고서":
      recommendName = "학교 가기 싫은, ";
      //recommendBook = cook[Math.floor(Math.random() * cook.length)];
      break;
    case "청소년":
      recommendName = "무궁무진한, ";
      //recommendBook = cook[Math.floor(Math.random() * cook.length)];
      break;
    case "초등학교참고서":
      recommendName = "무궁무진한, ";
      //recommendBook = cook[Math.floor(Math.random() * cook.length)];
      break;
    case "컴퓨터/모바일":
      recommendName = "이게 왜 돼?, ";
      recommendBook = computer[Math.floor(Math.random() * cook.length)];
      break;
    case "마이너":
      recommendName = "유니크한, ";
      //recommendBook = minor[Math.floor(Math.random() * cook.length)];
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

  const onClick = () => {
    const bookinfo = {
      ...recommendBook,
      cover: recommendBook.uri,
      description: recommendBook.dscr,
    };
    try {
      navigate("/search/bookinfo", {
        state: {
          bookinfo,
        },
      });
    } catch (error) {
      console.log(error);
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
      <div className={styles.recommands} onClick={onClick}>
        <span>{`${userObj.displayName}님을 위한 추천도서`}</span>
        <div>
          <img src={recommendBook.uri}></img>
          <h3>{recommendBook.title}</h3>
        </div>
      </div>
      <div className={styles.todays}>
        <span>오늘의 독스북스</span>
        <TodaysSlider contents={bestseller} />
      </div>
    </div>
  );
};

export default Home;
