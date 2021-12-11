export function getAppointmentsForDay(state, day) {
  const appointmentsArr = [];

  state.days.forEach((item) => {
    if (item.name === day) {
      item.appointments.forEach((appt) => {
        if (appt.id === state.appointments.id) {
          appointmentsArr.push(state.appointments[appt]);
        }
      });
    }
  });

  return appointmentsArr;
}

export function getInterview(state, interview) {
  const { interviewers } = state;

  if (!interview) {
    return null;
  }
  
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