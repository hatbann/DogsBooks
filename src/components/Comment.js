import React, { useState } from 'react';
import styles from './css/Comment.module.css';

const Comment = ({ user }) => {
  let [comment, setComment] = useState(''); //사용자가 입력하는 댓글
  let [feedComments, setFeedComments] = useState([]); // 게시글 마다 댓글 리스트
  let [isValid, setIsValid] = useState(false);

  const onPost = (e) => {
    const copyFeedComments = [...feedComments];
    copyFeedComments.push(comment);
    setFeedComments(copyFeedComments);
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
            userName={user.displayName}
            userComment={commentArr}
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
