import React, { useState } from 'react';
import { useLocation,useNavigate} from 'react-router-dom';
import styles from './css/Write.module.css';

const Write = () => {
    const {state} = useLocation();
    const [title, setTitle] = useState('');
    const dateObj = new Date();
    const today = `${dateObj.getFullYear()}/${dateObj.getMonth()}/${dateObj.getDate()}`
    console.log(state);
    
    const onChange = (e) => {
        const {
          target: { value,name },
        } = e;
        if(name === 'title'){
            setTitle(value);
        }
      };

      const onSubmit = (e) => {
          e.preventDefault();
        const title = e.target[0].value;
        const date = e.target[1].value;
        const star = e.target[2].value;
        const context = e.target[3].value;
        console.log(title, date, star, context);
      }

    return (
        <div className={styles.wrapper}>
          <section>
                <div className={styles.sectionTop}>
                    <img src={state.cover} className={styles.coverImg}/>
                    <h2>{state.title}</h2>
                    <span>저자 {state.author}</span>
                </div>
                <div className={styles.sectionBottom}>
                    <div>
                        {state.description}
                    </div>
                </div>
            </section>

           <form id='writeForm' onSubmit={onSubmit}>
               <div className={styles.title}>
                    <label for='title'>책 제목</label>
                    <input type='text' placeholder={state? `${state.title}` : '제목'} value={state? `${state.title}` : `${title}`} onChange={onChange} name='title' id='title'></input>
               </div>

               <div className={styles.title}>
                    <label for='date'>날짜</label>
                    <input type='date' name='date' id='date'></input>
               </div>

               <div className={styles.title}>
               <label for='star'>별점</label>
               <select name='star'>
                    <option value="">선택하세요</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
               </select>
               </div>

               <div className={styles.title}>
               <label for='context'>독후감</label>
           <textarea name='context' form='writeForm'></textarea></div>


           <input className={styles.Btn} type='submit' value='제출'></input>
           </form>
        </div>
    );
};

export default Write;