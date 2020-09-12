import React from "react";
import buildControls from "./buildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Meat", type: "meat" },
  { label: "Cheese", type: "cheese" },
  { label: "Bacon", type: "bacon" },
];
const BuildControls = (props) => {
  return (
    <div className={buildControls.BuildControls}>
      <p>
        Current price: <strong>{props.price.toFixed(2)}</strong>
      </p>
      {controls.map((control) => {
        return (
          <BuildControl
            key={control.label}
            label={control.label}
            add={() => props.add(control.type)}
            remove={() => props.remove(control.type)}
            disabled={props.disabled[control.type]}
          />
        );
      })}
      <button
        className={buildControls.OrderButton}
        disabled={!props.purchaseable}
        onClick={props.displayModal}
      >
        {props.isAuth ? "CHECK OUT" : "SIGN UP TO ORDER"}
      </button>
    </div>
  );
};

export default BuildControls;
