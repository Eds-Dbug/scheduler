import React, {useEffect, useState} from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import axios from 'axios';
import { getAppointmentsForDay, getInterview, getInterviewersForDay} from "../helpers/selectors";


// const appointments = {
//   "1": {
//     id: 1,
//     time: "12pm",
//   },
//   "2": {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer:{
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   "3": {
//     id: 3,
//     time: "2pm",
//   },
//   "4": {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer:{
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   "5": {
//     id: 5,
//     time: "4pm",
//   }
// };

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
   // console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    axios.put('/api/appointments/:id', {...interview})
      .then(res => {
        setState({
          ...state,
          appointments
        });
      })

   

    
  }

  /**
 * useEffect
 * */
  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
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
            />
          )
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
