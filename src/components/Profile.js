import React, { useState, useEffect } from "react";
import {
  getAuth,
  onAuthStateChanged,
  updateCurrentUser,
  signOut,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

import userImg from "../assets/img1.png";
import styles from "../routes/css/Mypage.module.css";
import ProgressBar from "@ramonak/react-progress-bar";

const user = {
  img: userImg,
  name: " 조선영",
  level: 13,
  percentage: 70,
};

const Profile = () => {
  const auth = getAuth();
  const userObj = auth.currentUser;

  const navigate = useNavigate();

  const onLogOutClick = () => {
    const auth = getAuth();
    signOut(auth);
    navigate("/");
  };

  return (
    <div className={styles.profile_container}>
      <div className={styles.profile}>
        <img src={user.img} className={styles.profileImg} />
        <div className={styles.profile_detail}>
          <div style={{ marginBottom: "7px" }}>
            {" "}
            <span className={styles.name}>{userObj.displayName}</span>
            <span className={styles.level}>{user.level} Lv</span>
          </div>
          <div>
            <ProgressBar
              completed={user.percentage}
              bgColor="#9bffe1"
              width="200px"
              height="3vw"
              labelSize="10px"
              labelColor="#474747"
            />
          </div>
        </div>
      </div>
      <div className={styles.settings}>
        <div className={styles.setting}>
          <img src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png" />
          프로필
        </div>
        <div className={styles.setting}>
          <img src="https://cdn-icons-png.flaticon.com/512/1076/1076877.png" />
          Dogs
        </div>
        <div className={styles.setting}>
          <img src="https://cdn-icons-png.flaticon.com/512/684/684809.png" />
          동네 설정
        </div>
        <button
          className={`${styles.setting} ${styles.logout}`}
          onClick={onLogOutClick}
        >
          <img src="https://cdn-icons-png.flaticon.com/512/159/159707.png" />
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default Profile;
