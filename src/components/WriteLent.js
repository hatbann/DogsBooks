import { async } from '@firebase/util';
import React, { useState } from 'react';
import { getDownloadURL, ref, uploadString } from '@firebase/storage';
import { dbService, storageService } from '../fbase';
import { useRef } from 'react';
import styled from 'styled-components';

import styles from '../routes/css/BookNeighbor.module.css';
import Top2 from './Top2';

const WriteLent = () => {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [location, setLocation] = useState(-1); //location 은 string으로 받아서 number로 바꾸기?
  const [imgfile, setImgfile] = useState('');
  const [state, setState] = useState({ size: 1 });

  //제출시 넘어갈 것들 : title, contents, location(number), imgfile
  const onSubmit = async (event) => {
    event.preventDefault();
  };

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'title') {
      setTitle(value);
      return;
    }
    if (name === 'contents') {
      setContents(value);
      return;
    }
    if (name === 'location') {
    }
  };

  //nwitter부분 보고 따라한것임 이미지 변경부분,, 변경해야하면 변경 ok
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const image = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setImgfile(result);
    };
    reader.readAsDataURL(image);
  };

  //remove버튼 누르면 미리보기 사라지게
  const onClearImg = (event) => {
    setImgfile('');
  };
  return (
    <div className={styles.writeLent_Container}>
      <Top2 />
      <div className={styles.writeLent_TopContainer}>
        <span
          className={styles.writeLent_TopContainer_Content}
        >{`( 빌려주기 )`}</span>
      </div>
      <section>
        <form
          id="lentForm"
          onSubmit={onSubmit}
          className={styles.writeLent_form}
        >
          <div className={styles.addImg}>
            {!imgfile && (
              <>
                <label htmlFor="attach_file">
                  <span className={styles.addImg}>+</span>
                </label>
                <input
                  id="attach_file"
                  type="file"
                  accept="image/*"
                  onChange={onFileChange}
                  style={{ display: 'none' }}
                ></input>
              </>
            )}
            {imgfile && (
              <div className={styles.attached_img}>
                <img src={imgfile}></img>
                <div onClick={onClearImg}>
                  <span>Remove</span>
                </div>
              </div>
            )}
          </div>
          <div className={styles.writeLent_Title}>
            <label htmlFor="title">제목</label>
            <input
              id="title"
              type="text"
              placeholder="제목을 입력하세요"
              value={title}
              name="title"
              onChange={onChange}
            ></input>
          </div>
          <div className={styles.writeLent_Contents}>
            <label htmlFor="contents">내용</label>
            <textarea id="contents" form="lentForm" name="contents"></textarea>
          </div>
          <div className={styles.writeLent_Loc}>
            <label htmlFor="selectLoc">위치</label>
            <select
              id="selectLoc"
              className={styles.selectLoc}
              size={state.size}
              onFocus={() => {
                setState({ size: 5 });
              }}
              onBlur={() => {
                setState({ size: 1 });
              }}
              onChange={(e) => {
                e.target.blur();
              }}
            >
              <option disabled selected>
                선택하세요
              </option>
              <option value="1">강남구</option>
              <option value="2">강동구</option>
              <option value="3">강서구</option>
              <option value="4">강북구</option>
              <option value="5">관악구</option>
              <option value="6">광진구</option>
              <option value="7">구로구</option>
              <option value="8">금천구</option>
              <option value="9">노원구</option>
              <option value="10">동대문구</option>
              <option value="11">도봉구</option>
              <option value="12">동작구</option>
              <option value="13">마포구</option>
              <option value="14">서대문구</option>
              <option value="15">성동구</option>
              <option value="16">성북구</option>
              <option value="17">서초구</option>
              <option value="18">송파구</option>
              <option value="19">영등포구</option>
              <option value="20">용산구</option>
              <option value="21">양천구</option>
              <option value="22">은평구</option>
              <option value="23">종로구</option>
              <option value="24">중구</option>
              <option value="25">중랑구</option>
            </select>
          </div>

          <input
            type="submit"
            value="제출"
            className={styles.writeLent_SubmitBtn}
          ></input>
        </form>
      </section>
    </div>
  );
};

export default WriteLent;
