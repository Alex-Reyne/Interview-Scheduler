
// finds the appointments for each day and pushes
// them into a new array to return
export function getAppointmentsForDay(state, day) {
  const appointmentsArr = [];

  state.days.forEach((item) => {
    if (item.name === day) {
      item.appointments.forEach((appt) => {
        appointmentsArr.push(state.appointments[appt]);
      });
    }
  });
  
  return appointmentsArr;
}

// gets the current interview object from state
// and adds the selected interviewer to it
export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const { interviewers } = state;
  
  return { ...interview, interviewer: interviewers[interview.interviewer]};
}

// gets the interviewers that are assigned for each day.
export function getInterviewersForDay(state, day) {
	const interviewerArr = [];

  if (state.days.length === 0){
    return [];
  }

	state.days.forEach((item) => {
		if (item.name === day) {
			item.interviewers.forEach((int) => {
				if (int.id === state.interviewers.id) {
					interviewerArr.push(state.interviewers[int]);
				}
			});
		}
	});

	return interviewerArr;
}