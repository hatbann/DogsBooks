import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Mypage from './Mypage';

import Slider from '../components/Slider';
import styles from './css/Home.module.css';

const recommands = [
  {
    uri: 'http://www.readersnews.com/news/photo/201707/73990_32707_616.jpg',
  },
  {
    uri: 'https://img.daily.co.kr/@files/www.daily.co.kr/content_watermark/life/2017/20170504/859b9ec69dcef60de3606fd9eab7e29e.jpg',
  },
  {
    uri: 'http://ojsfile.ohmynews.com/STD_IMG_FILE/2020/0418/IE002632888_STD.jpg',
  },
  {
    uri: 'http://image.kyobobook.co.kr/images/book/xlarge/844/x9791158930844.jpg',
  },
  {
    uri: 'https://newsimg.sedaily.com/2019/10/30/1VPQ0XY4RJ_1.jpg',
  },
];

const Home = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <div>프로추리러, 선영님의 세계</div>
        <img
          src={require('../assets/img1.png')}
          className={styles.profile_img}
        ></img>
        <Link to="/mypage">
          <button>myplant</button>
        </Link>
      </div>
      <div className={styles.recommands}>
        <span>추리를 좋아하는&nbsp;선영님을 위한 추천도서</span>
        <Slider contents={recommands} />
      </div>
    </div>
  );
};

export default Home;
