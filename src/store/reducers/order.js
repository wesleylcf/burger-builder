import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility/utility";
import { purchaseBurgerFail } from "../actions/order";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
  error: false,
};

const purchaseInit = (state, action) => {
  return updateObject(state, { purchased: false });
};
const purchaseFail = (state, action) => {
  return updateObject(state, { loading: false });
};
const purchasePass = (state, action) => {
  return updateObject(state, {
    orders: state.orders.concat(action.payload.order),
    loading: false,
    purchased: true,
  });
};
const purchaseStart = (state, action) => {
  return updateObject(state, { loading: true });
};
const fetchStart = (state, action) => {
  return updateObject(state, { loading: true });
};
const fetchPass = (state, action) => {
  return updateObject(state, {
    orders: action.payload.orders,
    loading: false,
  });
};
const fetchFail = (state, action) => {
  return updateObject(state, { error: true });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state, action);
    case actionTypes.PURCHASE_BURGER_FAIL:
      return purchaseBurgerFail(state, action);
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchasePass(state, action);
    case actionTypes.PURCHASE_BURGER_START:
      return purchaseStart(state, action);
    case actionTypes.FETCH_ORDERS_START:
      return fetchStart(state, action);
    case actionTypes.FETCH_ORDERS_FAIL:
      return fetchFail(state, action);
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchPass(state, action);
    default:
      return state;
  }
};

export default reducer;
