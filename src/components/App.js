import React from 'react';
import BottomTab from '../components/BottomTab';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../routes/Home';
import Mypage from '../routes/Mypage';

function App() {
  return (
    <>
      <BottomTab />
      <Routes></Routes>
    </>
  );
}

export default App;
