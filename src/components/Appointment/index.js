import React from 'react';
import './styles.scss'
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error'
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

const Appointment = props => {
  const {mode, transition, back} = useVisualMode(props.interview ? SHOW : EMPTY);

  function save(student, interviewer) {
    if(!student || !interviewer) {
      return;
    }

    const interview = {
      student,
      interviewer
    };
    
    transition(SAVING);

    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
    
  }

  function onDelete() {
    transition(DELETING, true);
    
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      
      {mode === EDIT && 
        (<Form 
            student={props.interview.student}
            interviewer={props.interview.interviewer.id}
            interviewers={props.interviewers}
            onCancel={back}
            onSave={save}
          />
        )
        
      }
      {mode === CONFIRM && <Confirm onCancel={back} onDelete={onDelete} message="Are you sure you would like to delete?"/> }
      {mode === DELETING && <Status message="Deleting" /> }
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === ERROR_SAVE && <Error message="Error Saving" onClose={back}/>}
      {mode === ERROR_DELETE && <Error message="Error deleting" onClose={back}/>}
    </article>
  );
};

export default Appointment;