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