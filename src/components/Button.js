import React from "react";
import "components/Button.scss";
import classNames from "classnames";

export default function Button(props) {

  const confirm = props.confirm;
  const danger = props.danger;
  const disabled = props.disabled;
  const handleClick = props.onClick;

  let buttonClass = classNames('button', {"button--confirm": confirm,"button--danger": danger});

  return (
  <button 
    className={buttonClass} 
    onClick={handleClick} 
    disabled={disabled}
  >
    {props.children}
  </button>);
}
