import React from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import burger from "./burger.module.css";

const Burger = (props) => {
  // get Array of ingredient names
  console.log(props.ingredients);
  let transformedIngredients = Object.keys(props.ingredients)
    .map((igKey) => {
      // get a dummy array with number of dummy values equal to value in props.ingredients
      // Subsequently use the dummy array to return a variable number of BurgerIngredients. _ is used to indicate it is a blank
      return [...Array(props.ingredients[igKey])].map((_, index) => {
        return <BurgerIngredient type={igKey} key={igKey + index} />;
      });
    })
    // Maybe we want to start with no ingredients, and when it is the case render a message. However if there are no ingredients, transformedIngredients still has a length of 5:
    // 5 empty arrays. We use the reduce HOF initally an empty array, then concat the JSX objects inside of the next elements to it.
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  console.log(transformedIngredients);
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>;
  }

  return (
    <div className={burger.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
