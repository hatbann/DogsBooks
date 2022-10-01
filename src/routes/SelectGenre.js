import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

const $ = (type) => {
    return document.querySelector(type);
  };

const SelectGenre = () => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState([]);

    //console에 제대로 체크 됐는지 확인하려고 사용한것
    useEffect(()=>{
        console.log(selected);
    },[selected]);

    //완료 버튼 클릭시 우선 localStorage에 저장하게 했다
    //완료하면 main 화면으로 넘어간다.
    //이제 Submit부분에서 localStorage. ~~~이 부분을 삭제하고 firebase로 넘기는 부분 수행하면 된다.
    const onSubmit= (event)=>{
        event.preventDefault();
        localStorage.setItem('selected', JSON.stringify(selected));
        navigate('/dogsbooks');
    }
    //체크 버튼 클릭시 해당 버튼의 값이 selected 배열에 들어가고, 
    //체크버튼 비활성화시 배열에서 삭제된다
    const onChecked = (event)=>{
        let checked = event.target.checked;
        let value = event.target.value;
        if(checked){
            setSelected([...selected, value]);
        }else{
            let filtered = selected.filter((element) => element !== value);
            setSelected(filtered);
        }
    }
    return (
        <div>
            <h1>장르선택</h1>
            <form method='post'>
                <div>
                    <input type="checkbox" id='checkbox' value="koreanNovel" onClick={onChecked}/>
                    한국소설
                </div>
                <div>
                    <input type="checkbox" id='checkbox' value="Humanities" onClick={onChecked}/>
                    인문학
                </div>
                <div>
                    <input type="checkbox" id='checkbox' value="science"onClick={onChecked}/>
                    과학
                </div>
                <div>
                    <input type="checkbox" id='checkbox' value="economics"onClick={onChecked}/>
                    경제/경영
                </div>
                <input type="submit" value={"완료"} onClick={onSubmit}>

                </input>
            </form>
        </div>
    );
};

export default SelectGenre;