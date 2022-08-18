import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from '../routes/css/Library.module.css';

const BookCalendar = (props) => {
  const [date, setDate] = useState(new Date());

  return (
    <div className={styles.Calendar}>
      <Calendar onChange={setDate} value={date} />
    </div>
  );
};

export default BookCalendar;
