import React from "react";
import Show from "./Show";
import Header from "./Header";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";
import './styles.scss';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = 'SAVING';
const DELETING = 'DELETING'
const CONFIRM = 'CONFIRM'
const EDIT = 'EDIT'
const ERROR_SAVE = 'ERROR_SAVE'
const ERROR_DELETE = 'ERROR_DELETE'

export default function Appointment(props) {
  const { id, time, interview, interviewers, bookInterview, cancelInterview, } = props;
  
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
      .catch(err => { transition(ERROR_SAVE, true) });
  }

  const confirmDelete = () => {
    transition(CONFIRM);
  }

  const deleteInterview = (id) => {
    transition(DELETING, true);
		cancelInterview(id)
			.then(() => {
				transition(EMPTY);
			})
			.catch((err) => {
				transition(ERROR_DELETE, true);
			});
  }
  
  const edit = () => {
		transition(EDIT);
  }

  return (
		<article className='appointment'>
			<Header time={time} />
			{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
			{mode === SHOW && (
				<Show
					id={id}
					student={interview.student}
					interviewer={interview.interviewer}
					onDelete={() => confirmDelete()}
					onEdit={() => edit()}
				/>
			)}
			{mode === CREATE && (
				<Form
					interviewers={interviewers}
					onCancel={() => back()}
					onSave={save}
				/>
			)}
			{mode === SAVING && <Status message='Saving' />}
			{mode === DELETING && <Status message='Deleting' />}
			{mode === CONFIRM && (
				<Confirm
					message='Are you sure you want to delete?'
					onCancel={() => back()}
					onConfirm={() => deleteInterview(id)}
				/>
			)}
			{mode === EDIT && (
				<Form
					interviewers={interviewers}
					student={interview.student}
					interviewer={interview.interviewer.id}
					onCancel={() => back()}
					onSave={save}
				/>
			)}
			{mode === ERROR_DELETE && (
				<Error
					message='Error, cant delete Appointment, try again...'
					onClose={() => back()}
				/>
			)}
			{mode === ERROR_SAVE && (
				<Error
					message='Error, cant save Appointment, try again...'
					onClose={() => back()}
				/>
			)}
		</article>
	);
}