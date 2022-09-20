import React, { useState, useRef, useEffect, createContext } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import { getAuth, onAuthStateChanged, updateCurrentUser } from 'firebase/auth';
import { authService } from '../firebase';

import AppRouter from '../routes/AppRouter';

import styles from './css/App.module.css';



function App() {
  const [init, setIntit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setIntit(true);
    });
  }, []);

  const refreshUser = async () => {
    const user = authService.currentUser;
    setUserObj({ ...user });
  };


  return (
    <div>
    {init ? (
      <AppRouter
        refreshUser={refreshUser}
        isLoggedIn={isLoggedIn}
        userObj={userObj}
      />
    ) : (
      'Initializing....'
    )}
  </div>
  );
}

export default App;
