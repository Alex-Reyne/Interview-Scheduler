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

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const { interviewers } = state;
  
  return { ...interview, interviewer: interviewers[interview.interviewer]};
}

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