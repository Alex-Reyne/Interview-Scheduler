import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  function bookInterview(id, interview) {
		console.log(id, interview);
	}

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const appointmentInterviewers = getInterviewersForDay(state, state.day)
  
  const setDay = day => setState({ ...state, day});
  
  const appointmentArray = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview)
    return <Appointment key={appointment.id} {...appointment} interview={interview} interviewers={appointmentInterviewers} bookInterview={bookInterview} />
  });
  
  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ])
      .then((all) => {
        const [first, second, third] = all;
        setState(prev => ({...prev, days: first.data , appointments: second.data, interviewers: third.data }));
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList 
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        { appointmentArray }
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}