import { useState, useEffect } from "react";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";

export default function useApplicationData() {
    const [state, setState] = useState({
			day: 'Monday',
			days: [],
			appointments: {},
			interviewers: {},
		});

    const getFreeSpots = (appointments) => {
      const appIDs = state.days.filter(day => day.name === state.day);
      const todayApp = appIDs[0].appointments;
      const emptyApp = todayApp.filter(app => !appointments[app].interview).length;

      return emptyApp;
    }

		function bookInterview(id, interview) {
			const appointment = {
				...state.appointments[id],
				interview: { ...interview },
			};

			const appointments = {
				...state.appointments,
				[id]: appointment,
			};

      const days = [
        ...state.days,
      ]

      const dayIndex = state.days.findIndex((day) =>
        day.appointments.includes(id)
      )
      console.log(appointments)
      days[dayIndex].spots = getFreeSpots(appointments);

			return axios.put(`/api/appointments/${id}`, { interview }).then((res) => {
        setState((prev) => ({ ...prev, appointments, days }));
			});
			// .catch((err) => { console.log(err) });
		}

		// function editInterview(id, interview) {
		// 	const appointment = {
		// 		...state.appointments[id],
		// 		interview: { ...interview },
		// 	};

		// 	const appointments = {
		// 		...state.appointments,
		// 		[id]: appointment,
		// 	};

		// 	return axios.put(`/api/appointments/${id}`, { interview }).then((res) => {
		// 		setState((prev) => ({ ...prev, appointments }));
		// 	})
		// 	// .catch((err) => { console.log(err) });
		// }

		function cancelInterview(id) {
			return axios.delete(`/api/appointments/${id}`).then((res) => {
				setState((prev) => ({ ...prev }));
			});
			// .catch((err) => { console.log(err) })
		}

    const setDay = (day) => setState({ ...state, day });


  useEffect(() => {
		Promise.all([
			axios.get('http://localhost:8001/api/days'),
			axios.get('http://localhost:8001/api/appointments'),
			axios.get('http://localhost:8001/api/interviewers'),
		])
			.then((all) => {
				const [first, second, third] = all;
				setState((prev) => ({
					...prev,
					days: first.data,
					appointments: second.data,
					interviewers: third.data,
				}));
			})
			.catch((err) => console.log(err));
	}, []);


  return { state, setDay, bookInterview, cancelInterview, }
}