import React, {useEffect, useState} from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import axios from 'axios';
import { getAppointmentsForDay, getInterview, getInterviewersForDay} from "../helpers/selectors";


export default function Application(props) {

/**
 * STATE
 **/
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {}
  });

/**
 * VARIABLES
 **/
  let dailyAppointments = getAppointmentsForDay(state,state.day);
  let interviewersOfDay = getInterviewersForDay(state,state.day);
 
/**
 * alias actions for our new useState 
 * */
  const setDay = day => setState({ ...state, day });
//const setDays = days => setState(prev => ({ ...prev, days }));

/**
 * FUNCTION BOOK INTERVIEW
 * */
  function bookInterview(id, interview) {
   
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
   // console.log( {...interview});
    return axios.put(`/api/appointments/${id}`, {interview})
      .then(res => {
        setState({
          ...state,
          appointments
        });
      })
  }

  function cancelInterview(id) {
    console.log('INSIDE CANCEL APPOINTMENT');
    console.log('state:',state)

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
    .then(res => console.log(res))
    .then(() => {
      setState({
        ...state,appointments
      })
    })
  }

   

  /**
 * useEffect
 * */
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {
      //console.log(all)
      setState(prev => {
        //console.log('hi');
        const daysResponse = all[0].data;
        const appointmentResponse = all[1].data;
        const interviewersResponse = all[2].data;
        return { 
          ...prev, 
          days: [...daysResponse],
          appointments: {...appointmentResponse},
          interviewers: {...interviewersResponse}
        }
      })
    });
  },[]);
  
  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
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
        
        {dailyAppointments.map((appointment) => {
          const interview = getInterview(state, appointment.interview);
         
          return (
            <Appointment 
              key={appointment.id}
              id={appointment.id}
              time={appointment.time}
              interviewers={interviewersOfDay}
              interview={interview}
              bookInterview={bookInterview}
              cancelInterview={cancelInterview}
            />
          )
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
