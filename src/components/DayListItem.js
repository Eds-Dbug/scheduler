import classNames from "classnames";
import React from "react";
import './DayListItem.scss'

export default function DayListItem(props) {
  let dayClass = classNames({
    'day-list__item': true,
    'day-list__item--selected' : props.selected,
    'day-list__item--full': props.spots === 0
  });

  const formatSpots = (spots) => {
    if(spots === 0) {
      return 'no spots';
    }
    if(spots === 1) {
      return '1 spot';
    }
    return `${spots} spots`
  }

  return (
    <li onClick={() => props.setDay(props.name)} className={dayClass}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)} remaining</h3>
    </li>
  );
}
