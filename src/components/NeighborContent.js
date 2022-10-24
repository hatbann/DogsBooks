
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../routes/css/BookNeighbor.module.css";
import { getAuth } from "firebase/auth";
import { deleteDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { dbService } from "../fbase";

import Comment from "./Comment";
import { async } from "@firebase/util";


const LIMIT = 100;

const NeighborContent = ({ content }) => {
  const [limit, setLimit] = useState(LIMIT);
  const [region, setRegion] = useState("");
  const time = String(Date(content.createdAt)).split(" ");
  const timestr = `${time[3]}/${time[1]}/${time[2]}/${time[0]}`;

  const navigate = useNavigate();

  const summary = content.content.slice(0, LIMIT);
  const regionNum = content.location;

  useEffect(() => {
    switch (Number(regionNum)) {
      case 1:
        setRegion("강남구");
        break;
      case 2:
        setRegion("강동구");
        break;
      case 3:
        setRegion("강서구");
        break;
      case 4:
        setRegion("강북구");
        break;
      case 5:
        setRegion("관악구");
        break;
      case 6:
        setRegion("광진구");
        break;
      case 7:
        setRegion("구로구");
        break;
      case 8:
        setRegion("금천구");
        break;
      case 9:
        setRegion("노원구");
        break;
      case 10:
        setRegion("동대문구");
        break;
      case 11:
        setRegion("도봉구");
        break;
      case 12:
        setRegion("동작구");
        break;
      case 13:
        setRegion("마포구");
        break;
      case 14:
        setRegion("서대문구");
        break;
      case 15:
        setRegion("성동구");
        break;
      case 16:
        setRegion("성북구");
        break;
      case 17:
        setRegion("서초구");
        break;
      case 18:
        setRegion("송파구");
        break;
      case 19:
        setRegion("영등포구");
        break;
      case 20:
        setRegion("용산구");
        break;
      case 21:
        setRegion("양천구");
        break;
      case 22:
        setRegion("은평구");
        break;
      case 23:
        setRegion("종로구");
        break;
      case 24:
        setRegion("중구");
        break;
      case 25:
        setRegion("중랑구");
        break;
      default:
        break;
    }
  });

  const onClick = (e) => {
    navigate("/bookneighbor/neighborContent", {
      state: {
        region,
        timestr,
        content: content.content,
        title: content.title,
        img: content.imgfile,
        id: content.id,
        uid: content.cid,
        page: "bookneighbor",
      },
    });
    console.log(content);
  };

  return (
    <div>
      <div className={styles.content} onClick={onClick}>
        <img src={content.imgfile} className={styles.userImg} />
        <div>
          <div className={styles.content_title}>
            {content.title}
            <span
              style={{
                marginLeft: "5px",
                fontSize: "10px",
                fontWeight: "400",
                color: "#a8a8a8",
              }}
            >
              {region}
            </span>
          </div>
          <div className={styles.date}>{timestr}</div>
          {content.content.length < LIMIT ? (
            <p className={styles.content_detail}>{content.detail}</p>
          ) : (
            <>
              <p className={styles.content_detail}>{summary}...더보기</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const BookNeighborDetailPage = () => {
  const location = useLocation();
  const region = location.state.region;
  const timestr = location.state.timestr;
  const [content, setContent] = useState(location.state.content);
  const [title, setTitle] = useState(location.state.title);
  const img = location.state.img;
  const uid = location.state.uid;

  const page = location.state.page; //프로필에서 왔는지 책이웃에서 왔는지 구분

  //수정을 위한 변수들
  const [edit, setEdit] = useState(false);
  const [state, setState] = useState({ size: 1 });
  const [locNum, setLocNum] = useState(-1);

  //대여가능,불가능 여부
  const [possible, setPossible] = useState(true);

  const navigate = useNavigate();

  const contentRef = doc(dbService, "lentContents", `${location.state.id}`);

  //게시글 삭제
  const onDeleteClick = async () => {
    const ok = window.confirm("정말로 삭제하시겠습니까?");
    if (ok) {
      try {
        await deleteDoc(contentRef);
        if (page === "bookneighbor") {
          navigate("/bookneighbor");
        } else if (page === "profile") {
          navigate("/mypage");
        }
      } catch (error) {
        window.alert("삭제에 실패했습니다");
      }
    }
  };

  const onToggleEdit = () => {
    setEdit((prev) => !prev);
  };

  //수정로직
  const onEdit = async (event) => {
    event.preventDefault();
    await updateDoc(contentRef, {
      content: content,
      title: title,
      location: locNum,
      createdAt: serverTimestamp(),
    });
    setEdit(false);
  };

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === "title") {
      setTitle(value);
      return;
    }
    if (name === "content") {
      setContent(value);
      return;
    }
    if (name === "locationNum") {
      setLocNum(value);
    }
  };

  //대여가능,불가능 변경
  const onPossible = (event) => {
    setPossible((prev) => !prev);
  };

  const auth = getAuth();
  const userobj = auth.currentUser;
  return (
    <div className={styles.bookNeighborDetailPage}>
      {edit ? (
        <div className={styles.editContainer}>
          <img src={img}></img>
          <div className={styles.editForm}>
            <form id="lentForm">
              <div>
                <label htmlFor="title">제목</label>
                <input
                  type="text"
                  value={title}
                  id="title"
                  onChange={onChange}
                  name="title"
                ></input>
              </div>
              <div>
                <label htmlFor="content">내용</label>
                <textarea
                  id="content"
                  form="lentForm"
                  name="content"
                  value={content}
                  onChange={onChange}
                ></textarea>
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
            </form>
            <div>
              <button onClick={onToggleEdit}>수정취소</button>
              <button onClick={onEdit}>수정완료</button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <img src={img} />
          <h1>{title}</h1>
          <div>
            <span>{region}</span>
            <span>{timestr}</span>
            {possible ? (
              <button
                className={`${styles.lentcheckBtn} ${styles.possible}`}
                disabled={userobj.uid === uid ? false : true}
                onClick={onPossible}
              >
                대여가능
              </button>
            ) : (
              <button
                disabled={userobj.uid === uid ? false : true}
                onClick={onPossible}
                className={`${styles.lentcheckBtn} ${styles.impossible}`}
              >
                대출중
              </button>
            )}
          </div>
          <p>{content}</p>
          {userobj.uid === uid ? (
            <div className={styles.editDeleteBtn}>
              <button onClick={onToggleEdit}>수정</button>
              <button onClick={onDeleteClick}>삭제</button>
            </div>
          ) : (
            <></>
          )}
          <Comment user={userobj} />
        </>

      )}
    </div>
  );
};






export { BookNeighborDetailPage };

export default NeighborContent;
