export function getAppointmentsForDay(state, day) {
  let appointmentArr = []
  
  const filteredDay = state.days.filter((stateDay) => { 
    return stateDay.name === day;
  });

  filteredDay.length && (appointmentArr = filteredDay[0].appointments);
    
  //console.log(appointmentArr);
  //need to return an arr with the actual apointments
  return appointmentArr.map(appointment => {
    return state.appointments[`${appointment}`];
  });
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

export function getInterviewersForDay(state, day) {
  let interviewsArr = [];
  
  const filteredDay = state.days.filter((stateDay) => { 
    return stateDay.name === day;
  });

  filteredDay.length && (interviewsArr = filteredDay[0].interviewers);
 //console.log('interviewersArr:', interviewsArr)
  const result = interviewsArr.map(id => {
    //console.log('interviewer:',interviewer)
    return state.interviewers[id];
  });
//console.log('result',result);
return result
}

export function findDayIndex(day) {
  const days ={
    Monday: 0,
    Tuesday: 1,
    Wendsday: 2,
    Thursday: 3,
    Friday: 4,
    // Saturday: 5,
    // Sunday: 6,
  }
  return days[day]
}