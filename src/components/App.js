import React, { useState, useRef, useEffect, createContext } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import BottomTab from '../components/BottomTab';
import AppRouter from '../routes/Router';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Library from '../routes/Library';
import BookNeighbor from '../routes/BookNeighbor';
import Mypage from '../routes/Mypage';

import styles from './css/App.module.css';

export const LoggedInInfo = createContext();

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  const loginValue = {
    logInstate: isLoggedIn,
    logInaction: setIsLoggedIn,
  };

  //로그인 해서 정보가져오는 파트 구현해야함
  return (
    <LoggedInInfo.Provider value={loginValue}>
      {isLoggedIn ? (
        <div className={styles.container}>
          <BrowserRouter className={styles.router}>
            <Routes className={styles.element}>
              <Route
                exact={true}
                path="/dogsbooks"
                element={<Home />}
                className={styles.element}
              />
              <Route
                exact={true}
                path="/"
                element={<Home />}
                className={styles.element}
              />
              <Route path="/library/*" element={<Library />} />
              <Route path="/bookneighbor" element={<BookNeighbor />} />
              <Route path="/mypage" element={<Mypage />} />
            </Routes>
            <BottomTab className={styles.tab} />
          </BrowserRouter>
        </div>
      ) : (
        <>
          <Auth />
        </>
      )}
    </LoggedInInfo.Provider>
  );
}

export default App;
