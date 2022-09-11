import React, { useState, useContext } from 'react';
import styles from './css/Auth.css';

import { LoggedInInfo } from '../components/App';

const Auth = () => {
  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');
  const [userName, setUserName] = useState('');
  const [userNickname, setUserNickname] = useState('');
  const [newAcount, setNewAccount] = useState(false); //기본이 로그인

  const { logInstate, logInaction } = useContext(LoggedInInfo);

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'userId') {
      setUserId(value);
      return;
    }
    if (name === 'userPw') {
      setUserPw(value);
      return;
    }
    if (name === 'userName') {
      setUserName(value);
      return;
    }
    if (name === 'userNickname') {
      setUserNickname(value);
      return;
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    //가입&로그인 로직짜기
    if (newAcount) {
      console.log('회원가입');
      setUserId('');
      setUserPw('');
      setUserName('');
      setUserNickname('');
      logInaction(true); //회원가입시 home화면으로 넘어가게 함
    } else {
      setUserId('');
      setUserPw('');
      console.log('로그인');
      logInaction(true); //로그인시 home화면으로 넘어가게 함
    }
  };

  const onChangeForm = (event) => {
    event.preventDefault();
    setNewAccount(!newAcount);
  };

  //처음 보이는 창 : 로그인 ->  회원가입 버튼 누르면 변경
  return (
    <div>
      <h1>{newAcount ? '회원가입' : '로그인'}</h1>
      {newAcount ? (
        <form className="authContainer">
          <div className="authInput">
            {' '}
            <label htmlFor="userId">아이디</label>
            <input
              type="text"
              id="userId"
              placeholder="아이디"
              name="userId"
              value={userId}
              onChange={onChange}
              required
            ></input>
          </div>
          <div className="authInput">
            <label htmlFor="userPw">비밀번호</label>
            <input
              type="password"
              id="userPw"
              placeholder="비밀번호"
              name="userPw"
              value={userPw}
              onChange={onChange}
              required
            ></input>
          </div>
          <div className="authInput">
            <label htmlFor="userName">이름</label>
            <input
              type="text"
              id="userName"
              placeholder="이름"
              name="userName"
              value={userName}
              onChange={onChange}
              required
            ></input>
          </div>
          <div className="authInput">
            <label htmlFor="userNickname">닉네임</label>
            <input
              type="text"
              id="userNickname"
              placeholder="닉네임"
              name="userNickname"
              value={userNickname}
              onChange={onChange}
              required
            ></input>
          </div>
          <div className="formBtns">
            {' '}
            <input type="button" value="회원가입" onClick={onSubmit}></input>
            <input type="button" value="로그인" onClick={onChangeForm}></input>
          </div>
        </form>
      ) : (
        <form className="authContainer">
          <div className="authInput">
            <label htmlFor="userId">아이디</label>
            <input
              type="text"
              id="userId"
              onChange={onChange}
              value={userId}
              name="userId"
              placeholder="아이디를 입력하세요"
              required
            />
          </div>
          <div className="authInput">
            <label htmlFor="userPw">비밀번호</label>
            <input
              type="password"
              id="userPw"
              onChange={onChange}
              value={userPw}
              name="userPw"
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>
          <div className="formBtns">
            <button type="submit" onClick={onSubmit}>
              로그인
            </button>
            <button type="submit" onClick={onChangeForm}>
              회원가입
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Auth;
