import React from 'react';
import Book from './Book';

import styles from '../routes/css/Library.module.css';

const books = [
  {
    title: '제목',
    author: '저자',
    uri: 'http://www.readersnews.com/news/photo/201707/73990_32707_616.jpg',
    date: '읽은날짜',
    star: '별점',
    recommend: '추천',
    id: 0,
  },
  {
    title: '제목',
    author: '저자',
    uri: 'https://img.daily.co.kr/@files/www.daily.co.kr/content_watermark/life/2017/20170504/859b9ec69dcef60de3606fd9eab7e29e.jpg',
    date: '읽은날짜',
    star: '별점',
    recommend: '추천',
    id: 1,
  },
  {
    title: '제목',
    author: '저자',
    uri: 'http://ojsfile.ohmynews.com/STD_IMG_FILE/2020/0418/IE002632888_STD.jpg',
    date: '읽은날짜',
    star: '별점',
    recommend: '추천',
    id: 2,
  },
  {
    title: '제목',
    author: '저자',
    uri: 'http://image.kyobobook.co.kr/images/book/xlarge/844/x9791158930844.jpg',
    date: '읽은날짜',
    star: '별점',
    recommend: '추천',
    id: 3,
  },
  {
    title: '제목',
    author: '저자',
    uri: 'https://newsimg.sedaily.com/2019/10/30/1VPQ0XY4RJ_1.jpg',
    date: '읽은날짜',
    star: '별점',
    recommend: '추천',
    id: 4,
  },
];

const BookList = (props) => {
  return (
    <div className={styles.libraryContainer}>
      <ul>
        {books.map((book) => {
          return <Book bookInfo={book} key={book.id} />;
        })}
      </ul>
    </div>
  );
};

export default BookList;
