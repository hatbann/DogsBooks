import React from 'react';
import { useLocation,useNavigate} from 'react-router-dom';
import styles from './css/BookInfo.module.css';

const BookInfo = () => {
    const {state} = useLocation();
    console.log(state);
    const navigate = useNavigate();

    const onWrite = (bookinfo)=>{
        try {
            navigate('/write', {state: bookinfo})
        } catch (error) {
            console.log(error);
        }
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
            <button className={styles.writeBtn} onClick={(e) => onWrite(state)}>
                읽은 책 기록하기
            </button>
        </div>
    );
};

export default BookInfo;