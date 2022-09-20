import React, { useState } from 'react';
import {
    createUserWithEmailAndPassword,
    getAuth,
  } from 'firebase/auth';
import styles from '../routes/css/Auth.module.css'
const Join = ({toggleToSignIn}) => {
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
            //create account
            data = await createUserWithEmailAndPassword(auth, email, password);

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
            <h1 className={styles.title}>회원가입</h1>
            <form onSubmit={onSubmit} className={styles.inputForm}>
              <div >
                <div>
                   <input
                    name="email"
                    onChange={onChange}
                    type="email"
                    placeholder="Email"
                    required
                    value={email}/>
                  <input
                    name="password"
                    onChange={onChange}
                   type="password"
                    placeholder="Password"
                    required
                    value={password}/>
                </div>
              <div>
                <input
                    type="submit"
                    value={'회원가입'}
                    className={styles.submit}
                    onClick={onSubmit}
            ></input>
          </div>
        </div>
      </form>
      <button onClick={toggleToSignIn}>로그인</button>
        </div>
    );
};

export default Join;