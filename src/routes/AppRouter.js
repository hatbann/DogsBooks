import React, { useState, useRef, useEffect, createContext } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';


import BottomTab from '../components/BottomTab';

import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Library from '../routes/Library';
import BookNeighbor from '../routes/BookNeighbor';
import Borrow from '../components/Borrow';
import Mypage from '../routes/Mypage';
import Search from '../routes/Search';



const AppRouter = ({isLoggedIn, userObj, refreshUser }) => {
    return (
        <>
         {isLoggedIn ? (
            <div >
              <BrowserRouter>
                <Routes >
                  <Route
                    exact={true}
                    path="/dogsbooks"
                    element={<Home userObj = {userObj}/>}
                    
               
                  />
                  <Route
                    exact={true}
                    path="/"
                    element={<Home userObj = {userObj}/>}
                   
                  
                  />
                  <Route path="/library/*" element={<Library userObj = {userObj}/>} />
                  <Route path="/bookneighbor" element={<BookNeighbor userObj = {userObj}/>}  />
                  <Route path="/mypage" element={<Mypage userObj = {userObj}/>}  userObj = {userObj}/>/>
                  <Route path='/bookneighbor/borrow' element={<Borrow userObj = {userObj}/>} />
                </Routes>
                <BottomTab />
              </BrowserRouter>
            </div>
          ) : (
            <>
              <Auth />
            </>
            )
        }</>
    )   
}

export default AppRouter;