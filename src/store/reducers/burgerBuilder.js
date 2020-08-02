import * as actionTypes from "../actions/actionTypes";

const initialState = {
  ingredients: null,
  totalPrice: 2,
  hasError: false,
};
const INGREDIENT_PRICES = {
  salad: 0.5,
  meat: 1.5,
  cheese: 0.5,
  bacon: 1,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload.ingredientName]:
            state.ingredients[action.payload.ingredientName] + 1,
        },
        totalPrice:
          state.totalPrice + INGREDIENT_PRICES[action.payload.ingredientName],
      };
    case actionTypes.REM_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload.ingredientName]:
            state.ingredients[action.payload.ingredientName] - 1,
        },
        totalPrice:
          state.totalPrice - INGREDIENT_PRICES[action.payload.ingredientName],
      };
    case actionTypes.SET_INGREDIENTS:
      console.log(action.ingredients);
      return {
        ...state,
        ingredients: action.payload.ingredients,
        error: false,
      };
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true,
      };
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return { ...state };
    case actionTypes.PURCHASE_BURGER_FAIL:
      return { ...state };
  }
  return state;
};

export default reducer;
