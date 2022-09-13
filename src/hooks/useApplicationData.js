import  {useEffect, useState} from "react";
import axios from 'axios';

export default function useApplicationData() {
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

  console.log(state)

  /**
 * alias actions for our new useState 
 * */
   const setDay = day => setState({ ...state, day });
   //const setDays = days => setState(prev => ({ ...prev, days }));

/**
 * FUNCTION BOOK INTERVIEW
 * */
 function bookInterview(id, interview) {
  const foundDay = state.days.find((day) => day.appointments.includes(id));
  console.log('foundDay:', foundDay)
  const days = state.days.map(day => {
    if (
      day.name === foundDay.name &&
      state.appointments[id].interview === null
    ) {
      return { ...day, spots: day.spots - 1 };
    } else {
      return day;
    }
  });


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
        appointments,
        days
      });
    })
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const foundDay = state.days.find((day) => day.appointments.includes(id));
    const days = state.days.map((day) => {
      if (day.name === foundDay.name) {
        return { ...day, spots: day.spots + 1 };
      } else {
        return day;
      }
    });
    return axios.delete(`/api/appointments/${id}`, appointment).then(() => {
      setState({ 
        ...state, 
        appointments, 
        days 
      });
    });
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

  
  return {state,setDay,bookInterview,cancelInterview}
}