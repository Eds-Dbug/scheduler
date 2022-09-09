import classNames from 'classnames';
import React from 'react';
import './InterviewerListItem.scss';

const InterviewerListItem = (props) => {
  //const [interviewer, setInterviewer] = useState('');

  const interviewerClass = classNames({
    'interviewers__item' : true,
    'interviewers__item--selected' : props.selected
  })

  const interviewerImgClass = classNames({
    'interviewers__item-image': true, 
  });


  return (
    <>
      <li className={interviewerClass} onClick={() => props.setInterviewer(props.id)}>
        <img
          className={interviewerImgClass}
          src={props.avatar}
          alt={props.name}
        />
        {props.selected && props.name}
      </li>
    </>
  );
};

export default InterviewerListItem;