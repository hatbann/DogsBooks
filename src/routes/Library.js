import React, { useState } from "react";

import Top from "../components/Top";
import BookList from "../components/BookList";
import BookReports from "../components/BookReports";
import styles from "./css/Library.module.css";

import Switch from "../components/Switch";

const options = [
  {
    label: "책목록",
    page: <BookList />,
    id: 0,
  },
  {
    label: "독서록",
    page: <BookReports />,
    id: 1,
  },
];

let optionsNum = 3;

const Library = (props) => {
  const [pageNum, setPageNum] = useState(0);

  const onClick = (e) => {
    const text = e.target.textContent;
    options.map((option) => {
      if (option.label === text) {
        setPageNum(option.id);
      }
    });
  };

  return (
    <div className={styles.container}>
      <Top location={"서재"} />
      <div className={styles.content}>
        {" "}
        <Switch onClick={onClick} options={options} />
        <div>
          {options.map((option) => {
            if (option.id === pageNum) {
              return <div key={option.id}>{option.page}</div>;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Library;
