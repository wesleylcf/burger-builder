import React from "react";
import classes from "./order.module.css";

const Order = (props) => {
  const ingredients = [];
  for (let ig in props.ingredients) {
    ingredients.push({ amount: props.ingredients[ig], name: ig });
  }
  const outputIg = ingredients.map((ig) => {
    return (
      <span
        key={ig.name}
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          border: "1px solid #ccc",
          padding: "5px",
        }}
      >
        {ig.name} : {ig.amount}
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      <p>Ingredients: {outputIg}</p>
      <p>
        <strong>Price: {(+props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
