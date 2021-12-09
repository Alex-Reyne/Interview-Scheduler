import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import 'components/InterviewerList.scss'

export default function InterviewerList(props) {
  const { interviewers, onChange, value } = props;
  console.log(props)

  const interviewerList = interviewers.map((item) => {
    const { id, name, avatar } = item;

    return <InterviewerListItem
      key={ id }
      name={ name }
      avatar={ avatar }
      selected={ value === id }
      onChange={ (e) => onChange(id) }
    />
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        { interviewerList }
      </ul>
    </section>
  );

};