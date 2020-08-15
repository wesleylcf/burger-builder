import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility/utility";

const initialState = {
  ingredients: null,
  totalPrice: 2,
  hasError: false,
  building: false,
};
const INGREDIENT_PRICES = {
  salad: 0.5,
  meat: 1.5,
  cheese: 0.5,
  bacon: 1,
};

const addIng = (state, action) => {
  const updatedIngredientsAdd = updateObject(state.ingredients, {
    [action.payload.ingredientName]:
      state.ingredients[action.payload.ingredientName] + 1,
  });
  const updatedStateAdd = {
    ingredients: updatedIngredientsAdd,
    totalPrice:
      state.totalPrice + INGREDIENT_PRICES[action.payload.ingredientName],
    building: true,
  };
  return updateObject(state, updatedStateAdd);
};
const remIng = (state, action) => {
  const updatedIngredientsRemove = updateObject(state.ingredients, {
    [action.payload.ingredientName]:
      state.ingredients[action.payload.ingredientName] - 1,
    building: true,
  });
  const updatedStateRemove = {
    ingredients: updatedIngredientsRemove,
    totalPrice:
      state.totalPrice - INGREDIENT_PRICES[action.payload.ingredientName],
  };
  return updateObject(state, updatedStateRemove);
};
const setIng = (state, action) => {
  return updateObject(state, {
    ingredients: action.payload.ingredients,
    error: false,
    totalPrice: 2,
    building: false,
  });
};
const setIngFail = (state, action) => {
  return updateObject(state, { error: true });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIng(state, action);
    case actionTypes.REM_INGREDIENT:
      return remIng(state, action);
    case actionTypes.SET_INGREDIENTS:
      return setIng(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return setIngFail(state, action);
    default:
      return state;
  }
};

export default reducer;
