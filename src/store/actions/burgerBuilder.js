import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";
export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    payload: { ingredientName: name },
  };
};

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REM_INGREDIENT,
    payload: { ingredientName: name },
  };
};

export const setIngredients = (ings) => {
  return { type: actionTypes.SET_INGREDIENTS, payload: { ingredients: ings } };
};

export const fetchIngredientsFailed = (error) => {
  return { type: actionTypes.FETCH_INGREDIENTS_FAILED };
};

export const initIngredients = () => {
  return (dispatch) => {
    axios
      .get("ingredients.json")
      .then((response) => {
        dispatch(setIngredients(response.data));
      })
      .catch((error) => {
        dispatch(fetchIngredientsFailed());
      });
  };
};
