import React from "react";
import classNames from "classnames";
import 'components/InterviewerListItem.scss';

/*
id: number
name: string
avatar: URL
selected: boolean
function: setInterviewer

setInterviewer:function - is run when the InterviewerListItem
is clicked. This function receives the interviewer's id as an argument.
It sets the selected interviewer.
*/

export default function InterviewerListItem(props) {
  const { id, name, avatar, selected, onChange } = props;

  let interviewerClass = classNames('interviewers__item', {
		'interviewers__item--selected': selected
	});

  return (
    <li className={ interviewerClass } onClick={ onChange }>
      <img
        className='interviewers__item-image'
        id={ id }
        src={ avatar }
        alt={ name }
      />
      { selected && name }
    </li>
  );
}