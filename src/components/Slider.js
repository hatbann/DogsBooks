import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import styles from './css/Slider.module.css';

import Content from './Content';

const CustomSlider = ({ contents }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  return (
    <div>
      <Slider {...settings} className={styles.slider}>
        {contents.map((content) => (
          <Content contentObj={content} key={content.id} />
        ))}
      </Slider>
    </div>
  );
};

export default CustomSlider;
