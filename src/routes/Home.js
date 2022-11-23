import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { dbService } from '../fbase';
import { getDoc, query, doc, getDocs, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

import Top from '../components/Top';
import Top2 from '../components/Top2';
import CustomSlider, { TodaysSlider } from '../components/Slider';
import styles from './css/Home.module.css';
import { render } from '@testing-library/react';

import main1 from '../assets/main1.png';
import main2 from '../assets/main2.png';
import main3 from '../assets/main3.png';
import main4 from '../assets/main4.png';
import main5 from '../assets/main5.png';
import main6 from '../assets/main6.png';

const cook = [
  {
    uri:
      'https://image.aladin.co.kr/product/30393/39/coversum/k582830065_1.jpg',
    id: 0,
    title:
      '사유 식탁 - 양장, 영혼의 허기를 달래는 알랭 드 보통의 132가지 레시피',
    author: '알랭 드 보통',

    categoryName: '국내도서>요리/살림',
    dscr:
      "연애와 철학을 접목한 독특한 글쓰기로 ‘닥터 러브’라는 별칭까지 얻은 알랭 드 보통. '인생학교’를 통해 출간한 이 책에서 알랭 드 보통은 요리와 식사를 철학으로 사유한다.\n",
  },
  {
    uri:
      'https://image.aladin.co.kr/product/30328/13/coversum/k782839137_1.jpg',
    id: 1,
    title:
      '만 원으로 차리는 파인 다이닝 - 식비 걱정 NO! 요리용디 가성비 레시피',
    author: '요리용디',

    categoryName: '국내도서>요리/살림',
    dscr:
      '87만 구독자가 인정한 푸드 크리에이터 요리용디의 ‘만 원으로 차리는 파인 다이닝’은 쉽게 찾을 수 있는 재료로 파인 다이닝 레스토랑에서나 볼 법한 근사한 요리를 만들어낸다.',
  },
];
const health = [
  {
    uri:
      'https://image.aladin.co.kr/product/26952/44/coversum/k872730815_2.jpg',
    id: 0,
    title: '백년 허리 1 : 진단편 - 내 허리 통증 해석하기',
    author: '정선근',

    categoryName: '국내도서>건강/취미',
    dscr:
      '서울대 의대 재활의학과 정선근 교수, 허리 통증은 진화의 축복이라는 요통에 대한 새로운 관점을 제시하고 있다.',
  },
  {
    uri:
      'https://image.aladin.co.kr/product/30083/38/coversum/k472839475_1.jpg',
    id: 1,

    categoryName: '국내도서>건강/취미',
    title:
      '이게 다 호르몬 때문이야 - 내 몸과 마음이 달라지는 49가지 호르몬 법칙',
    author: '마쓰무라 게이코 (지은이), 이은혜 (옮긴이)',
    dscr:
      '불면증, 만성피로, 두통, 냉증, 어깨결림, 변비 등 신체 증상부터 우울, 무기력, 자기혐오... 일상생활에서 흔히 겪는 불편함의 원인과 그 대처법을 그림과 함께 알기 쉽고 간결하게 정리했다.',
  },
];
const economy = [
  {
    uri:
      'https://image.aladin.co.kr/product/30169/22/coversum/8959897094_3.jpg',
    id: 0,
    categoryName: '국내도서>경제경영',
    title: '트렌드 코리아 2023 - 서울대 소비트렌드 분석센터의 2023 전망',

    author:
      '김난도, 전미영, 최지혜, 이수진, 권정윤, 이준영, 이향은, 한다혜, 이혜원, 추예린',
    dscr:
      '2년이 넘는 시간 동안 지속된 코로나19 사태를 거치면서 우리의 삶은 큰 변화를 맞이했다. 그렇다면 우리는 무엇을 무기로 삼아 변화로 가득한 세상을 헤쳐나갈 것인가?',
  },
  {
    uri:
      'https://image.aladin.co.kr/product/23616/25/coversum/k652638520_2.jpg',
    id: 1,
    categoryName: '국내도서>경제경영',
    title: '부자의 언어 - 어떻게 살아야 부자가 되는지 묻는 아들에게',
    author: '존 소포릭 (지은이), 이한이 (옮긴이)',

    dscr:
      '가난했던 한 아빠가 부자가 되기까지 지녔던 소신과 개념, 인생에서 ‘경제적 자유’를 얻기 위해 노력한 한 아빠의 스펙터클한 여정이 담겨 있다.',
  },
];
const highschool = [
  {
    uri:
      'https://image.aladin.co.kr/product/27800/72/coversum/8928333369_1.jpg',
    id: 0,
    categoryName: '국내도서>고등학교참고서',
    title: '신사고 쎈 고등 수학 (상) (2023년용)',
    author:
      '홍범준, 김의석, 김형정, 김형균, 김윤희, 신사고수학콘텐츠연구회 (지은이)',
    dscr:
      '전국 고등학교 내신 기출 문제와 평가원.수능 기출 문제는 물론 수많은 기본서, 내신서, 수…어 수준별로 구성하고, 유형 뽀개기에서는 이를 다시 하, 중, 상의 난이도로 세분하였다.',
  },
  {
    uri:
      'https://image.aladin.co.kr/product/28101/59/coversum/8968062285_1.jpg',
    id: 1,

    categoryName: '국내도서>고등학교참고서',
    title:
      '천일문 기본 Basic 1001 Sentences - 2021년 최신개정판/고1 대상/천일비급 별책포함',

    author: '김기훈, 쎄듀 영어교육연구센터 (지은이)',
    dscr:
      '체계적인 구문 개념 학습을 원하는 학생을 위해 제작되었다. 총 1,001개 문장으로 구성되…어 읽기와 구문 분석을 제공하고 있기 때문에 혼자서도 기초를 체계적으로 학습할 수 있다.',
  },
];
const classic = [
  {
    uri: 'https://image.aladin.co.kr/product/26/0/coversum/s742633278_1.jpg',
    id: 0,
    title: '데미안',
    categoryName: '국내도서>고전',
    author: '헤르만 헤세 (지은이), 전영애 (옮긴이)',

    dscr:
      "2차 세계대전 중 많은 독일 젊은이들이 전장에 나가면서 군복 주머니 속에 품고 갔던 책. 지금까지도 젊은이들에게 '통과의례'처럼 읽히고 있는 명작을 새로 옮겼다.",
  },
  {
    uri: 'https://image.aladin.co.kr/product/49/16/coversum/893746103x_3.jpg',
    id: 1,
    title: '인간 실격',
    categoryName: '국내도서>고전',
    author: '다자이 오사무 (지은이), 김춘미 (옮긴이)',

    dscr:
      "자살 미수와 약물 중독, 39세의 젊은 나이에 자살로 생을 마감한 다자이 오사무의 작품. '인간의 나약함을 드러내는 데 있어 다자이보다 뛰어난 작가는 드물다'고 평했다.",
  },
];
const science = [
  {
    uri:
      'https://image.aladin.co.kr/product/30275/28/coversum/k962839725_1.jpg',
    id: 0,
    categoryName: '국내도서>과학',
    title: '생물은 왜 죽는가',
    author: '고바야시 다케히코',

    dscr:
      '노화는 죽음을 향해 다가가고 있다는 신호로서 우리에게 죽음에 대한 공포를 불러일으킨다. 저자가 우리에게 절대 공포로 남아 있는 ‘죽음’의 의미를 생물학의 관점에서 풀어낸다.',
  },
  {
    uri: 'https://image.aladin.co.kr/product/54/7/coversum/898371154x_2.jpg',
    id: 1,
    categoryName: '국내도서>과학',
    title: '코스모스',
    author: '칼 세이건 (지은이), 홍승수 (옮긴이)',

    dscr:
      '<콘택트>, <창백한 푸른 점> 등의 지은이 칼 세이건의 저작 중에서 가장 유명한 책. 출간 20년이 훌쩍 넘은 지금도 가장 읽을만한 교양서 중 하나로 자리매김하고 있다.',
  },
];
const calendar = [
  {
    uri:
      'https://image.aladin.co.kr/product/30382/27/coversum/8925577364_1.jpg',
    id: 0,
    title: '2023 오늘도 빵먹일력 (스프링)',
    author: '주쓰',

    categoryName: '국내도서>달력/기타',
    dscr:
      "밥 없이는 살아도, 빵 없이는 못 사는 전국의 빵순이들을 위해 준비한 '다운타운믹스주쓰' …, 귀엽지만 어딘가 이상하면서 파괴적인 캐릭터들이 특징인 다믹주 세계관을 기반으로 한다.",
  },
  {
    uri: 'https://image.aladin.co.kr/product/30314/1/coversum/k572839130_1.jpg',
    id: 1,
    categoryName: '국내도서>달력/기타',
    title: '2023 인생일력',
    author: '민음사 편집부 (지은이)',
    dscr:
      '2018년부터 많은 사랑을 받아온 민음사 인생일력이 올해에도 찾아왔다. 민음사의 동양고전 …에 편지를 쓰거나, 그날그날 마음을 적어 보자. 당신의 하루가 소중한 기록이 될 것이다.',
  },
];
const university = [
  {
    uri:
      'https://image.aladin.co.kr/product/19338/44/coversum/k892635608_1.jpg',
    id: 0,
    title: '이기적 유전자, 반격의 사피엔스 - 진화생물학에서 찾은 행복의 기원',
    author: '권행백 (지은이)',

    categoryName: '국내도서>대학교재/전문서적',
    dscr:
      '나의 개성과 존재의 근원은 무엇인가?”라는 물음에서 출발하는 인문서이며,  ‘자기답게 살기’의 노하우를 진화생물학에서 구하는 행복론이다.',
  },
  {
    uri: 'https://image.aladin.co.kr/product/2499/38/coversum/8931007329_1.jpg',
    id: 1,
    categoryName: '국내도서>대학교재/전문서적',
    title: '군중심리',
    author: '귀스타브 르 봉 (지은이), 이재형 (옮긴이)',
    dscr:
      '군중의 심리를 일찍이 간파한 이들은 손쉽게 군중의 지배자가 될 수 있다. 세계의 모든 지배… 어리석고 우매한 군중의 심리를 본능적으로 확실하게 알고 있는 무의식적 심리학자들이었다.',
  },
];
const comic = [
  {
    uri:
      'https://image.aladin.co.kr/product/30342/47/coversum/k382839443_1.jpg',
    id: 0,
    categoryName: '국내도서>만화',
    title: '주술회전 20',
    author: '아쿠타미 게게 (지은이), 이정운 (옮긴이)',

    dscr:
      '서로의 술식으로 인해 압사 직전에 놓인 후시구로와 레지. 대치 상황을 타파하기 위해 레지가… , 과거 주술사와 특급 주령을 끼워 넣은 치열하기 그지없는 싸움을 펼치는데?!',
  },
  {
    uri:
      'https://image.aladin.co.kr/product/30154/21/coversum/k302839487_1.jpg',
    id: 1,
    categoryName: '국내도서>만화',
    title: '체인소 맨 : 버디 스토리즈',
    author: '히시카와 사카쿠 (지은이), 후지모토 타츠키 (원작)',
    dscr:
      '방약무인한 자칭 명탐정 파워와 조수 신세가 된 덴지. 콤비 결성 후 9년 차, 공안에서의 …버디를 주제로 한 세 가지 이야기에, 보너스 트랙으로 꿈의 에노시마 스토리까지 수록했다.',
  },
];
const socialScience = [
  {
    uri: 'https://image.aladin.co.kr/product/30217/0/coversum/k462839495_1.jpg',
    id: 0,
    title: '말을 부수는 말 - 왜곡되고 둔갑되는 권력의 언어를 해체하기',
    author: '이라영',

    categoryName: '국내도서>사회과학',
    dscr:
      '한국 사회의 뜨거운 논제들을 치밀하고 날카롭게 다뤄오며, 시대를 통찰하는 저서를 집필해온 예술사회학자 이라영의 2년 만의 단독 저서이다.',
  },
  {
    uri:
      'https://image.aladin.co.kr/product/30313/93/coversum/k212839130_1.jpg',
    id: 1,
    categoryName: '국내도서>사회과학',
    title: '제국의 충돌 - ‘차이메리카’에서 ‘신냉전’으로',
    author: '훙호펑 (지은이), 하남석 (옮긴이)',
    dscr:
      '미국과 중국 기업들 사이의 변화가 두 나라의 정치적 관계 변화의 기저에 있다는 것을 논증한…관계 악화를 민주주의 체제-권위주의 체제의 대립으로 설명하는 것과는 차별화되는 지점이다.',
  },
];
const novel = [
  {
    uri:
      'https://image.aladin.co.kr/product/27692/63/coversum/s772839857_2.jpg',
    id: 0,
    categoryName: '국내도서>소설/시/희곡',
    title: '지구 끝의 온실',
    author: '김초엽',
    dscr:
      '김초엽 첫 장편소설. 『우리가 빛의 속도로 갈 수 없다면』을 통해 이미 폭넓은 독자층을 형…을 받고 있는 김초엽 작가는 더스트로 멸망한 이후의 세계를 첫 장편소설의 무대로 삼았다.',
  },
  {
    uri: 'https://image.aladin.co.kr/product/610/30/coversum/8937462346_3.jpg',
    id: 1,
    categoryName: '국내도서>소설/시/희곡',
    title: '참을 수 없는 존재의 가벼움',
    author: '밀란 쿤데라 (지은이), 이재룡 (옮긴이)',
    dscr:
      '역사의 상처에서 태어나 단 한 번도 존재의 가벼움을 느껴 보지 못한 현대인, 그들의 삶과 … 약한 테레자, 사비나의 외로운 삶. 토마시에게 테레자는 무거움이요 사비나는 가벼움이다.',
  },
];
const test = [
  {
    uri:
      'https://image.aladin.co.kr/product/30260/99/coversum/k722839710_1.jpg',
    id: 0,
    title: '2023 써니 행정법총론 기출문제집 - 전2권',
    categoryName: '국내도서>수험서/자격증',
    author: '박준철 (지은이)',
    dscr:
      '16년간(2007~2022년) 필수 기출문제를 철저히 분석하였다. 최신 기출문제로 2022…급과 2021년 국가직 7급, 지방직ㆍ서울시 7급, 경행경채, 행정사 문제를 수록하였다.',
  },
  {
    uri: 'https://image.aladin.co.kr/product/30258/0/coversum/k062839604_1.jpg',
    id: 1,
    title: '2023 전한길 한국사 기출 회독 트레이닝 모의고사',
    categoryName: '국내도서>수험서/자격증',
    author: '전한길 (지은이)',
    dscr:
      '최근 출제 경향에 가장 적합한 기출문제를 변형하거나 재배치하여 모의고사 형태로 구현한 기출…면밀히 분석하고, 빈출 쟁점에 대한 사료 및 선택지를 조합하여 기출 문제를 재구성하였다.',
  },
];
const kid = [
  {
    uri:
      'https://image.aladin.co.kr/product/26302/71/coversum/8954677150_1.jpg',
    id: 0,
    categoryName: '국내도서>어린이>동화/명작/고전>국내창작동화',
    title: '긴긴밤 - 제21회 문학동네어린이문학상 대상 수상작',
    author: '루리 (지은이)',
    dscr:
      '제21회 문학동네어린이문학상 대상 수상작. 지구상의 마지막 하나가 된 흰바위코뿔소 노든과 버려진 알에서 태어난 어린 펭귄이 수없는 긴긴밤을 함께하며, 바다를 찾아가는 이야기이다.',
  },
  {
    uri: 'https://image.aladin.co.kr/product/6232/31/coversum/8936442805_1.jpg',
    id: 1,
    categoryName: '국내도서>어린이>동화/명작/고전>국내창작동화',
    title: '푸른 사자 와니니',
    author: '이현 (지은이), 오윤화 (그림)',
    dscr:
      "창비아동문고 시리즈 280권. '짜장면 불어요!', '로봇의 별'의 작가 이현의 장편동화. 쓸모없다는 이유로 무리에서 쫓겨난 사자 와니니가 초원을 떠돌며 겪는 일들을 그린 동화로, 아프리카의 광활한 초원에서 펼쳐지는 모험을 사실적이고 감동적으로 담아냈다.",
  },
];
const essay = [
  {
    uri:
      'https://image.aladin.co.kr/product/30328/61/coversum/k362839230_1.jpg',
    id: 0,
    title: "인생의 역사 - '공무도하가'에서 '사랑의 발명'까지",
    author: '신형철 ',

    categoryName: '국내도서>에세이',
    dscr:
      "우리 문학을 향한 '정확한 사랑'이자 시대를 읽는 탁월한 문장, 평론가 신형철이 4년 만의…를 읽고 시를 나누는 이야기, 그리하여 시에서 인생을 배우고 인생을 시로 이루는 글이다.",
  },
  {
    uri:
      'https://image.aladin.co.kr/product/28388/33/coversum/k732835819_1.jpg',
    id: 1,
    title: '땅콩일기 - 쩡찌 그림 에세이',
    author: '쩡찌',

    categoryName: '국내도서>에세이',
    dscr:
      '작가 쩡찌가 ‘땅콩’을 통해 일상에서 겪는 마음의 일들을 진솔하게 담아낸 그림일기. 201…롭게 편집해 선보이는 소장판이다. 이에 더해 추가컷, 미공개 에피소드 등을 다수 담았다.',
  },
];
const travel = [
  {
    uri: 'https://image.aladin.co.kr/product/29960/9/coversum/k922838147_1.jpg',
    id: 0,
    categoryName: '국내도서>여행>미국여행>미국여행 에세이',
    title: '뉴욕에 살고 있습니다 - 유튜버 하루데이가 기록한 낭만적인 도시 풍경',
    author: '하루 (지은이)',
    dscr:
      '감성적이고 따스한 시선으로 뉴욕에서의 일상을 기록한 영상으로 많은 사랑을 받고 있는 유튜버 하루데이가 걷다가 멈추어 서서 바라본 뉴욕의 풍경들을 담았다.저자의 시선 속에 맺힌 도시의 풍경은 마치 영화의 스틸컷 같고, 단정하고 담백한 문장들은 정제된 대사처럼 느껴진다.',
  },
  {
    uri:
      'https://image.aladin.co.kr/product/18827/60/coversum/8954655971_3.jpg',
    id: 1,
    categoryName: '국내도서>에세이>한국에세이',
    title: '여행의 이유 - 김영하 산문',
    author: '김영하 (지은이)',
    dscr:
      "'이 책을 쓰는 데 내 모든 여행의 경험이 필요했다.' 작가 김영하가 처음 여행을 떠났던 순간부터 최근의 여행까지, 오랜 시간 여행을 하면서 느끼고 생각했던 것들을 아홉 개의 이야기로 풀어낸 산문이다.",
  },
];
const history = [
  {
    uri:
      'https://image.aladin.co.kr/product/30354/12/coversum/8936479202_1.jpg',
    id: 0,
    title: '[세트] 나의 문화유산답사기 11~12 서울편 세트 - 전2권',
    author: '유홍준',

    categoryName: '국내도서>역사',
    dscr:
      "도서 '나의 문화유산답사기 서울편 11'과 '나의 문화유산답사기 서울편 12' 세트 상품이다.",
  },
  {
    uri: 'https://image.aladin.co.kr/product/5686/87/coversum/s702536164_1.jpg',
    id: 1,

    categoryName: '국내도서>역사',
    title:
      '사피엔스 - 유인원에서 사이보그까지, 인간 역사의 대담하고 위대한 질문',

    author: '유발 하라리 (지은이), 조현욱 (옮긴이), 이태수 (감수)',
    dscr:
      '재레드 다이아몬드, 대니얼 카너먼, 마크 저커버그가 격찬한 베스트셀러. 멀고먼 인류의 시원…거쳐 끊임없이 진화해온 인간의 역사를 다양하고 생생한 시각으로 조명한 전인미답의 문제작.',
  },
];
const art = [
  {
    uri:
      'https://image.aladin.co.kr/product/30119/96/coversum/s592839818_1.jpg',
    id: 0,
    categoryName: '국내도서>예술/대중문화',
    title: '미술관을 빌려드립니다 : 프랑스 편 - 당신을 위한 특별한 초대',
    author: '이창용',
    dscr:
      '루브르 박물관을 비롯해 오르세, 오랑주리, 로댕 미술관 등 프랑스를 대표하는 미술관을 돌아…를 거쳐 인상주의까지 서양 미술사조의 주요 흐름을 꿰뚫는 걸작들을 만나는 미술 기행서다.',
  },
  {
    uri: 'https://image.aladin.co.kr/product/30374/6/coversum/k042839959_1.jpg',
    id: 1,
    categoryName: '국내도서>예술/대중문화',
    title: '미술관 읽는 시간 - 도슨트 정우철과 거니는 한국의 미술관 7선',
    author: '정우철',
    dscr:
      '손안에서 펼쳐지는 한국의 미술관들을 도슨트 정우철과 함께 읽는 시간. 환기미술관, 장욱진미…관 7곳을 엄선해 ‘미술관의 피리 부는 남자’, ‘미술관의 아이돌’ 정우철이 도슨트한다.',
  },
];
const language = [
  {
    uri: 'https://image.aladin.co.kr/product/29021/3/coversum/8960499374_1.jpg',
    id: 0,
    title: '거의 모든 행동 표현의 영어',
    author: '서영조 (지은이)',
    dscr:
      '영어를 잘하는 가장 빠른 지름길 중 하나가 우리가 하는 행동을 영어로 어떻게 표현하는지 정…담았다. 여기에 장기 기억을 돕는 이미지를 더해 학습의 부담은 줄이고 재미는 끌어올렸다.',
    categoryName: '국내도서>외국어>영어회화>생활영어',
  },
  {
    uri:
      'https://image.aladin.co.kr/product/30388/57/coversum/k432830965_1.jpg',
    id: 1,
    title: '영어책 - The Book of English, 개정판',
    author: '아우레오 배 (지은이)',
    categoryName: '국내도서>외국어>영어학습법',
    dscr:
      '영어의 기본 동사 61개와 그 동사로 할 수 있는 영어다운 표현, phrasal verbs…s를 전 세계에서 통용되는 국제 영어에 초점을 맞추어 모두 정리해 한 권에 담은 책이다.',
  },
];
const baby = [
  {
    uri:
      'https://image.aladin.co.kr/product/30021/16/coversum/8964964764_1.jpg',
    id: 0,
    title: '오싹오싹 크레용!',
    author: '에런 레이놀즈 (지은이), 피터 브라운 (그림), 홍연미 (옮긴이)',
    dscr:
      '출간과 동시에 뉴욕타임스 베스트셀러, 아마존 그림책 베스트셀러로 자리 매김한 화제의 그림책…런 레이놀즈와 피터 브라운 콤비가 선물하는 흥미진진한 이야기와 짜릿한 재미를 만나 보자.',
    categoryName: '국내도서>유아>그림책>나라별 그림책>미국',
  },
  {
    uri:
      'https://image.aladin.co.kr/product/30068/16/coversum/k332839662_1.jpg',
    id: 1,
    title: '왼손에게',
    author: '한지원 (지은이)',
    dscr:
      'Dear 그림책 시리즈. 첫 장부터 마지막 장까지 오롯이 손의 움직임을 따라 손만 보여주는 그림책이다. 왼손과 오른손. 누구나 공감할 수 있고 모두에게 친숙한 ‘손’을 주인공으로, 작가는 모든 관계에 대해 말한다.',
    categoryName: '국내도서>유아>그림책>나라별 그림책>한국 그림책',
  },
];
const humanities = [
  {
    uri:
      'https://image.aladin.co.kr/product/30382/55/coversum/k272830862_1.jpg',
    id: 0,
    title: '인생의 허무를 어떻게 할 것인가',
    author: '김영민',

    categoryName: '국내도서>인문학',
    dscr:
      '사상사 연구자이자 칼럼니스트인 김영민 서울대 교수가 들려주는 인생의 허무와 더불어 사는 법…인 ‘허무’에 대한 오래된 사유의 결과물을 그만의 독특한 시선으로 포착해내고 재해석했다.',
  },
  {
    uri: 'https://image.aladin.co.kr/product/30192/3/coversum/k142839095_1.jpg',
    id: 1,
    title: '총 균 쇠',
    categoryName: '국내도서>인문학',
    author: '재레드 다이아몬드 (지은이), 김진준 (옮긴이)',
    dscr:
      '왜 어떤 민족들은 다른 민족들의 정복과 지배의 대상으로 전락하고 말았는가. 왜 원주민들은 …가. “인간 사회의 다양한 문명은 어디서 비롯되는가?”라는 의문을 명쾌하게 분석한 명저.',
  },
];
const selfDevelope = [
  {
    uri:
      'https://image.aladin.co.kr/product/29521/63/coversum/8901260719_3.jpg',
    id: 0,
    title: '역행자 - 돈·시간·운명으로부터 완전한 자유를 얻는 7단계 인생 공략집',
    author: '자청 (지은이)',
    categoryName: '국내도서>자기계발>성공>성공학',
    dscr:
      '어느 날 혜성처럼 나타나 자수성가의 아이콘이 된 청년, 자기계발 유튜버 자청이 깨달은 인생의 치트키를 탈탈 털어 넣은 그의 첫 책 《역행자》가 드디어 출간된다. 수많은 ‘자청 챌린저’들이 기다려온 책이자, 독자들의 인생을 송두리째 바꿔줄 문제작이다.',
  },
  {
    uri:
      'https://image.aladin.co.kr/product/30331/35/coversum/k642839237_1.jpg',
    id: 1,
    title: '조셉 머피 부의 초월자 - 무한의 부를 창조하는 잠재의식의 힘',
    author: '조셉 머피 (지은이), 조율리 (옮긴이)',
    dscr:
      '부(富)와 잠재의식에 관한 그의 모든 지식과 통찰이 총망라된 최신 개정판으로서, 총 5권의 ‘조셉 머피 시리즈’ 중 첫 번째 책이다. 특히 이번 시리즈는 조셉 머피 재단에서 인정받은 유일한 공식 저서이며, 펭귄 위즈덤 하우스에서 출간한 10권을 각각 주제별로 묶어 재편집한 것이다.',
    categoryName: '국내도서>자기계발>성공>성공학',
  },
];
const genreNovel = [
  {
    uri:
      'https://image.aladin.co.kr/product/30149/75/coversum/k642839488_1.jpg',
    id: 0,
    title: '외사랑',
    categoryName:
      '국내도서>소설/시/희곡>추리/미스터리소설>일본 추리/미스터리소설',
    author: '히가시노 게이고 (지은이), 민경욱 (옮긴이)',
    dscr:
      '치열했던 학창 시절을 함께 보낸 친구의 성정체성 고백에서부터 시작하는 이 작품은 우리 삶과 매우 밀접하면서도 심오한 ‘젠더’를 주제로 한다. 묵직한 테마를 담아냄과 동시에 살인사건과 그 이면에 숨겨진 진상을 풀어나가는 스토리의 큰 줄기를 통해 미스터리적 재미까지 놓치지 않았다.',
  },
  {
    uri:
      'https://image.aladin.co.kr/product/28487/27/coversum/8934974923_1.jpg',
    id: 1,
    title: '내 동생의 무덤',
    author: '로버트 두고니 (지은이), 이원경 (옮긴이)',
    dscr:
      '트레이시의 여동생 세라가 실종됐다. 범인으로 체포된 사람은 마을 외곽에 살던 에드먼드 하우스. 세라의 시신이 끝내 발견되지 않았지만 성범죄 전과가 있는 에드먼드는 정황증거만으로 1급 살인 유죄를 선고받았다. 그날의 재판에서 수상한 점을 발견한 트레이시는 진실을 찾기 위해 형사가 된다.',
    categoryName:
      '국내도서>소설/시/희곡>추리/미스터리소설>영미 추리/미스터리소설',
  },
];
const religion = [
  {
    uri:
      'https://image.aladin.co.kr/product/30373/77/coversum/k062839958_1.jpg',
    id: 0,
    title:
      '나의 사주명리 - 언젠가 한번은 자신의 힘으로 사주를 풀어 보고 싶은 이들을 위한 안내',
    author: '현묘 (지은이)',
    categoryName: '국내도서>인문학>동양철학>동양철학 일반',
    dscr:
      '자신의 사주명리를 직접 풀이할 수 있는 길을 찬찬히 안내하는 사주명리 입문서다. 사주명리의 출발점인 만세력에서 사주명리의 모든 것이라고 해도 과언이 아닌 십신까지 차근차근 단계를 밟아 나간다.',
  },
  {
    uri:
      'https://image.aladin.co.kr/product/30369/10/coversum/k302839859_1.jpg',
    id: 1,
    title: '성육신 - 하늘과 땅이 겹치는 경이',
    author: '윌리엄 윌리몬 (지은이), 정다운 (옮긴이)',
    dscr:
      '성육신이란 무엇인가? 왜 그토록 성육신이라는 사건은 그리스도교에서 중요한가? 성육신의 의미, 더 나아가 그리스도교 신앙의 의미에 대해 성찰할 수 있게 해주는 얇고도 매력적인 입문서.',
    categoryName:
      '국내도서>종교/역학>기독교(개신교)>기독교(개신교) 목회/신학>신학일반',
  },
];
const goodParent = [
  {
    uri:
      'https://image.aladin.co.kr/product/30177/32/coversum/8950941813_1.jpg',
    id: 0,
    title:
      '세상에서 가장 쉬운 본질육아 - 삶의 근본을 보여주는 부모, 삶을 스스로 개척하는 아이',
    author: '지나영 (지은이)',
    dscr:
      '삶을 스스로 개척하는 내면이 단단한 아이로 키우는 ‘본질육아법’을 소개한다. 왜 열심히 아이를 키우고 있는데도 불안한지, 왜 잘못된 방향인 줄 알면서도 남들 하는 대로 따라 하는지, 왜 공든 육아가 한순간에 무너져내리는지, 대한민국 부모들의 육아 고충을 근본적으로 해결해줄 명쾌한 해법과 쉬운 실천법을 담았다.',
    categoryName: '국내도서>좋은부모>육아>육아법/육아 일반',
  },
  {
    uri:
      'https://image.aladin.co.kr/product/25313/30/coversum/8934986654_1.jpg',
    id: 1,
    title: '어떻게 말해줘야 할까 - 오은영의 현실밀착 육아회화',
    author: '오은영 (지은이), 차상미 (그림)',
    dscr:
      '‘국민 육아멘토’ ‘대한민국 엄마·아빠들의 엄마’ 오은영 박사의 신간. 누구나 쉽게 따라 할 수 있는 ‘부모의 말 한마디’를 친절하게 알려주는 책이다. 아이에게 하는 부모의 말이 잔소리가 아니라 효과적인 훈육이 되는 방법을 소개한다. 차상미 작가의 그림을 여럿 더하여 따스함과 친근한 분위기도 느껴진다.',
    categoryName: '국내도서>좋은부모>육아>육아법/육아 일반',
  },
];
const teen = [
  {
    uri: 'https://image.aladin.co.kr/product/17970/0/coversum/k362633102_1.jpg',
    id: 0,
    title: '채리새우: 비밀글입니다',
    author: '황영미 (지은이)',
    dscr:
      '제9회 문학동네청소년문학상 대상 수상작. 관계의 굴레와 스트레스에서 벗어나 스스로를 있는 그대로 사랑하기까지 다현이의 여정이 담겼다. 교실에서 펼쳐지는 복잡하고 미묘한 관계의 풍경, 그러한 관계를 겪어 내는 중2 화자의 목소리가 너무도 생생하다.',
    categoryName: '국내도서>청소년>청소년 문학>청소년 소설',
  },
  {
    uri:
      'https://image.aladin.co.kr/product/30035/51/coversum/k502839261_1.jpg',
    id: 1,
    title: '위로의 미술관 - 지친 하루의 끝, 오직 나만을 위해 열려 있는',
    author: '진병관 (지은이)',
    dscr:
      '베스트셀러 <기묘한 미술관>의 저자이자 프랑스 공인 문화해설사 진병관은 신작 <위로의 미술관>을 통해 모든 좌절을 경험했기에 오히려 모두를 위로할 수 있었던 25명의 화가와 그들의 작품을 소개한다.',
    categoryName: '국내도서>예술/대중문화>미술>미술 이야기',
  },
];
const computer = [
  {
    uri:
      'https://image.aladin.co.kr/product/25155/25/coversum/k282633473_1.jpg',
    id: 0,
    categoryName: '국내도서>컴퓨터',
    title: '모던 자바스크립트 Deep Dive - 자바스크립트의 기본 개념과 동작 원리',
    author: '이웅모',
    dscr:
      '자바스크립트를 둘러싼 기본 개념을 정확하고 구체적으로 설명하고, 자바스크립트 코드의 동작 …코드가 컴퓨터 내부에서 어떻게 동작할 것인지 예측하고, 명확히 설명할 수 있도록 돕는다.',
  },
  {
    uri:
      'https://image.aladin.co.kr/product/28819/83/coversum/k152836497_2.jpg',
    id: 1,
    categoryName: '국내도서>컴퓨터',
    title:
      '진짜 쓰는 실무 엑셀 - 유튜브 대표 엑셀 채널, 오빠두가 알려 주는 엑셀 함수, 보고서 작성, 데이터 분석 노하우!',
    author: '오빠두(전진권)',
    dscr:
      "대기업 직장 생활 10년의 실무 노하우와 엑셀 유튜브 채널을 운영하면서 들은 수많은 직장인…는 실무 엑셀' 한 권이면 빠른 일 처리로 워라밸을 실현하고, 일잘러로 거듭날 수 있다!",
  },
];

let booktitle = '';

const Home = ({ userObj }) => {
  let location = useLocation();

  const [pageNum, setPageNum] = useState(0);
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [genreArr, setGenreArr] = useState([]);
  const auth = getAuth();
  const [bestseller, setBestseller] = useState([]);
  const [newSpecial, setNewSpecial] = useState([]);
  const [imgNum, setImgNum] = useState(1);
  const [userImg, setUserImg] = useState();

  useEffect(() => {
    if (location.state) {
      setPageNum(1);
      // setImgNum(1);
      console.log(location.state);
      setImgNum(location.state.imgNum); //레벨 버튼 눌러서 state값 넘겨줌.
      console.log('location: ', location);
      console.log('imgNum: ', imgNum);
    }

    async function fetchData() {
      const q = query(doc(dbService, 'UserInfo', `${auth.currentUser.uid}`));
      const time = new Date();
      const year = Number(time.getFullYear());
      const month = Number(time.getMonth());

      const bestsellerURL = `https://cors-anywhere.herokuapp.com/https://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=ttblcyeon461605002&QueryType=Bestseller&MaxResults=5&start=1&SearchTarget=Book&output=js&Version=20131101`;
      const newSpecialURL = `https://cors-anywhere.herokuapp.com/https://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=ttblcyeon461605002&QueryType=ItemNewSpecial&MaxResults=5&start=1&SearchTarget=Book&output=js&Version=20131101`;
      const genreArr = await getDoc(q);
      let tempGenreArr = genreArr.data();
      setGenreArr(tempGenreArr);
      const response = await axios.get(bestsellerURL);
      const nsResponse = await axios.get(newSpecialURL);
      const arr = response.data.item;
      const nsArr = nsResponse.data.item;
      setBestseller(arr);
      setNewSpecial(nsArr);
      console.log(arr);
    }
    fetchData();
  }, [pageNum]);

  console.log('genreArr: ', genreArr);

  let values = Object.values(genreArr || {});
  console.log('values: ', values);
  let maxValues = Math.max(...values);
  console.log('maxValue: ', maxValues);

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
      case 'genre1':
        favorite[i] = '요리/살림';
        break;
      case 'genre2':
        favorite[i] = '건강/취미';
        break;
      case 'genre3':
        favorite[i] = '경제경영';
        break;
      case 'genre4':
        favorite[i] = '고등학교참고서';
        break;
      case 'genre5':
        favorite[i] = '고전';
        break;
      case 'genre6':
        favorite[i] = '과학';
        break;
      case 'genre7':
        favorite[i] = '달력/기타';
        break;
      case 'genre8':
        favorite[i] = '대학교재/전문서적';
        break;
      case 'genre9':
        favorite[i] = '만화';
        break;
      case 'genre10':
        favorite[i] = '사회과학';
        break;
      case 'genre11':
        favorite[i] = '소설/시/희곡';
        break;
      case 'genre12':
        favorite[i] = '수험서/자격증';
        break;
      case 'genre13':
        favorite[i] = '어린이';
        break;
      case 'genre14':
        favorite[i] = '에세이';
        break;
      case 'genre15':
        favorite[i] = '여행';
        break;
      case 'genre16':
        favorite[i] = '역사';
        break;
      case 'genre17':
        favorite[i] = '예술/대중문화';
        break;
      case 'genre18':
        favorite[i] = '외국어';
        break;
      case 'genre19':
        favorite[i] = '유아';
        break;
      case 'genre20':
        favorite[i] = '인문학';
        break;
      case 'genre21':
        favorite[i] = '자기계발';
        break;
      case 'genre22':
        favorite[i] = '잡지';
        break;
      case 'genre23':
        favorite[i] = '장르소설';
        break;
      case 'genre24':
        favorite[i] = '전집/중고전집';
        break;
      case 'genre25':
        favorite[i] = '종교/역학';
        break;
      case 'genre26':
        favorite[i] = '좋은부모';
        break;
      case 'genre27':
        favorite[i] = '중학교참고서';
        break;
      case 'genre28':
        favorite[i] = '청소년';
        break;
      case 'genre29':
        favorite[i] = '초등학교참고서';
        break;
      case 'genre30':
        favorite[i] = '컴퓨터/모바일';
        break;
      case 'minor':
        favorite[i] = '마이너';
        break;
    }
  }

  console.log('favoriteGenre: ', favorite);

  const randomGenre = favorite[Math.floor(Math.random() * favorite.length)];
  console.log('randomFavorite: ', randomGenre);
  let recommendName;
  let recommendBook = [];

  switch (String(randomGenre)) {
    case '요리/살림':
      recommendName = '가정에 충실한, ';
      recommendBook = cook[Math.floor(Math.random() * cook.length)];
      console.log('recommendBook: ', recommendBook);
      break;
    case '건강/취미':
      recommendName = '건강튼튼 최고!, ';
      recommendBook = health[Math.floor(Math.random() * cook.length)];
      console.log('recommendBook: ', recommendBook);
      break;
    case '경제경영':
      recommendName = '경제는 내손에, ';
      recommendBook = economy[Math.floor(Math.random() * cook.length)];
      console.log('recommendBook: ', recommendBook);
      break;
    case '고등학교참고서':
      recommendName = '1등을 코앞에 둔, ';
      recommendBook = highschool[Math.floor(Math.random() * cook.length)];
      break;
    case '고전':
      recommendName = '근본 클래식파, ';
      recommendBook = classic[Math.floor(Math.random() * cook.length)];
      break;
    case '과학':
      recommendName = '과학이 흥미로운, ';
      recommendBook = science[Math.floor(Math.random() * cook.length)];
      console.log('recommendBook: ', recommendBook);
      break;
    case '달력/기타':
      recommendName = '스케줄 정리 달인, ';
      recommendBook = calendar[Math.floor(Math.random() * cook.length)];
      break;
    case '대학교재/전문서적':
      recommendName = '놀 시간 없는, ';
      recommendBook = university[Math.floor(Math.random() * cook.length)];
      break;
    case '만화':
      recommendName = '만화세상에 사는, ';
      recommendBook = comic[Math.floor(Math.random() * cook.length)];
      break;
    case '사회과학':
      recommendName = '세상소식이 궁금한, ';
      recommendBook = socialScience[Math.floor(Math.random() * cook.length)];
      break;
    case '소설/시/희곡':
      recommendName = '흥미진진한 감성러, ';
      recommendBook = novel[Math.floor(Math.random() * cook.length)];
      break;
    case '수험서/자격증':
      recommendName = '오늘도 열정적인, ';
      recommendBook = test[Math.floor(Math.random() * cook.length)];
      break;
    case '어린이':
      recommendName = '상큼한 새싹, ';
      recommendBook = kid[Math.floor(Math.random() * cook.length)];
      break;
    case '에세이':
      recommendName = '에세이 수집가, ';
      recommendBook = essay[Math.floor(Math.random() * cook.length)];
      break;
    case '여행':
      recommendName = '떠나고 싶은, ';
      recommendBook = travel[Math.floor(Math.random() * cook.length)];
      break;
    case '역사':
      recommendName = '과거로부터 배우는, ';
      recommendBook = history[Math.floor(Math.random() * cook.length)];
      break;
    case '예술/대중문화':
      recommendName = '예술적인, ';
      recommendBook = art[Math.floor(Math.random() * cook.length)];
      break;
    case '외국어':
      recommendName = '오늘도 progress하는, ';
      recommendBook = language[Math.floor(Math.random() * cook.length)];
      break;
    case '유아':
      recommendName = '새싹키우미, ';
      recommendBook = baby[Math.floor(Math.random() * cook.length)];
      break;
    case '인문학':
      recommendName = '박학다식, ';
      recommendBook = humanities[Math.floor(Math.random() * cook.length)];
      break;
    case '자기계발':
      recommendName = '성장하고 있는, ';
      recommendBook = selfDevelope[Math.floor(Math.random() * cook.length)];
      break;
    case '잡지':
      recommendName = '감각적인, ';
      recommendBook = art[Math.floor(Math.random() * cook.length)];
      break;
    case '장르소설':
      recommendName = '소설은 장르지!, ';
      recommendBook = genreNovel[Math.floor(Math.random() * cook.length)];
      break;
    case '전집/중고전집':
      recommendName = '모든 걸 보고싶은, ';
      recommendBook = university[Math.floor(Math.random() * cook.length)];
      break;
    case '종교/역학':
      recommendName = '독실한, ';
      recommendBook = religion[Math.floor(Math.random() * cook.length)];
      break;
    case '좋은부모':
      recommendName = '좋은 부모, ';
      recommendBook = goodParent[Math.floor(Math.random() * cook.length)];
      break;
    case '중학교참고서':
      recommendName = '학교 가기 싫은, ';
      recommendBook = highschool[Math.floor(Math.random() * cook.length)];
      break;
    case '청소년':
      recommendName = '무궁무진한, ';
      recommendBook = teen[Math.floor(Math.random() * cook.length)];
      break;
    case '초등학교참고서':
      recommendName = '무궁무진한, ';
      recommendBook = kid[Math.floor(Math.random() * cook.length)];
      break;
    case '컴퓨터/모바일':
      recommendName = '이게 왜 돼?, ';
      recommendBook = computer[Math.floor(Math.random() * cook.length)];
      break;
    case '마이너':
      recommendName = '유니크한, ';
      recommendBook = newSpecial[Math.floor(Math.random() * cook.length)];
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
      const URL = `https://cors-anywhere.herokuapp.com/http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=ttblcyeon461605002&Query=${search}&QueryType=Title&MaxResults=10&start=1&Sort=Accuracy&SearchTarget=Book&output=js&Version=20131101`;
      const response = await axios.get(URL);
      const arr = response.data.item;
      arr.map((info) => data.push(info));

      navigate('/search', {
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
      navigate('/search/bookinfo', {
        state: {
          bookinfo,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const mainimg = [
    { id: 1, imgSrc: main1 },
    { id: 2, imgSrc: main2 },
    { id: 3, imgSrc: main3 },
    { id: 4, imgSrc: main4 },
    { id: 5, imgSrc: main5 },
    { id: 6, imgSrc: main6 },
  ];

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
        <div className={styles.profile_comment}>
          <span>{`${recommendName}`}</span>
          <br></br>
          <span>{`${userObj.displayName}님의 세계를 환영해요`}</span>
        </div>

        {mainimg.map((item) => {
          return (
            <div key={item.id}>
              {item.id === imgNum ? (
                <img className={styles.profile_img} src={item.imgSrc} />
              ) : null}
            </div>
          );
        })}

        <Link to="/mypage">
          {' '}
          <div className={styles.plant}>
            <span>내가 모은 독스들 보기!</span>
          </div>
        </Link>
      </div>
      <hr className={styles.hr} />
      <div className={styles.recommands} onClick={onClick}>
        <span>{`${userObj.displayName}님에게`} 
        <br></br>
        {`독스북스가 추천해요`}</span>
        <div className={styles.detailmessage}>
          태그와 읽은책 정보를 바탕으로 추천해드려요</div></div>

      
        <div className={styles.recommands2} onClick={onClick}>
        <div id={styles.recommandDetail}>
          
          <img src={recommendBook.uri}></img>
          <div id={styles.detailRight}>
            <h3>{recommendBook.title}</h3>
            <p id={styles.recommandAuthor}>{recommendBook.author}</p>
            <p id={styles.recommandDscr}>{recommendBook.dscr}</p>
          </div>
        </div>
      </div>

      <hr className={styles.hr} />
      <div className={styles.todays}>
        <span>오늘의 독스북스</span>
        <TodaysSlider contents={bestseller} />
      </div>
    </div>
  );
};

export default Home;
