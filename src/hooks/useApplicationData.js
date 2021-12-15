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

    function editInterview(id, interview) {
			const appointment = {
				...state.appointments[id],
				interview: { ...interview },
			};

      if (!interview) { appointment.interview = null }

			const appointments = {
				...state.appointments,
				[id]: appointment,
			};

			return { appointment, appointments };
		}

    const getFreeSpots = (appointments) => {
			const appointmnentsArray = getAppointmentsForDay(
				{ ...state, appointments },
				state.day
			);

			return appointmnentsArray.reduce(
				(count, appointment) => (!appointment.interview ? (count += 1) : count),
				0
			);
		};

    const updateSpots = (id, appointments) => {
      const newSpots = getFreeSpots(appointments);

			return [...state.days].map((day) => {
				if (day.name === state.day) {
					return { ...day, spots: newSpots };
				}
      
				return day;
			});
		};

		function bookInterview(id, interview) {
			const { appointments } = editInterview(id, interview);

      const days = updateSpots(id, appointments)

			return axios.put(`/api/appointments/${id}`, { interview }).then((res) => {
        setState((prev) => ({ ...prev, appointments, days }));
			});
			// .catch((err) => { console.log(err) });
		}

		function cancelInterview(id) {
      
      const { appointments } = editInterview(id);

      const days = updateSpots(id, appointments);

			return axios.delete(`/api/appointments/${id}`).then((res) => {
				setState((prev) => ({ ...prev, appointments, days }));
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