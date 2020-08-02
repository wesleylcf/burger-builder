import * as actionTypes from "../actions/actionTypes";
import { initIngredients } from "../actions";

const initialState = {
  orders: [],
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_FAIL:
      return { ...state, loading: false };
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return {
        ...state,
        orders: state.orders.concat(action.payload.order),
        loading: false,
      };
    case actionTypes.PURCHASE_BURGER_START:
      return { ...state, loading: true };
    default:
      return state;
  }
};

export default reducer;
