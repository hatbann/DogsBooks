import React from 'react';

import NeighborContent from './NeighborContent';
import styles from '../routes/css/BookNeighbor.module.css';

const contents = [
  {
    userImg:
      'https://i.pinimg.com/564x/ab/eb/4a/abeb4a02663f383dec81ef2130f8ba42.jpg',
    title: '@@@빌리고 싶습니다!',
    location: '성산1동',
    date: '2022/04/23',
    detail:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    id: 0,
  },
  {
    userImg:
      'https://i.pinimg.com/564x/86/a6/ff/86a6ffb9681504cc955bba2c5ebd0810.jpg',
    title: '@@@빌리고 싶습니다!',
    location: '합정동',
    date: '2022/04/29',
    detail:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    id: 1,
  },
  {
    userImg:
      'https://i.pinimg.com/736x/28/25/dc/2825dcb9c2d3dc92a025ebf2b7eebd10.jpg',
    title: '@@@빌리고 싶습니다!',
    location: '성산2동',
    date: '2022/04/21',
    detail:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    id: 2,
  },
  {
    userImg:
      'https://i.pinimg.com/564x/7c/98/c4/7c98c4357e55edb5d646f703c2d9b3c6.jpg',
    title: '@@@빌리고 싶습니다!',
    location: '서교동',
    date: '2022/05/04',
    detail:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    id: 3,
  },
  {
    userImg:
      'https://i.pinimg.com/736x/e5/dc/f0/e5dcf0c1ed265ee9f47a5d3a2f06d16e.jpg',
    title: '@@@빌리고 싶습니다!',
    location: '연남동',
    date: '2022/05/01',
    detail:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    id: 4,
  },
  {
    userImg:
      'https://i.pinimg.com/736x/62/0d/5f/620d5f0b156d09d92f036335f740fff2.jpg',
    title: '@@@빌리고 싶습니다!',
    location: '성산1동',
    date: '2022/05/02',
    detail:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    id: 5,
  },
  {
    userImg:
      'https://i.pinimg.com/736x/97/16/65/971665fe7fbbe2e6e5ab8153d21bc54f.jpg',
    title: '@@@빌리고 싶습니다!',
    location: '합정동',
    date: '2022/04/20',
    detail:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    id: 6,
  },
];

const Borrow = (props) => {
  return (
    <div>
      <ul className={styles.contents_Container}>
        {contents.map((content) => {
          return <NeighborContent key={content.id} content={content} />;
        })}
      </ul>
    </div>
  );
};

export default Borrow;
