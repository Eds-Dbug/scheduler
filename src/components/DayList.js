import React from 'react';
import DayListItem from './DayListItem';

const DayList = (props) => {
  const days = props.days.map(e => {
    //let selected = e.name === props.value;
    return (
    <DayListItem 
      key={e.id} 
      name={e.name} 
      spots={e.spots} 
      selected={e.name === props.value} 
      setDay={props.onChange}/> 
    )
    
  })

  return (
    <ul>
      {days}
    </ul>
  );
};

export default DayList;