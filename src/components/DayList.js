import React from 'react';
import DayListItem from './DayListItem';

const DayList = (props) => {
  const days = props.days.map(e => {
    let selected = e.name === props.day;
    return <DayListItem key={e.id} name={e.name} spots={e.spots} selected={selected} setDay={props.setDay}/> 
  })

  return (
    <ul>
      {days}
    </ul>
  );
};

export default DayList;