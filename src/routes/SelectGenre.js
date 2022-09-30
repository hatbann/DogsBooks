import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SelectGenre = () => {
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    navigate('/dogsbooks');
  };
  return (
    <div>
      <div>
        <h1>장르선택하기</h1>
      </div>
      <form>
        <input type="submit" value={'완료'} onClick={onSubmit}></input>
      </form>
    </div>
  );
};

export default SelectGenre;
