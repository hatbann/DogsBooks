import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import styles from './css/Slider.module.css';

import Content from './Content';
import TodaysBooks from './TodaysBooks';

const CustomSlider = ({ contents }) => {
  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  return (
    <div className={styles.container}>
      <Slider {...settings} className={styles.slider}>
        {contents.map((content) => (
          <Content contentObj={content} key={content.id} />
        ))}
      </Slider>
    </div>
  );
};

export const TodaysSlider = ({ contents }) => {
  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  return (
    <div className={styles.container}>
      <Slider {...settings} className={styles.slider}>
        {contents.map((content) => (
          <TodaysBooks contentObj={content} key={content.id} />
        ))}
      </Slider>
    </div>
  );
};

export default CustomSlider;
