import React from 'react';
import { useLocation } from 'react-router-dom';

const Search = () => {
  const data = useLocation.state.data;
  console.log(data);
  return <></>;
};

export default Search;
