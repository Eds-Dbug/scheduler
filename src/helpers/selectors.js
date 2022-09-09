export function getAppointmentsForDay(state, day) {
  let appointmentArr = []
  
  const filteredDay = state.days.filter((stateDay) => { 
    return stateDay.name === day;
  });

  if(filteredDay.length > 0){
    appointmentArr = filteredDay[0].appointments;
  }
  
  //console.log(appointmentArr);
  //need to return an arr with the actual apointments
  const result = appointmentArr.map(appointment => {
    return state.appointments[`${appointment}`];
  });
  //console.log(result)

  return result;
}

export function getInterview(state, interview) {

  if(!interview) {
    return null;
  }

  const interviewerId = interview.interviewer;
  //need to find the the interviewer that matches id
  const interviewer = state.interviewers[interviewerId];
  
  const newInterview = {...interview, interviewer: interviewer}
  
  return newInterview;
}