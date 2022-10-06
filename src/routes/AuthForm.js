import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import styles from "./css/Auth.module.css";

import SignIn from "../components/SignIn";
import Join from "../components/Join";

const AuthForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAcount, setNewAccount] = useState(false);
  const [error, setError] = useState("");
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  /*const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      const auth = getAuth();
      if (newAcount) {
        //create account
        data = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        //log in
        data = await signInWithEmailAndPassword(auth, email, password);
      }
      console.log(data);
    } catch (e) {
      if (e.message === "Firebase: Error (auth/email-already-in-use).") {
        setError("이미 계정이 존재합니다");
      } else {
        setError(e.message);
      }
    }
  };
  */

  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };

  return (
    <>
      {!newAcount ? (
        <SignIn toggleToJoin={toggleAccount} />
      ) : (
        <Join toggleToSignIn={toggleAccount} />
      )}
    </>
  );
};

export default AuthForm;

