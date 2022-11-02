import { async } from '@firebase/util';
import { updateDoc, doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import styles from './css/Comment.module.css';
import { getAuth } from 'firebase/auth';
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
      uid : user.uid,
    };
    copyFeedComments.push(ref);
    setFeedComments(copyFeedComments);

    await updateDoc(contentRef, {
      comments: copyFeedComments,
    });
    setComment('');
  };
  

  const onDelete = async(index)=>{
    let commentsRef;
    console.log(index);
    console.log(feedComments.length);
    if(feedComments.length ===1){
      console.log('한개');
      feedComments = [];
      await updateDoc(contentRef,{
        comments:[],
      });   
    }else{
        commentsRef = feedComments.splice(index-1,1);
      setFeedComments(commentsRef);
      await updateDoc(contentRef,{
        comments:commentsRef,
      });   
    } 
  }


  const [edit, setEdit] = useState(false);
  const [commentEditRef , setCommentEditRef] = useState('');

  const onToggleEdit = (comment)=>{
    setEdit((prev) => !prev);
    setCommentEditRef(comment);
  }

  const onEdit = async(index,event)=>{
    event.preventDefault();
    for(let i = 0; i<feedComments.length; i++){
      if(i === index){
        feedComments[i].comment = commentEditRef;
        break;
      }
    }
    await updateDoc(contentRef,{
      comments : feedComments,
    })
  }


  const onChange = (e)=>{
    let comment = e.target.value;
    setCommentEditRef(comment);
  }

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
          <div className={styles.commentList}>
          <p>{commentArr.nickname}</p>
          {
            user.uid === commentArr.uid ? 
              <>
                {edit?
                  <>
                    <form>
                      <input type="text" value={commentEditRef} onChange={onChange}/>
                      <button  className={
                           commentEditRef.length > 0
                              ? `${styles.submitCommentActive}`
                              : `${styles.submitCommentInactive}`
                              } onClick={()=>onEdit(i)}>게시
                      </button>
                    </form>
                </>
              :
               <>
                <div>{commentArr.comment}</div>
                <div>
                  <button onClick={()=> onDelete(commentArr.index)}>삭제</button>
                  <button onClick={()=> onToggleEdit(commentArr.comment)}>수정</button>
                </div>

               </>
          }
              </>
            :
            <div>{commentArr.comment}</div>
          }
        </div>
        );
      })}
    </div>
  );
};



export default Comment;
