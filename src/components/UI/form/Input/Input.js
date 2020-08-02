import React from "react";
import classes from "./input.module.css";
const Input = (props) => {
  let inputEl = null;
  const inputClasses = [classes.InputElement];
  if (props.touched) {
    if (!props.valid && props.shouldValidate) {
      inputClasses.push(classes.Invalid);
    }
  }

  switch (props.elementtype) {
    case "input":
      inputEl = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementconfig}
          value={props.value}
          onChange={props.inputHandler}
        />
      );
      break;
    case "textarea":
      inputEl = (
        <textarea
          className={classes.InputElement}
          {...props.elementconfig}
          value={props.value}
          onChange={props.inputHandler}
        />
      );
      break;
    case "select":
      inputEl = (
        <select
          className={classes.InputElement}
          value={props.value}
          onChange={props.inputHandler}
        >
          {props.elementconfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputEl = (
        <input
          className={classes.InputElement}
          {...props.elementconfig}
          value={props.value}
          onChange={props.inputHandler}
        />
      );
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputEl}
    </div>
  );
};

export default Input;
