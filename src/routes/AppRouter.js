import React, { useState, useRef, useEffect, createContext } from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  HashRouter,
} from 'react-router-dom';

import BottomTab from '../components/BottomTab';

import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Library from '../routes/Library';
import BookNeighbor from '../routes/BookNeighbor';
import Borrow from '../components/Borrow';
import Mypage from '../routes/Mypage';
import Search from '../routes/Search';
import BookInfo from '../components/BookInfo';
import Write from '../components/Write';
import SelectGenre from './SelectGenre';
import BookReports from '../components/BookReports';
import WriteLent from '../components/WriteLent';

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {
  return (
    <>
      {isLoggedIn ? (
        <div>
          <HashRouter>
            <Routes>
              <Route
                exact={true}
                path="/dogsbooks"
                element={<Home userObj={userObj} />}
              />
              <Route
                exact={true}
                path="/"
                element={<Home userObj={userObj} />}
              />
              <Route
                path="/library/*"
                element={<Library userObj={userObj} />}
              />
              <Route
                path="/libary/reports"
                element={<BookReports userObj={userObj} />}
                userObj={userObj}
              />
              <Route
                path="/bookneighbor"
                element={<BookNeighbor userObj={userObj} />}
              />
              <Route
                path="/mypage"
                element={<Mypage userObj={userObj} />}
                userObj={userObj}
              />
              <Route path="/search" element={<Search />} userObj={userObj} />
              <Route
                path="/bookneighbor/borrow"
                element={<Borrow userObj={userObj} />}
              />
              <Route path="/search/bookinfo" element={<BookInfo />} />
              <Route path="/write" element={<Write userObj={userObj} />} />
              <Route path="/selectGenre" element={<SelectGenre />} />
              <Route path="/writeLent" element={<WriteLent />} />
            </Routes>
            <BottomTab />
          </HashRouter>
        </div>
      ) : (
        <>
          <HashRouter>
            <Auth />
            <Routes>
              <Route path="/selectGenre" element={<SelectGenre />} />
            </Routes>
          </HashRouter>
        </>
      )}
    </>
  );
};

export default AppRouter;
