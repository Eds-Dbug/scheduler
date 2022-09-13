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

  
  return {state,setDay,bookInterview,cancelInterview}
}