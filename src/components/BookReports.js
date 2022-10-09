import React from 'react';
import { useLocation } from 'react-router-dom';

const BookReports = () => {
  const bookreports = useLocation().state;
  console.log(bookreports);
  return (
    <div>
      <h1>{bookreports.title}</h1>
      <section>
        <span>{bookreports.createdAt}</span>
        <span>{bookreports.star}</span>
        <p>{bookreports.text}</p>
      </section>
    </div>
  );
};

export default BookReports;
