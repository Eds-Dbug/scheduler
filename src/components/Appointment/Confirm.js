import React from 'react';
import Button from 'components/Button';
import './styles.scss';

const Confirm = (props) => {
  // const cancel = () => {
  //   props.onCancel();
  // }

  // const confirm = () => {
  //   props.onDelete();
  // }

  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{props.message}</h1>
      <section className="appointment__actions">
        <Button onClick={props.onCancel} danger>Cancel</Button>
        <Button onClick={props.onDelete} danger>Confirm</Button>
      </section>
    </main>
  );
};

export default Confirm;