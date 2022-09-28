import React from 'react';
import { Link, useNavigate } from "react-router-dom";

const SelectGenre = () => {
    const navigate = useNavigate();

    const onSubmit= (event)=>{
        event.preventDefault();
        navigate('/dogsbooks');
    }
    return (
        <div>
            장르선택창
            <form>
                <input type="submit" value={"완료"} onClick={onSubmit}>

                </input>
            </form>
        </div>
    );
};

export default SelectGenre;