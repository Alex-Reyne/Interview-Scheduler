import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
  const [student, setStudent] = useState(props.student || '');
  const [interviewer, setInterviewer] = useState(props.interviewer || null)
  const { interviewers, onSave, onCancel } = props;

  const reset = () => {
    setStudent('');
    setInterviewer('');
  }

  const cancel = () => {
    onCancel();
    reset();
  }


  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={ student }
            onChange={(e) => setStudent(e.target.value)}
          />
        </form>
        <InterviewerList
          interviewers={ interviewers }
          onChange={ setInterviewer }
          value={ interviewer }
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={ cancel } >Cancel</Button>
          <Button confirm onClick={ onSave } >Save</Button>
        </section>
      </section>
    </main>
  );
}