import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import BottomTab from '../components/BottomTab';
import Home from '../routes/Home';
import Library from '../routes/Library';
import BookNeighbor from '../routes/BookNeighbor';
import Mypage from '../routes/Mypage';

import styles from './css/App.module.css';
function App() {
  const boxRef = useRef(null);

  const [ScrollActive, setScrollActive] = useState(false);
  const [ScrollY, setScrollY] = useState(0);

  function logit() {
    setScrollY(boxRef.current.scrollTop);
    if (boxRef.current.scrollTop > 0) {
      setScrollActive(true);
    } else {
      setScrollActive(false);
    }
  }

  useEffect(() => {
    function watchScroll() {
      boxRef.current.addEventListener('scroll', logit);
    }
    watchScroll();

    return () => {
      boxRef.current.removeEventListener('scroll', logit);
    };
  });

  return (
    <div className={styles.container} ref={boxRef}>
      <BrowserRouter className={styles.router}>
        <Routes className={styles.element}>
          <Route path="/" element={<Home />} className={styles.element} />
          <Route path="/library/*" element={<Library />} />
          <Route path="/bookneighbor" element={<BookNeighbor />} />
          <Route path="/mypage" element={<Mypage />} />
        </Routes>
        <BottomTab scrollactive={ScrollActive} />
      </BrowserRouter>
    </div>
  );
}

export default App;
