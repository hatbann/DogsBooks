import { async } from '@firebase/util';
import { updateDoc, doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import styles from './css/Comment.module.css';
import { dbService } from '../fbase';

const Comment = ({ user, content }) => {
  let [comment, setComment] = useState(''); //사용자가 입력하는 댓글
  let [feedComments, setFeedComments] = useState([]); // 게시글 마다 댓글 리스트
  let [isValid, setIsValid] = useState(false);

  const contentRef = doc(dbService, 'lentContents', `${content.state.id}`);

  useEffect(() => {
    async function fetch() {
      let docSnap = await getDoc(contentRef);
      console.log('here');
      if (
        content.state.comments !== undefined &&
        content.state.comments !== null
      ) {
        setFeedComments(docSnap.data().comments);
      }
    }
    fetch();
  }, []);
  const onPost = async (e) => {
    const copyFeedComments = [...feedComments];
    const ref = {
      comment,
      nickname: user.displayName,
    };
    copyFeedComments.push(ref);
    setFeedComments(copyFeedComments);

    await updateDoc(contentRef, {
      comments: copyFeedComments,
    });
    setComment('');
  };

  return (
    <div className={styles.commentContainer}>
      <form>
        <input
          type="text"
          className={styles.inputComment}
          placeholder="댓글 달기"
          onChange={(e) => {
            setComment(e.target.value);
          }}
          onKeyUp={(e) => {
            e.target.value.length > 0 ? setIsValid(true) : setIsValid(false);
          }}
          value={comment}
        ></input>
        <button
          type="button"
          className={
            comment.length > 0
              ? `${styles.submitCommentActive}`
              : `${styles.submitCommentInactive}`
          }
          onClick={onPost}
          disabled={isValid ? false : true}
        >
          게시
        </button>
      </form>
      {feedComments.map((commentArr, i) => {
        return (
          <CommentList
            userName={commentArr.nickname}
            userComment={commentArr.comment}
            key={i}
          />
        );
      })}
    </div>
  );
};

const CommentList = (props) => {
  return (
    <div className={styles.commentList}>
      <p>{props.userName}</p>
      <div>{props.userComment}</div>
    </div>
  );
};
export default Comment;
