import React, { useState, useContext } from "react";
import  authService  from "../fbase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { async } from "@firebase/util";

import AuthForm from "./AuthForm";
import styles from "./css/Auth.module.css";

const Auth = () => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    try {
      let result;
      if (name === "google") {
        provider = new GoogleAuthProvider();
        result = await signInWithPopup(authService, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
      }
    } catch (error) {}
  };

  //처음 보이는 창 : 로그인 ->  회원가입 버튼 누르면 변경
  return (
    <div className={styles.container}>
      <AuthForm />

    </div>
  );
};

export default Auth;
