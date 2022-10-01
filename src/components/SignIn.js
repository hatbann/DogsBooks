import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import styles from '../routes/css/Auth.module.css';
const SignIn = ({ toggleToJoin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      const auth = getAuth();
      //log in
      data = await signInWithEmailAndPassword(auth, email, password);
      console.log(data);
    } catch (e) {
      if (e.message === 'Firebase: Error (auth/email-already-in-use).') {
        setError('이미 계정이 존재합니다');
      } else {
        setError(e.message);
      }
    }
  };
  return (
    <div className={styles.wrapper}>
      <h1>로그인</h1>
      <form onSubmit={onSubmit} className={styles.inputForm}>
        <div className={styles.inputs}>
          <input
            name="email"
            onChange={onChange}
            type="email"
            placeholder="Email"
            required
            value={email}
            className={styles.input}
          />
          <input
            name="password"
            onChange={onChange}
            type="password"
            placeholder="Password"
            required
            value={password}
            className={styles.input}
          />
        </div>
        <div>
          <input
            type="submit"
            value={'로그인'}
            className={`${styles.btn} ${styles.login_btn}`}
          />
        </div>
      </form>
      <div>
        {error && (
          <span className="authError">
            {error === 'Firebase: Error (auth/wrong-password).'
              ? '비밀번호 오류'
              : error}
          </span>
        )}
      </div>
      <button onClick={toggleToJoin} className={`${styles.btn} ${styles.join}`}>
        회원가입
      </button>
    </div>
  );
};

export default SignIn;
