import React from "react";
import Show from "./Show";
import Header from "./Header";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";
import './styles.scss';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';

export default function Appointment(props) {
  // console.log('PROPS', props)
  const { id, time, interview, interviewers, bookInterview } = props;
  console.log('INTERVIEW', interview)
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    }

    transition(SAVING)
    bookInterview(id, interview)
      .then(() => {
        transition(SHOW);
      })
  }

  return (
    <article className='appointment'>
      <Header time={ time } />
      { mode === EMPTY && <Empty onAdd={() => transition(CREATE)} /> } 
      { mode === SHOW && (
        <Show 
          student={interview.student}
          interviewer={interview.interviewer}
        />
      )}
      { mode === CREATE &&
        <Form
          interviewers={ interviewers }
          onCancel={ () => back() }
          onSave={ save }
        /> }
      { mode === SAVING && (
        <Status
            message='Saving'
        /> )}
    </article>
  );
}