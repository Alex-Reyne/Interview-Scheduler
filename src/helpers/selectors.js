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
  if (!interview) {
    return null;
  }

  const interviewData = {
    student: interview['student']
  };

  for (const int in state.interviewers) {
    if (int == interview.interviewer) {
      interviewData['interviewer'] = state.interviewers[int];
    }
  };
  
  return interviewData;
}