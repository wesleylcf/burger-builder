import React from "react";
import button from "./button.module.css";

const Button = (props) => {
  return (
    <button
      disabled={props.disabled}
      className={[button.Button, button[props.buttonType]].join(" ")}
      onClick={props.clicked}
    >
      {props.children}
    </button>
  );
};

export default Button;
