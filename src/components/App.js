import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import BottomTab from '../components/BottomTab';
import Home from '../routes/Home';
import Library from '../routes/Library';
import BookNeighbor from '../routes/BookNeighbor';
import Mypage from '../routes/Mypage';

import styles from './css/App.module.css';
function App() {
  return (
    <div className={styles.container}>
      <BrowserRouter className={styles.router}>
        <Routes className={styles.element}>
          <Route path="/" element={<Home />} className={styles.element} />
          <Route path="/library/*" element={<Library />} />
          <Route path="/bookneighbor" element={<BookNeighbor />} />
          <Route path="/mypage" element={<Mypage />} />
        </Routes>
        <BottomTab className={styles.tab} />
      </BrowserRouter>
    </div>
  );
}

export default App;
