import React from "react";
import Show from "./Show";
import Header from "./Header";
import Empty from "./Empty";
import './styles.scss';

export default function Appointment(props) {
  const { id, time, interview } = props;

  return (
    <article className='appointment'>
      <Header time={ time } />
      { interview ? 
        <Show {...interview} />
      : 
        <Empty />}
    </article>
  );
}